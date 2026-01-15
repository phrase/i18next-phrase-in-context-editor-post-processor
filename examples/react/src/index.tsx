import React from 'react';
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next, Trans } from "react-i18next";
import PhraseInContextEditorPostProcessor from "i18next-phrase-in-context-editor-post-processor";

await i18n
    .use(initReactI18next)
    .use(new PhraseInContextEditorPostProcessor({ // Init Phrase ICE
        phraseEnabled: true,
        projectId: '00000000000000004158e0858d2fa45c',
        accountId: '0bed59e5',
        useOldICE: false,
        prefix: '[[__phrase_', // This can't be default "{{__phrase_" to make Trans elements work
        suffix: '__]]', // {{}} strings don't play nicely with React
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
    const count = 1;
    return <h2>
        {t('some_test_key_name')}
        <br />
        <Trans
            i18nKey="my.key"
            // disable post processing for this Trans call
            tOptions={{ postProcess: false }}
            components={{ strong: <strong /> }}
        />
        <br />
        <Trans t={t}>Hello World</Trans>
        <br />
        <Trans i18nKey="pages.nlp.conversationInsights.expressionsDrawer.description" tOptions={{postProcess: ['phraseInContextEditor']}}/>
        <br />
        <Trans i18nKey="userMessagesUnread" count={count}>
            Hello <strong title={t('nameTitle')}>{{name}}</strong>, you have {{count}} unread message.
        </Trans>
        <br />
        <Trans
            i18nKey="myKey" // optional -> fallbacks to defaults if not provided
            defaults="hello <italic>beautiful</italic> <bold>{{what}}</bold>" // optional defaultValue
            values={{ what: 'world'}}
            components={{ italic: <i />, bold: <strong /> }}
        />
    </h2>;
}

// append app to dom
const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
