import React from 'react';
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import PhraseInContextEditorPostProcessor from "i18next-phrase-in-context-editor-post-processor";

await i18n
    .use(initReactI18next)
    .use(new PhraseInContextEditorPostProcessor({ // Init Phrase ICE
        phraseEnabled: true,
        projectId: '00000000000000004158e0858d2fa45c',
        accountId: '0bed59e5',
        useOldICE: false,
        prefix: '{{__phrase_',
        suffix: '__}}',
    }))
    .init({
        resources: {
            en: {
                translation: {
                    "some_test_key_name": "Welcome to React and react-i18next"
                }
            }
        },
        lng: "en",
        fallbackLng: "en",
        postProcess: ['phraseInContextEditor']
    });
    

function App() {
    const { t } = useTranslation();
    return <h2>{t('some_test_key_name')}</h2>;
}

// append app to dom
const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
