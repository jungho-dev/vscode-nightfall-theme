/**
 * @file tagged-template.ts
 * @description 태그드 템플릿과 주석 힌트에 실제 언어 문법을 임베드하는 주입 문법을 생성함
 * @author Jungho
 *
 * 언어당 태그 형과 주석 힌트 형을 각각 한 규칙으로 만든다. vscode-textmate 는 주입
 * begin 규칙을 하나의 스캐너로 합치므로 규칙 수를 줄여도 스캔 비용이 줄지 않는다.
 * 그래서 원본과 동일한 14규칙 구조(속도 동일)를 LANGUAGES 표에서 생성만 한다.
 */

import { LANGUAGES } from "./languages";
import type { EmbeddedLanguage } from "./languages";
import type { GrammarRule, InjectionGrammar } from "../types";

const SCHEMA = "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json";

const INJECTION_SELECTOR = [
  "L:source.js -comment -string",
  "L:source.jsx -comment -string",
  "L:source.js.jsx -comment -string",
  "L:source.ts -comment -string",
  "L:source.tsx -comment -string",
].join(", ");

// repository 정의 순서는 원본을 그대로 따른다 (css 가 scss/less 앞)
const REPOSITORY_ORDER = ["html", "css", "scss", "less", "sql", "json", "shell"];

// ${...} 를 먼저 소비해 보간 코드는 JS 로, 나머지는 임베드 문법으로 토큰화함
const templateSubstitution: GrammarRule = {
  begin: "\\$\\{",
  beginCaptures: {
    "0": {
      name: "punctuation.definition.template-expression.begin.js",
    },
  },
  end: "\\}",
  endCaptures: {
    "0": {
      name: "punctuation.definition.template-expression.end.js",
    },
  },
  name: "meta.template.expression.js",
  contentName: "meta.embedded.line.js",
  patterns: [
    {
      include: "source.js",
    },
  ],
};

// 태그 형: lang` ... `
function buildTagRule(lang: EmbeddedLanguage): GrammarRule {
  return {
    begin: `\\b((?i:${lang.tagNames}))\\s*(\`)`,
    beginCaptures: {
      "1": {
        name: "entity.name.function.tagged-template.js",
      },
      "2": {
        name: "punctuation.definition.string.template.begin.js",
      },
    },
    end: "(`)",
    endCaptures: {
      "1": {
        name: "punctuation.definition.string.template.end.js",
      },
    },
    contentName: lang.contentName,
    patterns: [
      {
        include: "#template-substitution",
      },
      {
        include: lang.include,
      },
    ],
  };
}

// 주석 힌트 형: 앞 블록 주석으로 언어를 지정하고 백틱으로 이어지는 형태
function buildHintRule(lang: EmbeddedLanguage): GrammarRule {
  return {
    begin: `(/\\*\\s*(?i:${lang.hintNames})\\s*\\*/)\\s*(\`)`,
    beginCaptures: {
      "1": {
        name: "comment.block.js",
      },
      "2": {
        name: "punctuation.definition.string.template.begin.js",
      },
    },
    end: "(`)",
    endCaptures: {
      "1": {
        name: "punctuation.definition.string.template.end.js",
      },
    },
    contentName: lang.contentName,
    patterns: [
      {
        include: "#template-substitution",
      },
      {
        include: lang.include,
      },
    ],
  };
}

export function buildTaggedTemplate(): InjectionGrammar {
  const byKey = new Map(LANGUAGES.map((lang) => [lang.key, lang]));

  // 우선순위: LANGUAGES 순서로 태그 전체, 그다음 힌트 전체
  const patterns: InjectionGrammar["patterns"] = [];
  for (const lang of LANGUAGES) {
    patterns.push({
      include: `#tag-${lang.key}`,
    });
  }
  for (const lang of LANGUAGES) {
    patterns.push({
      include: `#hint-${lang.key}`,
    });
  }

  // 정의 순서: template-substitution, tag-* (repo 순서), hint-* (repo 순서)
  const repository: Record<string, GrammarRule> = {
    "template-substitution": templateSubstitution,
  };
  for (const key of REPOSITORY_ORDER) {
    repository[`tag-${key}`] = buildTagRule(byKey.get(key) as EmbeddedLanguage);
  }
  for (const key of REPOSITORY_ORDER) {
    repository[`hint-${key}`] = buildHintRule(byKey.get(key) as EmbeddedLanguage);
  }

  return {
    $schema: SCHEMA,
    scopeName: "urban.tagged-template.injection",
    injectionSelector: INJECTION_SELECTOR,
    patterns,
    repository,
  };
}
