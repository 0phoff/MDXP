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
    'core',
    'rehypex-plugins'
  ],
  themeConfig: {
    showDarkModeSwitch: false,
    showMarkdownEditButton: false
  }
};
