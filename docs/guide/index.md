# Getting started

## Compatibility

::: warning
**i18next Phrase In-Context Editor Post Processor** supports all **i18next** versions newer than [`19.5.1`](https://github.com/i18next/i18next/releases/tag/v19.5.1). Although this library might work with previous versions as well, they're not officialy supported and might not get any specific updates or bug fixes.
:::

## Installation

You can install the package with the use of your favorite package manager:

```bash
# yarn
yarn add i18next-phrase-in-context-editor-post-processor

# npm
npm install i18next-phrase-in-context-editor-post-processor
```

or load it via CDN:

```html
<script src="https://unpkg.com/i18next-phrase-in-context-editor-post-processor"></script>
```

## Usage

Let's say this is how you bootstrap [**i18next**](https://www.i18next.com/) in your application:

```typescript
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';

i18next
    .use(i18nextXHRBackend)
    .init({
        fallbackLng: 'en',
        debug: true,
        ns: ['special', 'common'],
        defaultNS: 'special',
        backend: {
            // load some translations from i18next-gitbook repo
            loadPath: 'https://raw.githubusercontent.com/i18next/i18next-gitbook/master/locales/{{lng}}/{{ns}}.json',
            crossDomain: true
        }
    }, function(err, t) {
        // do something on i18next initialization
    });
```

In this case, to integrate our library you only need to follow four simple steps:

- Import a **i18next Phrase In-Context Editor Post Processor** library.
- Create new **i18next Phrase In-Context Editor Post Processor** instance, passing [<Badge text="PhraseConfig" vertical="middle" />](../api#phraseconfig) as the argument.
- Pass newly created **i18next Phrase In-Context Editor Post Processor** instance to **i18next** [`use method`](https://www.i18next.com/overview/api#use).
- Add the `"phraseInContextEditor"` <Badge text="string" vertical="middle" /> to [`postProcess`](https://www.i18next.com/overview/configuration-options#translation-defaults) array property (passed within the configuration object of **i18next** [`init method`](https://www.i18next.com/overview/api#init)).

Sounds easy enough, right? Let's have a look at an updated example:

```typescript{3,7-10,21}
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import PhraseInContextEditorPostProcessor from 'i18next-phrase-in-context-editor-post-processor';

i18next
    .use(i18nextXHRBackend)
    .use(new PhraseInContextEditorPostProcessor({
        phraseEnabled: true,
        projectId: '<YOUR_PHRASE_PROJECT_ID>'
    }))
    .init({
        fallbackLng: 'en',
        debug: true,
        ns: ['special', 'common'],
        defaultNS: 'special',
        backend: {
            // load some translations from i18next-gitbook repo
            loadPath: 'https://raw.githubusercontent.com/i18next/i18next-gitbook/master/locales/{{lng}}/{{ns}}.json',
            crossDomain: true
        },
        postProcess: ['phraseInContextEditor']
    }, function(err, t) {
        // do something on i18next initialization
    });
```

From now on, the **In-Context Editor** is fully integrated into your JS app. Congratulations! :tada:

To use the old version of ICE, use option `useOldICE: true` in your PHRASEAPP_CONFIG or integration options
```
new VueI18nPhraseInContextEditor(i18n as unknown as Vue['$i18n'], {
    phraseEnabled: true,
    projectId: '<YOUR_PROJECT_ID>',
    useOldICE: true,
});
```

For further information about the possible configuration options and useful methods, please have a look at our [API docs](../../api).

## Using the US Datacenter with ICE

In addition to `phraseEnabled` and `projectId` in the config, also add the US specific URLs to enable working through the US endpoint.
```
  baseUrl: "https://us.app.phrase.com",
  apiBaseUrl: 'https://api.us.app.phrase.com/api/v2',
  oauthEndpointUrl: "https://api.us.app.phrase.com/api/v2/authorizations",
  profileUrl: "https://us.app.phrase.com/settings/profile",
```
