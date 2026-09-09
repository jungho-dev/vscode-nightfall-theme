/**
 * @file build.ts
 * @description 테마·문법 산출물을 생성/검증하고 themes·syntaxes 에 기록함
 * @author Jungho
 *
 * 기본 모드는 산출물 생성 후 기록. --check 는 기록 없이 디스크와의 드리프트만 검사한다.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildTheme } from "./theme/theme";
import { buildBracketInString } from "./grammars/bracket-in-string";
import { buildTaggedTemplate } from "./grammars/tagged-template";
import { buildNestedQuoteSingleInDouble, buildNestedQuoteDoubleInSingle } from "./grammars/nested-quote-in-string";
import { validate } from "./validate";
import { logger } from "./logger";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

interface Artifact {
  path: string;
  data: unknown;
}

// 기존 파일의 EOL·마지막 개행을 보존해 의미 없는 diff 를 막음
function serialize(path: string, data: unknown): string {
  const body = JSON.stringify(data, null, 2);
  if (!existsSync(path)) {
    return `${body}\n`;
  }
  const current = readFileSync(path, "utf8");
  const eol = current.includes("\r\n") ? "\r\n" : "\n";
  const trailing = /\n$/.test(current) ? eol : "";
  return body.replace(/\n/g, eol) + trailing;
}

function relative(path: string): string {
  return path.slice(ROOT.length + 1).replace(/\\/g, "/");
}

function main(): void {
  const check = process.argv.includes("--check");
  const theme = buildTheme();
  const grammars = [
    buildBracketInString(),
    buildTaggedTemplate(),
    buildNestedQuoteSingleInDouble(),
    buildNestedQuoteDoubleInSingle(),
  ];

  // 검증: 경고는 출력하고, 오류가 있으면 기록 없이 중단함
  const result = validate(theme, grammars);
  for (const warning of result.warnings) {
    logger.warn(warning);
  }
  if (result.errors.length > 0) {
    for (const error of result.errors) {
      logger.fail(error);
    }
    process.exit(1);
  }
  logger.ok(`검증 통과 (토큰 ${theme.tokenColors.length}, 문법 ${grammars.length})`);

  const artifacts: Artifact[] = [
    {
      path: resolve(ROOT, "themes/urban-color-theme.json"),
      data: theme,
    },
    {
      path: resolve(ROOT, "syntaxes/bracket-in-string.tmLanguage.json"),
      data: grammars[0],
    },
    {
      path: resolve(ROOT, "syntaxes/tagged-template.tmLanguage.json"),
      data: grammars[1],
    },
    {
      path: resolve(ROOT, "syntaxes/nested-quote-single-in-double.tmLanguage.json"),
      data: grammars[2],
    },
    {
      path: resolve(ROOT, "syntaxes/nested-quote-double-in-single.tmLanguage.json"),
      data: grammars[3],
    },
  ];

  // 생성 또는 드리프트 검사
  let drift = 0;
  for (const artifact of artifacts) {
    const next = serialize(artifact.path, artifact.data);
    if (check) {
      const current = existsSync(artifact.path) ? readFileSync(artifact.path, "utf8") : "";
      const same = JSON.stringify(JSON.parse(next)) === JSON.stringify(current ? JSON.parse(current) : null);
      if (same) {
        logger.ok(`parity ${relative(artifact.path)}`);
      }
      else {
        logger.fail(`drift ${relative(artifact.path)}`);
        drift += 1;
      }
    }
    else {
      writeFileSync(artifact.path, next, "utf8");
      logger.ok(`wrote ${relative(artifact.path)}`);
    }
  }
  if (check && drift > 0) {
    process.exit(1);
  }
}

main();
