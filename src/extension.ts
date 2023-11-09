import * as vscode from "vscode";
import { hoverProvider } from "./languageHelper/index";

export async function activate(context: vscode.ExtensionContext) {

  // 注册悬停提供程序

  context.subscriptions.push(hoverProvider);
}

// this method is called when your extension is deactivated
export function deactivate() {}
