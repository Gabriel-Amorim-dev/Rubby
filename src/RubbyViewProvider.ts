import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export class RubbyViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'rubbyView';
  private view?: vscode.WebviewView;

  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')]
    };

    const duckUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'duck.png')
    );
    

    webviewView.webview.html = this.getHtml(webviewView.webview);
  }

  postMessage(message: any) {
  if (!this.view) {
    console.warn('Rubby: view not resolved yet, message dropped', message);
    return;
  }
  this.view.webview.postMessage(message);
}

  private getHtml(webview: vscode.Webview): string {

    const htmlPath = path.join(
        this.extensionUri.fsPath,
        "media",
        "index.html"
    );

    let html = fs.readFileSync(htmlPath, "utf8");

    const duckUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "duck.png")
    );
    const HappyDuckUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "happy-duck.png")
    );
    const ScaredDuckUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "scared-duck.png")
    );
    const SadDuckUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "sad-duck.png")
    );
    const SleepyDuckUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "sleepy-duck.png")
    );
    const CoolDuckUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "cool-duck.png")
    );
    const LaughingDuckUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "laughing-duck.png")
    );

    const cssUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "style.css")
    );

    const jsUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "media", "duck-control.js")
    );

    const phrasesUri = webview.asWebviewUri(
    vscode.Uri.joinPath(this.extensionUri, "media", "phrases.js")
    );

    html = html.replace(/\{\{duck\}\}/g, duckUri.toString());
    html = html.replace(/\{\{style\}\}/g, cssUri.toString());
    html = html.replace(/\{\{script\}\}/g, jsUri.toString());
    html = html.replace(/\{\{happyDuck\}\}/g, HappyDuckUri.toString());
    html = html.replace(/\{\{scaredDuck\}\}/g, ScaredDuckUri.toString());
    html = html.replace(/\{\{sadDuck\}\}/g, SadDuckUri.toString());  
    html = html.replace(/\{\{sleepyDuck\}\}/g, SleepyDuckUri.toString());
    html = html.replace(/\{\{coolDuck\}\}/g, CoolDuckUri.toString());
    html = html.replace(/\{\{laughingDuck\}\}/g, LaughingDuckUri.toString());
    html = html.replace(/\{\{phrases\}\}/g, phrasesUri.toString());
    return html;
  } 
}