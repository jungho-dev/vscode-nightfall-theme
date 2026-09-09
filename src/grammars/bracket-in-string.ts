/**
 * @file bracket-in-string.ts
 * @description 문자열 내부 괄호를 스코프 지정하는 주입 문법을 생성함
 * @author Jungho
 */

import type { InjectionGrammar } from "../types";

const SCHEMA = "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json";

// injectionSelector 로 문자열 컨텍스트만 매칭하고 정규식/주석은 제외함
export function buildBracketInString(): InjectionGrammar {
  return {
    $schema: SCHEMA,
    scopeName: "urban.bracket-in-string.injection",
    injectionSelector: "L:string -string.regexp -comment",
    patterns: [
      {
        include: "#brackets-in-string",
      },
    ],
    repository: {
      "brackets-in-string": {
        // biome-ignore lint/security/noSecrets: 괄호 문자 클래스 정규식, 시크릿 아님
        match: "[\\[\\](){}]",
        name: "punctuation.bracket.in-string",
      },
    },
  };
}
