import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import PhraseInContextEditorPostProcessor from 'i18next-phrase-in-context-editor-post-processor';

// based on official i18next example https://jsfiddle.net/jamuhl/ferfywyf

document.querySelectorAll<HTMLButtonElement>('[data-language]')
    .forEach((btn) =>
        btn.addEventListener('click', () =>
            i18next.changeLanguage(btn.getAttribute('data-language') ?? 'en')
        )
    );

const updateContent = () => {
    const title = document.getElementById('title');
    const saveBtn = document.getElementById('saveBtn');
    const info = document.getElementById('info');

    if (title) 
        title.textContent = i18next.t('title', { what: 'i18next' });
    if (saveBtn)
        saveBtn.textContent = i18next.t('common:button.save', { count: Math.floor(Math.random()*2+1)  });
    if (info) 
        info.textContent = `detected user language: "${i18next.language}"  --> loaded languages: "${i18next.languages.join(', ')}"`;
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18next
    .use(i18nextXHRBackend)
    .use(i18nextBrowserLanguageDetector)
    .use(new PhraseInContextEditorPostProcessor({
        phraseEnabled: true,
        projectId: '00000000000000004158e0858d2fa45c',
        accountId: '0bed59e5',
        useOldICE: false,
    }))
    .init({
        fallbackLng: 'en',
        debug: true,
        ns: ['special', 'common'],
        defaultNS: 'special',
        backend: {
            // load from i18next-gitbook repo
            loadPath: 'https://raw.githubusercontent.com/i18next/i18next-gitbook/master/locales/{{lng}}/{{ns}}.json',
            crossDomain: true
        },
        postProcess: ['phraseInContextEditor']
    }, function(err, t) {
        updateContent();
        i18next.on('languageChanged', updateContent);
    });
