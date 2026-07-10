import * as vscode from 'vscode';
import { RubbyViewProvider } from './RubbyViewProvider';
import { DuckController } from './DuckController';


let sleepTimer: NodeJS.Timeout | undefined;
let isAsleep = false;
let coolDebounce: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext) {
  const provider = new RubbyViewProvider(context.extensionUri);
  const duckController = new DuckController(provider);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(RubbyViewProvider.viewType, provider)
  );

  const resetSleepTimer = () => {
    if (sleepTimer) {
      clearTimeout(sleepTimer);
    }
    
    if (isAsleep) {
      isAsleep = false;
      duckController.wakeUp();
    }

    const config = vscode.workspace.getConfiguration('rubby');
    const sleepMinutes = config.get<number>('idleSleepMinutes', 5);
    
    sleepTimer = setTimeout(() => {
        isAsleep = true;
        duckController.setSleeping();
    }, sleepMinutes * 60 * 1000);
  };

  resetSleepTimer();

  context.subscriptions.push(
      vscode.workspace.onDidChangeTextDocument(() => {
          resetSleepTimer();
      })
  );

  context.subscriptions.push(
      vscode.workspace.onDidChangeConfiguration(e => {
          if (e.affectsConfiguration('rubby')) {
              duckController.updateErrors(duckController.currentErrorCount);
              resetSleepTimer();
          }
      })
  );

  context.subscriptions.push(
      vscode.commands.registerCommand('rubby.configureThresholds', () => {
          vscode.commands.executeCommand('workbench.action.openSettings', 'rubby');
      })
  );

  context.subscriptions.push(
    vscode.languages.onDidChangeDiagnostics(() => {

        let errors = 0;

        for (const [, diagnostics] of vscode.languages.getDiagnostics()) {
            errors += diagnostics.filter(
                d => d.severity === vscode.DiagnosticSeverity.Error
            ).length;
        }

        console.log(`Errors: ${errors}`);

        duckController.updateErrors(errors);

    })
  );

  context.subscriptions.push(
      vscode.debug.onDidStartDebugSession(() => {
          if (coolDebounce) return;

          coolDebounce = setTimeout(() => {
              coolDebounce = undefined;
          }, 500);

          if (duckController.currentErrorCount === 0) {
              duckController.setCool();
          }
      })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('rubby.talk', () => {
      provider.postMessage({ type: 'talk' });
    })
);
  
  context.subscriptions.push(
  vscode.commands.registerCommand("rubby.testHappy", () => {
    console.log("TEST HAPPY");
    provider.postMessage({ type: "state", state: "happy" });
  })
);

  context.subscriptions.push(
    vscode.commands.registerCommand("rubby.testSad", () => {
        provider.postMessage({
            type: "state",
            state: "sad"
        });
    })
);

context.subscriptions.push(
    vscode.commands.registerCommand("rubby.testScared", () => {

        provider.postMessage({
            type: "state",
            state: "scared"
        });

    })
);
}

export function deactivate() {
  if (sleepTimer) {
    clearTimeout(sleepTimer);
  }
  if (coolDebounce) {
    clearTimeout(coolDebounce);
  }
}