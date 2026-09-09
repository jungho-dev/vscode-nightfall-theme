/**
 * @file types.ts
 * @description Nightfall Theme 산출물(테마 매니페스트·TextMate 문법)의 타입 계약
 * @author Jungho
 */

// 테마 매니페스트
export interface TokenSettings {
  foreground?: string;
  background?: string;
  fontStyle?: string;
  content?: string;
}

export interface TokenColor {
  name?: string;
  scope: string | string[];
  settings: TokenSettings;
}

// 워크벤치 색상은 대부분 문자열, symbolIcon.constantForeground 만 배열임
export type WorkbenchColors = Record<string, string | string[]>;

export interface ThemeManifest {
  name: string;
  colors: WorkbenchColors;
  semanticHighlighting: boolean;
  tokenColors: TokenColor[];
  semanticTokenColors: Record<string, { foreground: string }>;
}

// TextMate 주입 문법
export interface GrammarCapture {
  name: string;
}

export interface GrammarPattern {
  include?: string;
  match?: string;
  name?: string;
}

export interface GrammarRule {
  name?: string;
  begin?: string;
  beginCaptures?: Record<string, GrammarCapture>;
  end?: string;
  endCaptures?: Record<string, GrammarCapture>;
  match?: string;
  contentName?: string;
  patterns?: GrammarPattern[];
}

export interface InjectionGrammar {
  $schema: string;
  scopeName: string;
  injectionSelector: string;
  patterns: GrammarPattern[];
  repository: Record<string, GrammarRule>;
}
