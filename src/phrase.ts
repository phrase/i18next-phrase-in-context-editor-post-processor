import '@sagi.io/globalthis';
import { DeepPartial } from './typings/helpers';
import { PhraseConfig } from "./phrase-config.type";

export type PhraseInContextEditorOptions = Omit<DeepPartial<PhraseConfig>, 'phraseEnabled' | 'projectId'> & Pick<PhraseConfig, 'phraseEnabled' | 'projectId'>;

export default class PhraseInContextEditorPostProcessor {
    private static defaultConfig: Partial<PhraseConfig> = {
        prefix: '{{__',
        suffix: '__}}',
        fullReparse: true
    };
    private phraseScript?: HTMLScriptElement;

    static interpolateKey (key: string, prefix: string, suffix: string): string {
        return prefix + 'phrase_' + key + suffix;
    }

    type: 'postProcessor' = 'postProcessor';
    name = 'phraseInContextEditor';

    constructor (options: PhraseInContextEditorOptions) {
        this.config = { ...(globalThis as any).PHRASEAPP_CONFIG, ...options } as PhraseConfig;
        this.phraseEnabled = options.phraseEnabled;
    }

    process (value: string, keys: string[], options: unknown, translator: unknown): string {
        return this.phraseEnabled
            ? this.interpolateKey(keys[0])
            : value;
    }

    interpolateKey (key: string) {
        return PhraseInContextEditorPostProcessor.interpolateKey(key, this.config.prefix, this.config.suffix);
    }

    private loadInContextEditor() {
        this.phraseScript = document.createElement('script');
        this.phraseScript.type = 'text/javascript';
        this.phraseScript.async = true;
        this.phraseScript.src = `https://phrase.com/assets/in-context-editor/2.0/app.js?${new Date().getTime()}`;
        const script = document.getElementsByTagName('script')[0];
        if (script && script.parentNode) {
            script.parentNode.insertBefore(this.phraseScript, script);
        } else {
            document.body.appendChild(this.phraseScript);
        }
    }

    set phraseEnabled(phraseEnabled: boolean) {
        (globalThis as any).PHRASEAPP_ENABLED = phraseEnabled;
        if (phraseEnabled && !this.phraseScript) {
            this.loadInContextEditor();
        }
    }

    get phraseEnabled() {
        return (globalThis as any).PHRASEAPP_ENABLED;
    }

    set config(options: PhraseConfig) {
        (globalThis as any).PHRASEAPP_CONFIG = { ...PhraseInContextEditorPostProcessor.defaultConfig, ...options };
    }

    get config() {
        return (globalThis as any).PHRASEAPP_CONFIG;
    }
}
