

import i18next from "i18next";
import PhraseInContextEditorPostProcessor from "i18next-phrase-in-context-editor-post-processor";
import { ref } from "vue";

export const i18nextInstance = i18next.createInstance({
    postProcess: ['phraseInContextEditor']
});

export const initializeI18next = async () => {
    i18nextInstance
        .use(new PhraseInContextEditorPostProcessor({
            phraseEnabled: true,
            projectId: '00000000000000004158e0858d2fa45c',
            accountId: '0bed59e5',
            useOldICE: false,
        }));
    await i18nextInstance.init();
};
export const useTranslate = () => {
    return {t:ref(i18nextInstance.t.bind(i18nextInstance))};
};
