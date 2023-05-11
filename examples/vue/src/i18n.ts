
import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import PhraseInContextEditorPostProcessor from 'i18next-phrase-in-context-editor-post-processor';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            'title': 'This headline should be replaced when In-Context editor is enabled',
            'intro': 'Intro translation',
        }
    },
    de: {
        translation: {
            'title': 'Hallo',
            'intro': 'Test',
        }
    }
};

Vue.use(VueI18Next);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18next
    .use(new PhraseInContextEditorPostProcessor({
        phraseEnabled: true,
        projectId: '00000000000000004158e0858d2fa45c',
        accountId: '0bed59e5',
    }))
    .init({
        resources,
        lng: 'en',
        postProcess: ['phraseInContextEditor']
    });

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        i18n?: VueI18Next;
    }
}

export default new VueI18Next(i18next);
