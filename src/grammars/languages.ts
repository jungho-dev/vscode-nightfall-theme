/**
 * @file languages.ts
 * @description 태그드 템플릿에 임베드할 언어 표 (문법 생성의 단일 소스)
 * @author Jungho
 */

export interface EmbeddedLanguage {
  key: string;
  tagNames: string;
  hintNames: string;
  contentName: string;
  include: string;
}

// 순서가 곧 주입 우선순위임. scss/less 를 css 앞에 두어 접두 오탐을 막음
export const LANGUAGES: EmbeddedLanguage[] = [
  {
    key: "html",
    tagNames: "html|htm",
    hintNames: "html",
    contentName: "meta.embedded.block.html text.html.basic",
    include: "text.html.basic",
  },
  {
    key: "scss",
    tagNames: "scss",
    hintNames: "scss",
    contentName: "meta.embedded.block.scss source.css.scss",
    include: "source.css.scss",
  },
  {
    key: "less",
    tagNames: "less",
    hintNames: "less",
    contentName: "meta.embedded.block.less source.css.less",
    include: "source.css.less",
  },
  {
    key: "css",
    tagNames: "css",
    hintNames: "css",
    contentName: "meta.embedded.block.css source.css",
    include: "source.css",
  },
  {
    key: "sql",
    tagNames: "sql",
    hintNames: "sql",
    contentName: "meta.embedded.block.sql source.sql",
    include: "source.sql",
  },
  {
    key: "json",
    tagNames: "json",
    hintNames: "json",
    contentName: "meta.embedded.block.json source.json",
    include: "source.json",
  },
  {
    key: "shell",
    tagNames: "sh|bash|shell|zsh",
    hintNames: "sh|bash|shell|zsh",
    contentName: "meta.embedded.block.shell source.shell",
    include: "source.shell",
  },
];
