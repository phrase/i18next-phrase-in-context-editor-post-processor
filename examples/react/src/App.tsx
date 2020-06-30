import React from 'react';
import { useTranslation, Translation } from 'react-i18next';
import UseTranslationExampleComponent from './UseTranslationExampleComponent';

function App() {
    const { t } = useTranslation();
    return (
        <main>
            Using useTranslation hook:
            <h1>{t('title')}</h1>
            Using Translation render prop:
            <Translation>
                {
                    t => <h3>{t('intro')}</h3>
                }
            </Translation>
            <UseTranslationExampleComponent></UseTranslationExampleComponent>
        </main>
    );
}

export default App;
