import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import PhraseInContextEditorPostProcessor from 'i18next-phrase-in-context-editor-post-processor';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            'title': 'This headline should be replaced when In-Context editor is enabled',
            'intro': 'Intro translation'
        }
    },
    de: {
        translation: {
            'title': 'Hallo',
            'intro': 'Test',
        }
    }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(new PhraseInContextEditorPostProcessor({
        phraseEnabled: true,
        projectId: '00000000000000004158e0858d2fa45c',
        accountId: '0bed59e5',
        useOldICE: false,
    }))
    .init({
        resources,
        lng: 'en',

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        },
        postProcess: ['phraseInContextEditor']
    });

export default i18n;
  