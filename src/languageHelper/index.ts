import * as vscode from 'vscode';
import { workspace, window } from "vscode";

export function getActiveWorkspaceFolder(): string | undefined {
    const fileName = window.activeTextEditor?.document.fileName;
    console.log("getActiveWorkspaceFolder fileName", fileName);
    console.log(" workspace.workspaceFolders",workspace.workspaceFolders);
    return workspace.workspaceFolders
      ?.map((folder) => folder.uri.fsPath)
      .filter((fsPath) => fileName?.startsWith(fsPath))[0];
}
const { createConnection } = require('vscode-languageserver/node');

// 创建连接
const connection = createConnection();

// 启动语言服务器
connection.listen();

// 注册事件处理函数等
// ...

// 导出连接对象，以便其他模块可以使用
module.exports = connection;


// 当鼠标悬浮是根据路径解析实际的文本作为悬浮提示
export function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
    const fileName = document.fileName;
    getActiveWorkspaceFolder();

    connection.onHover((params:any) => {
        const { textDocument, position } = params;
        const { uri } = textDocument;
        const { line, character } = position;
    console.log("connection.onHover",uri, line, character);
    
        // // 根据 URI、行号和列号等信息获取对应的文本内容
        // const text = getTextFromDocument(uri, line, character);
    
        // // 解析文本内容，获取对象路径
        // const objectPath = parseObjectPath(text);
    
        // // 根据对象路径查找中文和英文文本
        // const chineseText = findChineseText(objectPath);
        // const englishText = findEnglishText(objectPath);
    
        // // 构造提示信息
        // const hoverContent = {
        //   contents: [
        //     { language: "zh", value: chineseText },
        //     { language: "en", value: englishText },
        //   ],
        // };
    
        // return hoverContent;
      });
//   const workDir = path.dirname(fileName);
//   const word = document.getText(document.getWordRangeAtPosition(position));
//   const line = document.lineAt(position);
//   const projectPath = getProjectPath(document);

}