/**
 * @file validate.ts
 * @description 생성된 테마·문법 산출물의 무결성을 검사함
 * @author Jungho
 */

import { palette } from "./palette";
import type { InjectionGrammar, ThemeManifest } from "./types";

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const IN_STRING_SCOPE = "punctuation.bracket.in-string";

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

export function validate(theme: ThemeManifest, grammars: InjectionGrammar[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 워크벤치 색상 hex 검사 (배열 값 포함)
  for (const [key, value] of Object.entries(theme.colors)) {
    const values = Array.isArray(value) ? value : [value];
    for (const hex of values) {
      if (!HEX.test(hex)) {
        errors.push(`workbench color ${key} 잘못된 hex: ${hex}`);
      }
    }
  }

  // 토큰 색상 hex 검사
  for (const rule of theme.tokenColors) {
    for (const key of ["foreground", "background"] as const) {
      const hex = rule.settings[key];
      if (hex !== undefined && !HEX.test(hex)) {
        errors.push(`token ${rule.name ?? String(rule.scope)} 잘못된 ${key} hex: ${hex}`);
      }
    }
  }

  // 프로젝트 규칙(이름 있음) foreground 는 팔레트 값만 써야 함
  const paletteValues = new Set(Object.values(palette).map((hex) => hex.toUpperCase()));
  const named = theme.tokenColors.filter((rule) => rule.name !== undefined);
  for (const rule of named) {
    const fg = rule.settings.foreground;
    if (fg !== undefined && !paletteValues.has(fg.toUpperCase())) {
      warnings.push(`project token '${rule.name}' 팔레트 밖 색상: ${fg}`);
    }
  }

  // in-string 대괄호 규칙은 마지막 프로젝트 규칙이어야 함 (broad string 규칙보다 뒤)
  const last = named.at(-1);
  const lastScope = last?.scope;
  const isInStringLast = Array.isArray(lastScope)
    ? lastScope.includes(IN_STRING_SCOPE)
    : lastScope === IN_STRING_SCOPE;
  if (!isInStringLast) {
    errors.push("in-string 대괄호 규칙이 마지막 프로젝트 규칙이 아님");
  }

  // 문법 구조 검사: 참조된 repository 키가 실제로 존재해야 함
  for (const grammar of grammars) {
    if (!grammar.scopeName) {
      errors.push("문법 scopeName 누락");
    }
    for (const pattern of grammar.patterns) {
      const include = pattern.include;
      if (include?.startsWith("#") && !(include.slice(1) in grammar.repository)) {
        errors.push(`${grammar.scopeName} 미정의 참조: ${include}`);
      }
    }
  }

  return { errors, warnings };
}
