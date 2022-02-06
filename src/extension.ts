import * as vscode from "vscode";
import ViewLoader from "./view/ViewLoader";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.mappingSearch",
    () => {
      const view = new ViewLoader(context.extensionPath);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
