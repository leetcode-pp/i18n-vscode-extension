import * as path from "path";
import * as vscode from "vscode";
import * as fs from "fs";
// 获取工作目录路径
const workspacePath = vscode.workspace.workspaceFolders?.[0].uri
  .fsPath as string;

const ALL_LANGS: any = {
  zh: {},
  en: {},
};

async function getLangPkg(lang: string) {
  await fs.readFile(
    path.join(workspacePath, "/src/locales", lang + ".js"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      ALL_LANGS[lang] = eval(data);
      return data;
    }
  );
}
getLangPkg("zh");
getLangPkg("en");

vscode.workspace.onDidChangeTextDocument((event) => {
  const changedDocument = event.document;
  const changedFilePath = changedDocument.uri.fsPath;

  if (changedFilePath.includes("locales")) {
    getLangPkg("zh");
    getLangPkg("en");
  }
});

/**
 * 获取对象指定路径的值
 * @param {object} obj
 * @param {string} path
 * @returns any
 */
const getForPath = (obj: any, path: string) => {
  const pathArr = path.split(".");

  let result = obj;
  for (const key of pathArr) {
    result = result[key];
  }
  return result;
};

export const t = (keypath: string, l: string) => {
  const langData = { Locale: ALL_LANGS[l] };

  if (!keypath) {
    return "";
  }
  if (!keypath.includes("Locale")) {
    keypath = "Locale." + keypath;
  }
  let content = getForPath(langData, keypath);

  return content;
};

export const hoverProvider = vscode.languages.registerHoverProvider(
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