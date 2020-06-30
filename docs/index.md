# Introduction

**i18next I18n Phrase In-Context Editor Post Processor** is a package which allows to integrate the [Phrase In-Context Editor](https://phrase.com/blog/posts/use-phrase-in-context-editor) with any Javascript application. The one and only prerequisite is to use the brilliant [i18next](https://www.i18next.com/) library to handle for the localisation of the app.

## Why

[Phrase In-Context Editor](https://help.phrase.com/help/translate-directly-on-your-website) adds the functionality of the live translation editing while browsing through the production-ready application. It allows translators to edit the content directly within your application without need of using separated managment platfom UI - from now on, they will always see the content right where it comes from.

## How does it work

This package is a [post processor](https://www.i18next.com/misc/creating-own-plugins#post-processor) for [i18next](https://www.i18next.com/). The main job of **i18next I18n Phrase In-Context Editor Post Processor** is to convert every translation key into the format understandable by the [**Phrase In-Context Editor**](https://help.phrase.com/help/configure-in-context-editor). This allows us to gather an synchronize texts between [Phrase.com](https://phrase.com/) and your app.

So, to get the [Phrase In-Context Editor](https://help.phrase.com/help/translate-directly-on-your-website) integrated withr you application, you just need to install it and properly include - let's have a look how to do that in the next chapter!
