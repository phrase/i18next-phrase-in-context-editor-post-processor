import PhraseInContextEditorPostProcessor from "../src/phrase";

const projectId = 'some_project_id';
let phraseInContextEditorPostProcessor: PhraseInContextEditorPostProcessor;

afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
});

describe('constructor', () => {
    let phraseScript: HTMLScriptElement | null;

    describe('when phraseEnabled = true', () => {
        beforeEach(() => {
            phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
                projectId,
                phraseEnabled: true,
            });
            phraseScript = document.querySelector('script');
        });

        it('should add script tag to the document', () => {
            expect(phraseScript).not.toBeNull();
        });
        it('should add script tag with phrase url', () => {
            expect(phraseScript?.src.substring(0, 19)).toBe('https://phrase.com/');
        });
        it('should set window.PHRASEAPP_ENABLED', () => {
            expect(window.PHRASEAPP_ENABLED).toBeTruthy();
        });
        describe('when script element already exists in the document', () => {
            let script: HTMLScriptElement;
            beforeEach(() => {
                // eslint-disable-next-line no-unused-expressions
                phraseScript?.remove();
                script = document.createElement('script');
                document.head.append(script);
                phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
                    projectId,
                    phraseEnabled: true,
                });
                phraseScript = document.querySelector('script');
            });

            it('should add phrase script right before the first script element', () => {
                expect(phraseScript?.nextElementSibling).toBe(script);
            });
        });
    });

    describe('when phraseEnabled = false', () => {
        beforeEach(() => {
            phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
                projectId,
                phraseEnabled: false,
            });
            phraseScript = document.querySelector('script');
        });

        it('should not add script tag to the document', () => {
            expect(phraseScript).toBeNull();
        });
        it('should set window.PHRASEAPP_ENABLED', () => {
            expect(window.PHRASEAPP_ENABLED).toBeFalsy();
        });
    });
});

describe('::interpolateKey', () => {
    it('should add prefix & suffix correctly', () => {
        expect(PhraseInContextEditorPostProcessor.interpolateKey('some.key', 'prefix-', '-suffix')).toBe('prefix-phrase_some.key-suffix');
    });
});

describe('process', () => {
    describe('when phraseEnabled = true', () => {
        beforeEach(() => {
            phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
                projectId,
                phraseEnabled: true,
                prefix: 'prefix-',
                suffix: '-suffix'
            });
        });
    
        it('should return the interpolated key', () => {
            expect(phraseInContextEditorPostProcessor.process('value', ['some.key'], null, null)).toBe('prefix-phrase_some.key-suffix');
        });
    });

    describe('when phraseEnabled = false', () => {
        beforeEach(() => {
            phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
                projectId,
                phraseEnabled: false
            });
        });
    
        it('should return translated value', () => {
            expect(phraseInContextEditorPostProcessor.process('value', ['some.key'], null, null)).toBe('value');
        });
    });
});

describe('interpolateKey', () => {
    beforeEach(() => {
        phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
            projectId,
            phraseEnabled: true,
            prefix: 'prefix-',
            suffix: '-suffix'
        });
    });

    it('should add prefix & suffix correctly', () => {
        expect(phraseInContextEditorPostProcessor.interpolateKey('some.key')).toBe('prefix-phrase_some.key-suffix');
    });
});

describe('phraseEnabled setter', () => {
    describe('when phrase was enabled initially & trying to disable & enable it again', () => {
        beforeEach(() => {
            phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
                projectId,
                phraseEnabled: true,
            });
            phraseInContextEditorPostProcessor.phraseEnabled = false;
        });

        describe('when enabling phrase once again', () => {
            beforeEach(() => {
                phraseInContextEditorPostProcessor.phraseEnabled = true;
            });

            it('should not load phrase script anymore', () => {
                expect(document.querySelectorAll('script').length).toBe(1);
            });
        });
    });
});

describe('phraseEnabled getter', () => {
    beforeEach(() => {
        phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
            projectId,
            phraseEnabled: true,
        });
    });

    it('should return phraseEnabled correctly', () => {
        expect(phraseInContextEditorPostProcessor.phraseEnabled).toBeTruthy();
        phraseInContextEditorPostProcessor.phraseEnabled = false;
        expect(phraseInContextEditorPostProcessor.phraseEnabled).toBeFalsy();
    });
});

describe('config getter', () => {
    beforeEach(() => {
        phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
            projectId,
            phraseEnabled: true,
        });
    });

    it('should return PHRASEAPP_CONFIG GLOBAL', () => {
        expect(phraseInContextEditorPostProcessor.config).toBe(global.PHRASEAPP_CONFIG);
    });
});
