module.exports = {
    title: 'i18next Phrase In-Context Editor Post Processor',
    description: 'Plugin for i18next that paires well with Phrase In-Context Editor.',
    base: '/i18next-phrase-in-context-editor-post-processor/',
    themeConfig: {
        nav: [
            { text: 'Contact Us', link: 'https://phrase.com/contact' }
        ],
        sidebar: {
            '/guide/': [
                '../',
                '',
                '../api/',
                '../examples/'
            ],
            '/api/': [
                '../',
                '../guide/',
                '',
                '../examples/'
            ],
            '/examples/': [
                '../',
                '../guide/',
                '../api/',
                '',
            ],
            '/': [
                '',
                'guide/',
                'api/',
                'examples/'
            ],
        },
        searchPlaceholder: 'Search in docs...',
        repo: 'phrase/i18next-phrase-in-context-editor-post-processor',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Help us improve this page on GitHub',
        smoothScroll: true,
        displayAllHeaders: true,
        image: '/phrase-logo.jpg',
        domain: 'https://phrase.github.io/i18next-phrase-in-context-editor-post-processor'
    },
    plugins: [
        '@vuepress/last-updated',
        [
            'vuepress-plugin-clean-urls',
            {
                normalSuffix: '/',
                indexSuffix: '/',
                notFoundPath: '/404.html',
            },
        ],
        [
            'seo',
            {
                title: ($page, $site) => $page.path === '/' ? $site.title : $page.title,
                description: ($page, $site) => $page.frontmatter.description || $site.description,
                type: $page => $page.path === '/' ? 'website' : 'article',
                image: ($page, $site) => {
                    const image = $page.frontmatter.image || $site.themeConfig.image;
                    return image && ((!image.startsWith('http') && $site.themeConfig.domain || '') + image)
                }
            },
        ]
    ],
}
