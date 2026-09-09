/**
 * @file palette.ts
 * @description 프로젝트 토큰 규칙이 참조하는 단일 소스 팔레트
 * @author Jungho
 */

// 웹 정렬 팔레트 (readme Palette 표와 1:1). 값은 여기 한 곳에서만 정의함
export const palette = {
  text: "#D1D7E0",
  blue: "#6CB6FF",
  purple: "#CBA6F7",
  orange: "#F69D50",
  red: "#F47067",
  green: "#63EC63",
  commentGreen: "#7CA964",
  tan: "#F4D4AE",
  yellow: "#F2CC60",
} as const;

export type PaletteName = keyof typeof palette;
