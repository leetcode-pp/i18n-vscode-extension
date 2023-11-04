import * as path from "path";
import * as vscode from "vscode";

// 获取工作目录路径
const workspacePath = vscode.workspace.workspaceFolders?.[0].uri
  .fsPath as string;
const zh = require(path.join(workspacePath, "/src/locales/zh.js"));
const en = require(path.join(workspacePath, "/src/locales/en.js"));
const ALL_LANGS: any = {
  zh,
  en,
};

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
