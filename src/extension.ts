/**
 * @file extension.ts
 * @description Nightfall Theme 적용 및 충돌 색상 설정 정리 명령을 제공하는 런타임 진입점
 * @author Jungho
 */

import * as vscode from "vscode";

const THEME_NAME = "Nightfall Theme";

// readme 가 제거를 요구하는 사용자 색상 커스터마이즈 키 (테마가 소유)
const CONFLICT_KEYS = [
  "editor.tokenColorCustomizations",
  "editor.semanticTokenColorCustomizations",
  "workbench.colorCustomizations",
];

// 테마 적용 + 사용자 설정에 남아 있는 충돌 커스터마이즈 정리
async function applyTheme(): Promise<void> {
  const config = vscode.workspace.getConfiguration();
  try {
    // 테마 지정 (사용자 설정)
    await config.update("workbench.colorTheme", THEME_NAME, vscode.ConfigurationTarget.Global);

    // 충돌 커스터마이즈 제거 (사용자 설정에 실제로 있는 항목만)
    const removed = [];
    for (const key of CONFLICT_KEYS) {
      const info = config.inspect(key);
      if (info?.globalValue !== undefined) {
        await config.update(key, undefined, vscode.ConfigurationTarget.Global);
        removed.push(key);
      }
    }

    // 결과 알림
    const detail = removed.length > 0 ? `정리한 항목: ${removed.join(", ")}` : "제거할 충돌 설정 없음";
    void vscode.window.showInformationMessage(`${THEME_NAME} 적용 완료. ${detail}`);
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    void vscode.window.showErrorMessage(`${THEME_NAME} 적용 실패: ${message}`);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(vscode.commands.registerCommand("vscode-nightfall-theme.apply", applyTheme));
}

export function deactivate(): void {}
