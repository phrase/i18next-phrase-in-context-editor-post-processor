export type PhraseConfig = {
    phraseEnabled: boolean;
    scriptAutoLoad: boolean;
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
    prefix: string;
    suffix: string;
    autoLowercase: boolean;
    forceLocale: boolean;
    loginDialogMessage: string;
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
    fullReparse: boolean;
};
