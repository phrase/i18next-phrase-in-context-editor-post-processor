/* eslint-disable @typescript-eslint/no-non-null-assertion */
import PhraseInContextEditorPostProcessor, { PhraseInContextEditorOptions } from "../src/phrase";

let phraseInContextEditorPostProcessor: PhraseInContextEditorPostProcessor | undefined;
let phraseScript: HTMLScriptElement | null;

const ICEOptions = {
    phraseEnabled: true,
} as PhraseInContextEditorOptions;

const createPhraseInContextEditorPostProcessor = () => {
    phraseInContextEditorPostProcessor = new PhraseInContextEditorPostProcessor(ICEOptions);
};

beforeEach(() => {
    phraseScript = null;
    phraseInContextEditorPostProcessor = undefined;
    ICEOptions.phraseEnabled = true;
    ICEOptions.useOldICE = false;
});

afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
});

describe('constructor', () => {
    describe('when phraseEnabled = true', () => {
        describe('when using the new in context editor', () => {
            beforeEach(() => {
                ICEOptions.useOldICE = false;
                createPhraseInContextEditorPostProcessor();
                phraseScript = document.querySelector('script');
            });
            
            it('should add script tag to the document', () => {
                expect(phraseScript).not.toBeNull();
            });
            it('should add script tag with phrase url', () => {
                expect(phraseScript?.src).toBe('https://d2bgdldl6xit7z.cloudfront.net/latest/ice/index.js');
            });
            it('should set window.PHRASEAPP_ENABLED', () => {
                expect(window.PHRASEAPP_ENABLED).toBeTruthy();
            });
            describe('when script element already exists in the document', () => {
                let script: HTMLScriptElement;
                beforeEach(() => {
                    script = document.createElement('script');
                    document.head.append(script);
                    createPhraseInContextEditorPostProcessor();
                    phraseScript = document.querySelector('script');
                });

                it('should add phrase script right before the first script element', () => {
                    expect(phraseScript?.nextElementSibling).toBe(script);
                });
            });
        });

        describe('when using the old in context editor', () => {
            beforeEach(() => {
                ICEOptions.useOldICE = true;
                createPhraseInContextEditorPostProcessor();
                phraseScript = document.querySelector('script');
            });

            it('should add script tag to the document', () => {
                expect(phraseScript).not.toBeNull();
            });
            it('should add script tag with phrase url', () => {
                expect(phraseScript?.src.split('?')[0]).toBe('https://phrase.com/assets/in-context-editor/2.0/app.js'.split('?')[0]);
            });
            it('should set window.PHRASEAPP_ENABLED', () => {
                expect(window.PHRASEAPP_ENABLED).toBeTruthy();
            });
            describe('when script element already exists in the document', () => {
                let script: HTMLScriptElement;
                beforeEach(() => {
                    script = document.createElement('script');
                    document.head.append(script);
                    createPhraseInContextEditorPostProcessor();
                    phraseScript = document.querySelector('script');
                });

                it('should add phrase script right before the first script element', () => {
                    expect(phraseScript?.nextElementSibling).toBe(script);
                });
            });
        });
    });

    describe('when phraseEnabled = false', () => {
        beforeEach(() => {
            ICEOptions.phraseEnabled = false;
            createPhraseInContextEditorPostProcessor();
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
        createPhraseInContextEditorPostProcessor();
        expect(PhraseInContextEditorPostProcessor.interpolateKey('some.key', 'prefix-', '-suffix')).toBe('prefix-phrase_some.key-suffix');
    });
});

describe('::loadInContextEditorScript', () => {
    it('should add script element at the end of the body', () => {
        createPhraseInContextEditorPostProcessor();
        expect(document.body.children[document.body.children.length-1].tagName).toBe('SCRIPT');
    });

    describe('when there is already script element in DOM', () => {
        beforeEach(() => {
            document.head.append(document.createElement('script'));
            createPhraseInContextEditorPostProcessor();
        });

        it('should add script element before first script tag', () => {
            const loadedScript = document.querySelector('script');
            expect(loadedScript?.src.split('?')[0]).toBe(phraseInContextEditorPostProcessor!.IN_CONTEXT_EDITOR_SCRIPT_URL.split('?')[0]);
            expect(document.querySelectorAll('script').length).toBe(2);
        });
    });

    describe('when window is undefined for SSR', () => {
        const { window } = global;

        beforeAll(() => {
            delete (<any>global).window;
        });

        it('runs without errors', () => {
            createPhraseInContextEditorPostProcessor();
            expect(phraseInContextEditorPostProcessor!.loadInContextEditorScript).not.toThrow();
        });

        afterAll(() => {
            global.window = window;
        });
    });
});

describe('process', () => {
    describe('when phraseEnabled = true', () => {
        beforeEach(() => {
            ICEOptions.prefix = 'prefix-';
            ICEOptions.suffix = '-suffix';
            createPhraseInContextEditorPostProcessor();
        });
    
        it('should return the interpolated key', () => {
            expect(phraseInContextEditorPostProcessor!.process('value', ['some.key'], null, null)).toBe('prefix-phrase_some.key-suffix');
        });
    });

    describe('when phraseEnabled = false', () => {
        it('should return translated value', () => {
            ICEOptions.phraseEnabled = false;
            createPhraseInContextEditorPostProcessor();
            expect(phraseInContextEditorPostProcessor!.process('value', ['some.key'], null, null)).toBe('value');
        });
    });
});

describe('interpolateKey', () => {
    beforeEach(() => {
        ICEOptions.prefix = 'prefix-';
        ICEOptions.suffix = '-suffix';
        createPhraseInContextEditorPostProcessor();
    });

    it('should add prefix & suffix correctly', () => {
        expect(phraseInContextEditorPostProcessor!.interpolateKey('some.key')).toBe('prefix-phrase_some.key-suffix');
    });
});

describe('phraseEnabled setter', () => {
    let PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy: jest.SpyInstance;

    describe('when phrase was enabled initially', () => {
        beforeEach(() => {
            createPhraseInContextEditorPostProcessor();
            PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy = jest.spyOn(
                phraseInContextEditorPostProcessor!,
                'loadInContextEditorScript'
            ).mockReturnValue(document.createElement('script'));
        });

        it('should call loadInContextEditorScript if script is missing', () => {
            // First call already done in constructor, check if it will trigger again when toggling on and off
            phraseInContextEditorPostProcessor!.phraseEnabled = false;
            phraseInContextEditorPostProcessor!.phraseScript = undefined;
            phraseInContextEditorPostProcessor!.phraseEnabled = true;
            expect(PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy).toBeCalledTimes(1);
        });

        it('does not load script multiple times', () => {
            // First call already done in constructor, check if it will trigger again when toggling on and off
            phraseInContextEditorPostProcessor!.phraseEnabled = false;
            phraseInContextEditorPostProcessor!.phraseEnabled = true;
            expect(PhraseInContextEditorPostProcessorLoadInContextEditorScriptSpy).toBeCalledTimes(0);
        });
    });
});

describe('phraseEnabled getter', () => {
    it('should return phraseEnabled correctly', () => {
        createPhraseInContextEditorPostProcessor();
        expect(phraseInContextEditorPostProcessor!.phraseEnabled).toBeTruthy();
        phraseInContextEditorPostProcessor!.phraseEnabled = false;
        expect(phraseInContextEditorPostProcessor!.phraseEnabled).toBeFalsy();
    });
});

describe('config getter', () => {
    it('should return PHRASEAPP_CONFIG GLOBAL', () => {
        createPhraseInContextEditorPostProcessor();
        expect(phraseInContextEditorPostProcessor!.config).toBe(global.PHRASEAPP_CONFIG);
    });
});

describe('toScriptHTML', () => {
    describe('when using the new in context editor', () => {
        beforeEach(() => {
            ICEOptions.useOldICE = false;
            createPhraseInContextEditorPostProcessor();
            document.body.innerHTML = phraseInContextEditorPostProcessor!.toScriptHTML();
        });

        it('should a valid script HTML with editor url in place', () => {
            const scripts = document.querySelectorAll('script');
            expect(scripts.length).toBe(2);
            expect(scripts[1].src.split('?')[0]).toBe('https://d2bgdldl6xit7z.cloudfront.net/latest/ice/index.js'.split('?')[0]);
        });
    });

    describe('when using the old in context editor', () => {
        beforeEach(() => {
            ICEOptions.useOldICE = true;
            createPhraseInContextEditorPostProcessor();
            document.body.innerHTML = phraseInContextEditorPostProcessor!.toScriptHTML();
        });

        it('should a valid script HTML with editor url in place', () => {
            const scripts = document.querySelectorAll('script');
            expect(scripts.length).toBe(2);
            expect(scripts[1].src.split('?')[0]).toBe('https://phrase.com/assets/in-context-editor/2.0/app.js'.split('?')[0]);
        });
    });
});
