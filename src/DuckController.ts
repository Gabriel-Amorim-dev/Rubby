import * as vscode from 'vscode';
import { RubbyViewProvider } from "./RubbyViewProvider";

export class DuckController {
    public currentErrorCount: number = 0;
    public isSleeping: boolean = false;

    constructor(
        private provider: RubbyViewProvider
    ) {}

    public setHappy(errorCount: number = 0) {
        this.provider.postMessage({
            type: "state",
            state: "happy",
            errorCount
        });
    }

    public setSad(errorCount: number = 0) {
        this.provider.postMessage({
            type: "state",
            state: "sad",
            errorCount
        });
    }

    public setScared(errorCount: number = 0) {
        this.provider.postMessage({
            type: "state",
            state: "scared",
            errorCount
        });
    }

    public setWalking(errorCount: number = 0) {
        this.provider.postMessage({
            type: "state",
            state: "walking",
            errorCount
        });
    }
    
    public setCool(errorCount: number = 0) {
        this.provider.postMessage({
            type: "state",
            state: "cool",
            errorCount
        });
    }

    public setSleeping() {
        this.isSleeping = true;
        this.provider.postMessage({
            type: "state",
            state: "sleeping",
            errorCount: this.currentErrorCount
        });
    }
    
    public wakeUp() {
        if (this.isSleeping) {
            this.isSleeping = false;
            this.updateErrors(this.currentErrorCount);
        }
    }

    public updateErrors(errorCount: number) {
        this.currentErrorCount = errorCount;

        const config = vscode.workspace.getConfiguration('rubby');
        const sadThreshold = config.get<number>('sadThreshold', 10);
        const scaredThreshold = config.get<number>('scaredThreshold', 30);

        let action = () => {};

        if (errorCount === 0) {
            action = () => this.setHappy(errorCount);
        } else if (errorCount > scaredThreshold) {
            action = () => this.setScared(errorCount);
        } else if (errorCount > sadThreshold) {
            action = () => this.setSad(errorCount);
        } else {
            action = () => this.setWalking(errorCount);
        }

        if (!this.isSleeping) {
            action();
        }
    }
}