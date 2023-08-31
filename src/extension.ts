import * as vscode from "vscode";

/**
 * @description: 获取缩进
 * @param {string} text
 */
function getIndentation(text: string) {
  const match = text.match(/^\s*/);
  return match ? match[0] : "";
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.convertPxToPx",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const line = editor.document.lineAt(selection.start.line);

      const indent = getIndentation(line.text);

      const newText = line.text.replace(/(\d+)px/g, "$1Px");

      editor.edit((editBuilder) => {
        editBuilder.replace(
          line.range,
          `${indent}/* prettier-ignore */\n${newText}`
        );
      });
    }
  );

  context.subscriptions.push(disposable);
}
