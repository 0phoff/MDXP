export default {
  src: 'packages',
  dest: '/docs',
  base: '/MDXP',
  title: 'MDXP',
  description: 'Web Slides Made Easy',
  files: '**/*.doc.mdx',
  menu: [
    'Introduction',
    'Getting Started',
    'Examples',
    '@mdxp/core',
    {name: '@mdxp/components', menu: ['Components', 'Layouts', 'Groups', 'Wrappers']},
    '@mdxp/rehypex-plugins'
  ],
  themeConfig: {
    showDarkModeSwitch: false,
    showMarkdownEditButton: false
  }
};
