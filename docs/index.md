# Introduction

**i18next Phrase In-Context Editor Post Processor** is a package which allows to integrate the [Phrase Strings In-Context Editor](https://phrase.com/blog/posts/use-phrase-in-context-editor) with any Javascript application. The one and only prerequisite is to use the brilliant [i18next](https://www.i18next.com/) library to handle the localization of the app.

## Why

The [Phrase Strings In-Context Editor](https://support.phrase.com/hc/en-us/articles/5784095916188-In-Context-Editor-Strings) adds the functionality of live translation editing while browsing through the production-ready application. It allows translators to edit the content directly within your application without the need to use a separated management platform UI - from now on, translators will always see exactly where content comes from.

## How does it work

This package is a [post processor](https://www.i18next.com/misc/creating-own-plugins#post-processor) for [i18next](https://www.i18next.com/). The main job of **i18next Phrase In-Context Editor Post Processor** is to convert every translation key into a format that is understandable by the [**Phrase Strings In-Context Editor**](https://help.phrase.com/help/configure-in-context-editor). This allows us to gather an synchronize texts between [Phrase.com](https://phrase.com/) and your app.

So, to get the [Phrase Strings In-Context Editor](https://support.phrase.com/hc/en-us/articles/5784095916188-In-Context-Editor-Strings) integrated with your application, you just need to install and properly include it. Let's have a look how to do that in the next section!
