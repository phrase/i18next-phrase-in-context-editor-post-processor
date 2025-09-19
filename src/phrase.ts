import '@sagi.io/globalthis';
import './typings/global';
import './typings/helpers';
import { DeepPartial } from './typings/helpers';
import { PhraseConfig } from "./phrase-config.type";

export type PhraseInContextEditorOptions = Omit<DeepPartial<PhraseConfig>, 'phraseEnabled' | 'projectId'> & Pick<PhraseConfig, 'phraseEnabled' | 'projectId'>;

export default class PhraseInContextEditorPostProcessor {
    private defaultConfig: Partial<PhraseConfig> = {
        prefix: '{{__',
        suffix: '__}}',
        fullReparse: true,
        useOldICE: false,
        scriptAutoLoad: true,
        origin: 'i18next-phrase-in-context-editor-post-processor',
    };
    phraseScript?: HTMLScriptElement;

    get IN_CONTEXT_EDITOR_SCRIPT_URL () {
        if (this.config.useOldICE) {
            return `https://phrase.com/assets/in-context-editor/2.0/app.js?${new Date().getTime()}`;
        } else {
            return 'https://cdn.phrase.com/strings/plugins/editor/revisions/6a34063467cceff46a4bdd655d2e141741f518a8/ice/index.js';
        }
    }

    static interpolateKey (key: string, prefix: string, suffix: string): string {
        return prefix + 'phrase_' + key + suffix;
    }

    loadInContextEditorScript() {
        if (typeof window !== 'undefined') {
            const phraseScript = document.createElement('script');

            !this.config.useOldICE 
                ? phraseScript.type = 'module'
                : phraseScript.type = 'text/javascript';
            
            phraseScript.async = true;
            phraseScript.src = this.IN_CONTEXT_EDITOR_SCRIPT_URL;
            const script = document.getElementsByTagName('script')[0];
            if (script && script.parentNode) {
                script.parentNode.insertBefore(phraseScript, script);
            } else {
                document.body.appendChild(phraseScript);
            }
    
            return phraseScript;
        }
    }

    type: 'postProcessor' = 'postProcessor';
    name = 'phraseInContextEditor';

    constructor (options: PhraseInContextEditorOptions) {
        this.config = { ...globalThis.PHRASEAPP_CONFIG, ...options } as PhraseConfig;
        this.phraseEnabled = options.phraseEnabled;
    }

    interpolateKey (key: string) {
        return PhraseInContextEditorPostProcessor.interpolateKey(key, this.config.prefix, this.config.suffix);
    }

    process (value: string, keys: string[], options: unknown, translator: unknown): string {
        return this.phraseEnabled
            ? this.interpolateKey(keys[0])
            : value;
    }

    set phraseEnabled(phraseEnabled: boolean) {
        globalThis.PHRASEAPP_ENABLED = phraseEnabled;
        if (phraseEnabled && this.config.scriptAutoLoad && !this.phraseScript) {
            this.phraseScript = this.loadInContextEditorScript();
        }
    }

    get phraseEnabled() {
        return globalThis.PHRASEAPP_ENABLED;
    }

    set config(options: PhraseConfig) {
        globalThis.PHRASEAPP_CONFIG = { ...this.defaultConfig, ...options };
    }

    get config() {
        return globalThis.PHRASEAPP_CONFIG;
    }

    toScriptHTML () {
        return `<script>window.PHRASEAPP_ENABLED=true;window.PHRASEAPP_CONFIG=${JSON.stringify(this.config)}</script><script type="text/javascript" async src="${this.IN_CONTEXT_EDITOR_SCRIPT_URL}"></script>`;
    }
}
