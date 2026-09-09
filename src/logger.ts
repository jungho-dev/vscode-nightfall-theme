/**
 * @file logger.ts
 * @description 빌드 진행 로그 출력
 * @author Jungho
 */

export const logger = {
  step(message: string): void {
    console.log(message);
  },
  ok(message: string): void {
    console.log(`  ok   ${message}`);
  },
  warn(message: string): void {
    console.log(`  warn ${message}`);
  },
  fail(message: string): void {
    console.error(`  FAIL ${message}`);
  },
};
