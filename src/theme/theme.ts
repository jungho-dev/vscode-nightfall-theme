/**
 * @file theme.ts
 * @description 벤더 색상과 프로젝트 토큰을 합쳐 테마 매니페스트를 구성함
 * @author Jungho
 */

import { palette } from "../palette";
import { workbenchColors, baseTokens } from "./vendor";
import { projectTokens } from "./tokens";
import type { ThemeManifest } from "../types";

// base 규칙 뒤에 프로젝트 규칙을 이어 붙여 오버라이드 우선순위를 유지함
export function buildTheme(): ThemeManifest {
  return {
    name: "Urban Theme",
    colors: workbenchColors,
    semanticHighlighting: false,
    tokenColors: [...baseTokens, ...projectTokens],
    semanticTokenColors: {
      comment: {
        foreground: palette.commentGreen,
      },
    },
  };
}
