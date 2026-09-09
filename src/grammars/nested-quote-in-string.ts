/**
 * @file nested-quote-in-string.ts
 * @description 문자열 내부 중첩 따옴표를 스코프 지정하는 주입 문법을 생성함
 * @author Jungho
 */

import type { InjectionGrammar } from "../types";

const SCHEMA = "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json";

// 이중따옴표 문자열 안의 홑따옴표 중첩 문자열
// - 컨텍스트를 string.quoted.double 로 한정해 바깥 문자열 delimiter 를 삼키지 않음
// - 내용에서 " 를 제외해 인접 속성 경계를 넘지 않음
export function buildNestedQuoteSingleInDouble(): InjectionGrammar {
  return {
    $schema: SCHEMA,
    scopeName: "urban.nested-quote-single-in-double.injection",
    injectionSelector: "L:string.quoted.double -string.regexp -string.template -comment",
    patterns: [
      {
        include: "#nested-single",
      },
    ],
    repository: {
      "nested-single": {
        match: "'[^'\"]*'",
        name: "string.quoted.single.nested.in-string",
      },
    },
  };
}

// 홑따옴표 문자열 안의 이중따옴표 중첩 문자열 (대칭 규칙)
export function buildNestedQuoteDoubleInSingle(): InjectionGrammar {
  return {
    $schema: SCHEMA,
    scopeName: "urban.nested-quote-double-in-single.injection",
    injectionSelector: "L:string.quoted.single -string.regexp -string.template -comment",
    patterns: [
      {
        include: "#nested-double",
      },
    ],
    repository: {
      "nested-double": {
        match: "\"[^\"']*\"",
        name: "string.quoted.double.nested.in-string",
      },
    },
  };
}
