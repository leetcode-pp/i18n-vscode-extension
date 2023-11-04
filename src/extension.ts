import * as vscode from "vscode";
import { t } from "./languageHelper/index";

export async function activate(context: vscode.ExtensionContext) {
  // 注册悬停提供程序
  let hoverProvider = vscode.languages.registerHoverProvider(
    ["javascript", "javascriptreact", "plaintext", "jsx"],
    {
      async provideHover(document, position) {
        const range = document.getWordRangeAtPosition(position) as any;
        const word = document.getText(range);

        // 根据当前行获取文本内容
        const lineContent = document.getText(document.lineAt(position).range);
        const tCtx = lineContent.match(/t\(['"].+['"]\)?/g)?.[0] || "";
        const objPath = tCtx?.replace(/t\(['"]/g, "").replace(/['"]\)/g, "");

        // 找出 t() 函数参数的位置
        const start = lineContent.indexOf(objPath);
        const end = start + word.length;

        const range2 = new vscode.Range(
          new vscode.Position(position.line, start),
          new vscode.Position(position.line, end)
        );

        const content = new vscode.MarkdownString(``);
        content.appendMarkdown(`
- **中文：**${t(objPath, "zh")}  
---
- **英文：**${t(objPath, "en")}`);
        content.supportHtml = true;
        content.isTrusted = true;

        if (lineContent.includes("t(") && tCtx.includes(word)) {
          return new vscode.Hover(content, range2);
        }

        return null;
      },
    }
  );

  context.subscriptions.push(hoverProvider);
}

// this method is called when your extension is deactivated
export function deactivate() {}
