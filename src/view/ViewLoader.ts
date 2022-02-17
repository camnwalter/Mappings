import vscode, { Uri } from "vscode";
import path from "path";

export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;

  constructor(extensionPath: string) {
    this._extensionPath = extensionPath;

    this._panel = vscode.window.createWebviewPanel(
      "mappings",
      "Mappings",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    this._panel.webview.html = this.getWebviewContent();
    this._panel.iconPath = Uri.parse("https://i.imgur.com/uw0y2K8.png");
  }

  private getWebviewContent(): string {
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "bundle.js")
    );
    const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mappings</title>
        <meta http-equiv="Content-Security-Policy"
          content="default-src 'none';
          img-src https:;
          script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
          style-src vscode-resource: 'unsafe-inline';"
        >
    </head>
    <body>
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
  }
}
