/**
 * @file bootstrap.ts
 * @description 배포 테마 JSON에서 벤더/프로젝트 토큰 TS 모듈을 1회 생성함
 * @author Jungho
 *
 * 원본(GitHub Dark Dimmed 상속 base + 프로젝트 규칙)을 소스 오브 트루스로 삼아
 * src/theme/vendor.ts 와 src/theme/tokens.ts 를 만든다. base 상속 규칙은 verbatim
 * 유지하고, 프로젝트 규칙의 foreground 는 단일 소스 palette 참조로 치환한다.
 * 베이스 테마를 다시 vendoring 할 때만 재실행한다.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ThemeManifest, TokenColor } from "../src/types";

const HERE = dirname(fileURLToPath(import.meta.url));

// 입력 로드
const SOURCE = process.argv[2] ?? resolve(HERE, "../themes/nightfall-color-theme.json");
const theme = JSON.parse(readFileSync(SOURCE, "utf8")) as ThemeManifest;

// 토큰 분할 (base=이름 없음 / project=이름 있음)
const baseTokens: TokenColor[] = [];
const projectTokens: TokenColor[] = [];
for (const rule of theme.tokenColors) {
  if (rule.name === undefined) {
    baseTokens.push(rule);
  }
  else {
    projectTokens.push(rule);
  }
}

// base 규칙이 전부 project 규칙 앞에 오는 구조를 검증함
const firstNamed = theme.tokenColors.findIndex((rule) => rule.name !== undefined);
if (firstNamed !== baseTokens.length) {
  throw new Error(`base/project 경계 불일치: firstNamed=${firstNamed}, base=${baseTokens.length}`);
}

// 팔레트 역매핑 (hex -> 이름)
const PALETTE_BY_HEX: Record<string, string> = {
  "#D1D7E0": "text",
  "#6CB6FF": "blue",
  "#CBA6F7": "purple",
  "#F69D50": "orange",
  "#F47067": "red",
  "#63EC63": "green",
  "#7CA964": "commentGreen",
  "#F4D4AE": "tan",
  "#F2CC60": "yellow",
};

const unmatched = new Set<string>();

// 스코프를 2-스페이스 JSON 으로 직렬화한 뒤 지정 깊이만큼 재들여쓰기함
function indentScope(scope: string | string[], pad: string): string {
  const raw = JSON.stringify(scope, null, 2);
  return raw
    .split("\n")
    .map((line, index) => (index === 0 ? line : pad + line))
    .join("\n");
}

// foreground/background 는 팔레트 참조로, 그 외는 리터럴로 값을 표현함
function settingValue(key: string, value: string): string {
  if (key === "foreground" || key === "background") {
    const name = PALETTE_BY_HEX[value.toUpperCase()];
    if (name) {
      return `palette.${name}`;
    }
    unmatched.add(value);
  }
  return JSON.stringify(value);
}

function emitProjectRule(rule: TokenColor): string {
  const settingEntries = Object.entries(rule.settings).map(
    ([key, value]) => `      "${key}": ${settingValue(key, value as string)}`,
  );
  return [
    "  {",
    `    "name": ${JSON.stringify(rule.name)},`,
    `    "scope": ${indentScope(rule.scope, "    ")},`,
    "    \"settings\": {",
    settingEntries.join(",\n"),
    "    }",
    "  }",
  ].join("\n");
}

// vendor.ts 생성
const vendorModule = `/**
 * @file vendor.ts
 * @description GitHub Dark Dimmed 에서 상속한 워크벤치 색상과 base 토큰 규칙
 * @author Jungho
 *
 * 이 파일은 scripts/bootstrap.ts 가 배포 테마에서 생성한 벤더 데이터다.
 * 상속 규칙을 verbatim 보존하므로 직접 편집하지 말고 부트스트랩으로 재생성한다.
 */

import type { TokenColor, WorkbenchColors } from "../types";

export const workbenchColors: WorkbenchColors = ${JSON.stringify(theme.colors, null, 2)};

export const baseTokens: TokenColor[] = ${JSON.stringify(baseTokens, null, 2)};
`;

// tokens.ts 생성
const tokensModule = `/**
 * @file tokens.ts
 * @description 프로젝트 토큰 색상 규칙 (base 규칙 위에 덮어씀)
 * @author Jungho
 *
 * foreground 는 단일 소스 palette 를 참조한다. 규칙 순서가 곧 적용 우선순위이므로
 * in-string 대괄호 규칙은 반드시 마지막을 유지한다.
 */

import { palette } from "../palette";
import type { TokenColor } from "../types";

export const projectTokens: TokenColor[] = [
${projectTokens.map(emitProjectRule).join(",\n")},
];
`;

writeFileSync(resolve(HERE, "../src/theme/vendor.ts"), vendorModule, "utf8");
writeFileSync(resolve(HERE, "../src/theme/tokens.ts"), tokensModule, "utf8");

// 결과 보고
console.log(`base tokens: ${baseTokens.length}, project tokens: ${projectTokens.length}`);
console.log(`workbench colors: ${Object.keys(theme.colors).length}`);
if (unmatched.size > 0) {
  console.log(`WARN unmatched project colors: ${[...unmatched].join(", ")}`);
}
else {
  console.log("all project colors mapped to palette");
}
