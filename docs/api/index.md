# API

## PhraseInContextEditorPostProcessor

The `PhraseInContextEditorPostProcessor` class is the main point of the **i18next Phrase In-Context Editor Post Processor** library and the only place where [**Phrase**](https://phrase.com)-specific logic happens. Implements [<Badge text="PostProcessor" vertical="middle" /> i18n type](https://www.i18next.com/misc/creating-own-plugins#post-processor).

### Constructor

_constructor_(
    **options**: [<Badge text="PhraseInContextEditorOptions" vertical="middle" />](#phraseincontexteditoroptions)
)

::: tip
**options** argument is assigned to the component using [`config setter`](#config-setter)
:::


<a id="config-setter"></a>

### Properties

- #### config: [<Badge text="PhraseConfig" vertical="middle" />](#phraseconfig)

- #### phraseEnabled: <Badge text="boolean" vertical="middle" /><span class="fw-normal"> - property controlling the status of the In-Context Editor. Propagates the change to `globalThis.PHRASEAPP_ENABLED`.</span>

### Methods

- _interpolateKey_(
    **key**: <Badge text="string" vertical="middle" />,
): <Badge text="string[]" vertical="middle" />

- _process_(
    **value**: <Badge text="string" vertical="middle" />,
    **keys**: <Badge text="string[]" vertical="middle" />,
    **options**: <Badge text="unknown" vertical="middle" />,
    **translator**: <Badge text="unknown" vertical="middle" />,
): <Badge text="string" vertical="middle" />

::: warning
If the **In-Context Editor** is not yet loaded, changing `phraseEnabled` to `true` will trigger loading of the minified js source of the **In-Context Editor**.
:::

:::tip
Whenever disabled, the **i18next Phrase In-Context Editor Post Processor** will stop interpolating keys - this will revert back to the regular [**i18next**](https://www.i18next.com/) behavior. For more information on how the formatters are being handled, please head to the [introduction](../guide/).
:::

## PhraseInContextEditorOptions

Partial type of the [<Badge text="PhraseConfig" vertical="middle" />](#phraseconfig) with only 2 properties required: `phraseEnabled` and `projectId`.

## PhraseConfig

Type describing all possible **Phrase In-Context Editor** config options.

```typescript
phraseEnabled: boolean;
baseUrl: string;
profileUrl: string;
apiBaseUrl: string;
oauthEndpointUrl: string;
helpUrl: string;
logoUrl: string;
stylesheetUrl: string;
version: string;
priorityLocales: string[];
projectId: string;
branch: string;
ajaxObserver: boolean;
debugMode: boolean;
prefix: string = '{{__';
suffix: string = '__}}';
autoLowercase: boolean;
forceLocale: boolean;
loginDialogMessage: string;
useOldICE: boolean;
autoLogin: {
    perform: boolean;
    email: string;
    password: string;
};
sso: {
    enabled: boolean;
    enforced: boolean;
    provider: string;
    identifier: string;
};
fullReparse: boolean = true;
```
