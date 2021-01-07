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

describe('::loadInContextEditorScript', () => {
    it('should add script element at the end of the body', () => {
        PhraseInContextEditorPostProcessor.loadInContextEditorScript();
        expect(document.body.children[document.body.children.length-1].tagName).toBe('SCRIPT');
    });

    describe('when there is already script element in DOM', () => {
        beforeEach(() => {
            document.head.append(document.createElement('script'));
        });

        it('should add script element before first script tag', () => {
            PhraseInContextEditorPostProcessor.loadInContextEditorScript();
            const loadedScript = document.querySelector('script');
            expect(loadedScript?.src.split('?')[0]).toBe(PhraseInContextEditorPostProcessor.IN_CONTEXT_EDITOR_SCRIPT_URL.split('?')[0]);
            expect(document.querySelectorAll('script').length).toBe(2);
        });
    });

    describe('when window is undefined for SSR', () => {
        const { window } = global;

        beforeAll(() => {
            delete (<any>global).window;
        });

        it('runs without errors', () => {
            expect(PhraseInContextEditorPostProcessor.loadInContextEditorScript).not.toThrow();
        });

        afterAll(() => {
            global.window = window;
        });
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
    let PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy: jest.SpyInstance;

    beforeEach(() => {
        PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy = jest.spyOn(PhraseInContextEditorPostProcessor, 'loadInContextEditorScript').mockReturnValue(document.createElement('script'));
    });
    afterEach(() => {
        PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy.mockRestore();
    });

    describe('when phrase was enabled initially', () => {
        beforeEach(() => {
            phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor({
                projectId,
                phraseEnabled: true,
            });
        });

        it('should call ::loadInContextEditorScript', () => {
            expect(PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy).toBeCalledTimes(1);
        });

        describe('trying to disable & enable it again', () => {
            beforeEach(() => {
                phraseInContextEditorPostProcessor.phraseEnabled = false;
            });

            describe('when enabling phrase once again', () => {
                beforeEach(() => {
                    phraseInContextEditorPostProcessor.phraseEnabled = true;
                });

                it('should not load phrase script anymore', () => {
                    expect(PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy).toBeCalledTimes(1);
                });
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

describe('toScriptHTML', () => {
    it('should a valid script HTML with editor url in place', () => {
        document.body.innerHTML = new PhraseInContextEditorPostProcessor({
            projectId,
            phraseEnabled: true,
        }).toScriptHTML();

        const scripts = document.querySelectorAll('script');
        expect(scripts.length).toBe(2);
        expect(scripts[1].src.split('?')[0]).toBe(PhraseInContextEditorPostProcessor.IN_CONTEXT_EDITOR_SCRIPT_URL.split('?')[0]);
    });
});
