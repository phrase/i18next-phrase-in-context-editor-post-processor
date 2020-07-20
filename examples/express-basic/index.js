const express = require('express');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const PhraseInContextEditorPostProcessor = require('i18next-phrase-in-context-editor-post-processor');

const app = express();
const port = process.env.PORT || 8080;

const PhraseICEPostProcessorInstance = new PhraseInContextEditorPostProcessor({
    phraseEnabled: true,
    scriptAutoLoad: false,
    projectId: '00000000000000004158e0858d2fa45c'
});

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .use(PhraseICEPostProcessorInstance)
    .init({
        backend: {
            loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
            addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
        },
        debug: true,
        fallbackLng: 'en',
        preload: ['en', 'de'],
        postProcess: ['phraseInContextEditor']
    });

const phraseICEScriptHTML = PhraseICEPostProcessorInstance.toScriptHTML();

app.use(i18nextMiddleware.handle(i18next));

app.get('/', (req, res) => {
    res.send(`
        <h1>${req.t('title')}</h1>
        <h2>${req.t('intro')}</h2>
        ${phraseICEScriptHTML}
    `);
});

app.get('/title', (req, res) => {
    res.send(
        req.t('title') +
        phraseICEScriptHTML
    );
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
