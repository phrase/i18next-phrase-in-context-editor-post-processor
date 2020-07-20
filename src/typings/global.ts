import { PhraseConfig } from '../phrase-config.type';

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var PHRASEAPP_ENABLED: boolean;
    // eslint-disable-next-line vars-on-top, no-var
    var PHRASEAPP_CONFIG: PhraseConfig;
}
