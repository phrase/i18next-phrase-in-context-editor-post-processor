/*
  Do not copy/paste this code. It is used internally
  to manage end-to-end test suites.
*/
const PhraseInContextEditorPostProcessor = process.browser
    ? require('i18next-phrase-in-context-editor-post-processor').default
    : require('i18next-phrase-in-context-editor-post-processor');
const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
    defaultLanguage: 'en',
    otherLanguages: ['de'],
    use: [
        new PhraseInContextEditorPostProcessor({
            phraseEnabled: true,
            projectId: '00000000000000004158e0858d2fa45c'
        })
    ],
    postProcess: ['phraseInContextEditor']
});
