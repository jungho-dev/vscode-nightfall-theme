/**
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
  {
    "name": "comments -> soft green (user)",
    "scope": [
      "comment",
      "punctuation.definition.comment",
      "string.comment"
    ],
    "settings": {
      "foreground": palette.commentGreen
    }
  },
  {
    "name": "identifiers, params, declarations -> default text (web)",
    "scope": [
      "variable",
      "variable.other.readwrite",
      "variable.other.object",
      "variable.parameter",
      "entity.name.variable",
      "meta.definition.variable",
      "meta.definition.variable variable.other.constant"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "property access -> blue (web)",
    "scope": [
      "variable.other.property",
      "variable.other.object.property",
      "variable.other.constant.property",
      "variable.property",
      "support.variable.property"
    ],
    "settings": {
      "foreground": palette.blue
    }
  },
  {
    "name": "ALL_CAPS constant usage -> blue (web)",
    "scope": [
      "variable.other.constant",
      "variable.other.constant.object",
      "variable.other.enummember"
    ],
    "settings": {
      "foreground": palette.blue
    }
  },
  {
    "name": "operators -> blue (web)",
    "scope": [
      "keyword.operator.assignment",
      "keyword.operator.assignment.compound",
      "keyword.operator.comparison",
      "keyword.operator.relational",
      "keyword.operator.logical",
      "keyword.operator.arithmetic",
      "keyword.operator.bitwise",
      "keyword.operator.increment",
      "keyword.operator.decrement",
      "keyword.operator.ternary",
      "keyword.operator.arrow",
      "storage.type.function.arrow",
      "meta.arrow.ts storage.type.function.arrow",
      "meta.arrow storage.type.function.arrow"
    ],
    "settings": {
      "foreground": palette.blue
    }
  },
  {
    "name": "numbers -> dimmed green (user override)",
    "scope": [
      "constant.numeric",
      "constant.numeric.decimal",
      "constant.numeric.hex",
      "constant.numeric.integer",
      "constant.numeric.float"
    ],
    "settings": {
      "foreground": palette.green
    }
  },
  {
    "name": "spread, type colon, optional -> default text (web)",
    "scope": [
      "keyword.operator.spread",
      "keyword.operator.rest",
      "keyword.operator.type.annotation",
      "keyword.operator.optional"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "builtin constructors String/Set/Promise -> orange (web)",
    "scope": [
      "support.class.builtin",
      "support.class.promise",
      "support.class.error",
      "new.expr entity.name.function"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "comment slashes follow comment override",
    "scope": [
      "punctuation.definition.comment"
    ],
    "settings": {
      "foreground": palette.commentGreen
    }
  },
  {
    "name": "html tag names -> red",
    "scope": [
      "text.html entity.name.tag",
      "text.html entity.name.tag.html",
      "text.html meta.tag.metadata.doctype entity.name.tag"
    ],
    "settings": {
      "foreground": palette.red
    }
  },
  {
    "name": "html attribute names -> orange",
    "scope": [
      "text.html entity.other.attribute-name",
      "text.html entity.other.attribute-name.html",
      "text.html entity.other.attribute-name.id.html",
      "text.html entity.other.attribute-name.class.html"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "doctype attribute (html) -> default text",
    "scope": [
      "text.html meta.tag.metadata.doctype entity.other.attribute-name"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "html attribute value strings + quotes -> default text",
    "scope": [
      "text.html string.quoted.double.html",
      "text.html string.quoted.single.html",
      "text.html string.unquoted.html",
      "text.html string.quoted.double.html punctuation.definition.string",
      "text.html string.quoted.single.html punctuation.definition.string"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "inline css element selectors -> orange",
    "scope": [
      "text.html source.css entity.name.tag"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "html attribute '=' and tag punctuation -> default text",
    "scope": [
      "text.html punctuation.separator.key-value.html",
      "text.html punctuation.definition.tag"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "inline css property names / keyword values -> default text",
    "scope": [
      "text.html source.css support.type.property-name",
      "text.html source.css meta.property-name",
      "text.html source.css support.constant.property-value",
      "text.html source.css support.constant.font-name",
      "text.html source.css support.constant.color",
      "text.html source.css support.type.vendored.property-name",
      "text.html meta.attribute.style support.type.property-name",
      "text.html meta.attribute.style support.constant.property-value"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "inline css class/id selectors -> orange",
    "scope": [
      "text.html source.css entity.other.attribute-name.class",
      "text.html source.css entity.other.attribute-name.id",
      "text.html source.css entity.other.attribute-name.pseudo-class",
      "text.html source.css entity.other.attribute-name.pseudo-element"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "inline css functions (var, url, rgb) -> purple",
    "scope": [
      "text.html source.css support.function"
    ],
    "settings": {
      "foreground": palette.purple
    }
  },
  {
    "name": "js/ts function names & calls -> purple",
    "scope": [
      "source.js entity.name.function",
      "source.jsx entity.name.function",
      "source.js.jsx entity.name.function",
      "source.ts entity.name.function",
      "source.tsx entity.name.function",
      "source.js meta.function-call entity.name.function",
      "source.ts meta.function-call entity.name.function",
      "source.tsx meta.function-call entity.name.function",
      "source.js entity.name.function.member",
      "source.ts entity.name.function.member",
      "source.tsx entity.name.function.member",
      "source.js meta.method.declaration entity.name.function",
      "source.ts meta.method.declaration entity.name.function",
      "source.tsx meta.method.declaration entity.name.function",
      "source.js support.function",
      "source.ts support.function",
      "source.tsx support.function",
      "source.js variable.function",
      "source.ts variable.function",
      "source.tsx variable.function"
    ],
    "settings": {
      "foreground": palette.purple
    }
  },
  {
    "name": "js/ts types, classes, interfaces, enums -> orange",
    "scope": [
      "source.js entity.name.type",
      "source.ts entity.name.type",
      "source.tsx entity.name.type",
      "source.js entity.name.class",
      "source.ts entity.name.class",
      "source.tsx entity.name.class",
      "source.ts entity.name.type.class",
      "source.tsx entity.name.type.class",
      "source.ts entity.name.type.interface",
      "source.tsx entity.name.type.interface",
      "source.ts entity.name.type.enum",
      "source.tsx entity.name.type.enum",
      "source.ts entity.name.type.alias",
      "source.tsx entity.name.type.alias",
      "source.ts entity.name.type.module",
      "source.js entity.other.inherited-class",
      "source.ts entity.other.inherited-class",
      "source.tsx entity.other.inherited-class",
      "source.js support.class",
      "source.ts support.class",
      "source.tsx support.class"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "js/ts keywords, control, storage, new/typeof/instanceof -> red",
    "scope": [
      "source.js keyword.control",
      "source.ts keyword.control",
      "source.tsx keyword.control",
      "source.js storage.type",
      "source.ts storage.type",
      "source.tsx storage.type",
      "source.js storage.modifier",
      "source.ts storage.modifier",
      "source.tsx storage.modifier",
      "source.js keyword.operator.new",
      "source.ts keyword.operator.new",
      "source.tsx keyword.operator.new",
      "source.js keyword.operator.expression",
      "source.ts keyword.operator.expression",
      "source.tsx keyword.operator.expression"
    ],
    "settings": {
      "foreground": palette.red
    }
  },
  {
    "name": "jsx/tsx tag names -> red",
    "scope": [
      "source.js.jsx entity.name.tag",
      "source.jsx entity.name.tag",
      "source.tsx entity.name.tag",
      "source.js entity.name.tag.js.jsx",
      "source.tsx entity.name.tag.tsx"
    ],
    "settings": {
      "foreground": palette.red
    }
  },
  {
    "name": "jsx/tsx attribute names -> orange",
    "scope": [
      "source.js.jsx entity.other.attribute-name",
      "source.jsx entity.other.attribute-name",
      "source.tsx entity.other.attribute-name",
      "source.js entity.other.attribute-name.jsx"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "js/ts string literals + template + quotes -> default text",
    "scope": [
      "source.js string.quoted",
      "source.jsx string.quoted",
      "source.js.jsx string.quoted",
      "source.ts string.quoted",
      "source.tsx string.quoted",
      "source.js string.template",
      "source.jsx string.template",
      "source.js.jsx string.template",
      "source.ts string.template",
      "source.tsx string.template",
      "source.js string.quoted punctuation.definition.string",
      "source.ts string.quoted punctuation.definition.string",
      "source.tsx string.quoted punctuation.definition.string",
      "source.jsx string.quoted punctuation.definition.string",
      "source.js string.template punctuation.definition.string",
      "source.ts string.template punctuation.definition.string",
      "source.tsx string.template punctuation.definition.string"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "json string values + quotes -> default text",
    "scope": [
      "source.json string.quoted.double",
      "source.json string.quoted.double punctuation.definition.string",
      "source.json meta.structure.dictionary.value string.quoted.double"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "css selectors (tag/class/id/pseudo/&) -> orange",
    "scope": [
      "source.css entity.name.tag",
      "source.css entity.other.attribute-name.class",
      "source.css entity.other.attribute-name.id",
      "source.css entity.other.attribute-name.pseudo-class",
      "source.css entity.other.attribute-name.pseudo-element",
      "source.css entity.other.attribute-name.parent-selector"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "css property names -> default text",
    "scope": [
      "source.css support.type.property-name",
      "source.css meta.property-name",
      "source.css support.type.vendored.property-name"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "css property values, colors, units, font-names -> default text",
    "scope": [
      "source.css support.constant.property-value",
      "source.css support.constant.vendored.property-value",
      "source.css support.constant.font-name",
      "source.css support.constant.color",
      "source.css constant.other.color",
      "source.css keyword.other.unit"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "css functions (var, url, rgb, calc) -> purple",
    "scope": [
      "source.css support.function",
      "source.css meta.function"
    ],
    "settings": {
      "foreground": palette.purple
    }
  },
  {
    "name": "css string values + quotes -> default text",
    "scope": [
      "source.css string.quoted.single",
      "source.css string.quoted.double",
      "source.css string.quoted.single punctuation.definition.string",
      "source.css string.quoted.double punctuation.definition.string"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "css at-rules (@media, @import, @mixin) -> red",
    "scope": [
      "source.css keyword.control.at-rule",
      "source.css punctuation.definition.keyword"
    ],
    "settings": {
      "foreground": palette.red
    }
  },
  {
    "name": "scss/less variables ($var, @var) -> default text",
    "scope": [
      "source.css variable",
      "source.css variable.scss",
      "source.css variable.other.less"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "any-lang function names & calls -> purple",
    "scope": [
      "entity.name.function",
      "meta.function-call entity.name.function",
      "entity.name.function.member",
      "entity.name.function.call",
      "support.function",
      "variable.function"
    ],
    "settings": {
      "foreground": palette.purple
    }
  },
  {
    "name": "any-lang types, classes, interfaces, enums, structs -> orange",
    "scope": [
      "entity.name.type",
      "entity.name.class",
      "entity.other.inherited-class",
      "support.class",
      "entity.name.type.class",
      "entity.name.type.interface",
      "entity.name.type.enum",
      "entity.name.type.struct",
      "entity.name.namespace",
      "storage.type.class",
      "storage.type.struct",
      "storage.type.enum",
      "storage.type.interface"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "any-lang keywords, control, storage, modifiers -> red",
    "scope": [
      "keyword.control",
      "keyword.other",
      "storage.type",
      "storage.modifier",
      "keyword.operator.new",
      "keyword.operator.expression",
      "keyword.operator.wordlike",
      "variable.language"
    ],
    "settings": {
      "foreground": palette.red
    }
  },
  {
    "name": "any-lang markup tag names -> red",
    "scope": [
      "entity.name.tag"
    ],
    "settings": {
      "foreground": palette.red
    }
  },
  {
    "name": "any-lang markup attribute names -> orange",
    "scope": [
      "entity.other.attribute-name"
    ],
    "settings": {
      "foreground": palette.orange
    }
  },
  {
    "name": "any-lang strings + quotes -> default text",
    "scope": [
      "string.quoted",
      "string.interpolated",
      "string.unquoted",
      "string.quoted punctuation.definition.string"
    ],
    "settings": {
      "foreground": palette.text
    }
  },
  {
    "name": "template literals -> tan, emphasis",
    "scope": [
      "string.template",
      "string.quoted.other.template",
      "string.template punctuation.definition.string",
      "punctuation.definition.string.template",
      "source.js string.template",
      "source.jsx string.template",
      "source.js.jsx string.template",
      "source.ts string.template",
      "source.tsx string.template",
      "source.js string.template punctuation.definition.string",
      "source.ts string.template punctuation.definition.string",
      "source.tsx string.template punctuation.definition.string"
    ],
    "settings": {
      "foreground": palette.tan
    }
  },
  {
    "name": "json keys (property-name) -> blue (key/value distinction)",
    "scope": [
      "source.json support.type.property-name",
      "source.json support.type.property-name punctuation.definition.string",
      "source.json meta.structure.dictionary.key string.quoted.double"
    ],
    "settings": {
      "foreground": palette.blue
    }
  },
  {
    "name": "js/ts/generic object literal keys -> blue (key/value distinction)",
    "scope": [
      "source.js meta.object-literal.key",
      "source.jsx meta.object-literal.key",
      "source.js.jsx meta.object-literal.key",
      "source.ts meta.object-literal.key",
      "source.tsx meta.object-literal.key",
      "source.js meta.object-literal.key string.quoted.double",
      "source.ts meta.object-literal.key string.quoted.double",
      "source.tsx meta.object-literal.key string.quoted.double",
      "source.js meta.object-literal.key string.quoted.single",
      "source.ts meta.object-literal.key string.quoted.single",
      "meta.object-literal.key"
    ],
    "settings": {
      "foreground": palette.blue
    }
  },
  {
    "name": "brackets inside strings -> yellow (user)",
    "scope": [
      "punctuation.bracket.in-string"
    ],
    "settings": {
      "foreground": palette.yellow
    }
  },
];
