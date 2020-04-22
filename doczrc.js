export default {
  src: 'packages',
  dest: '/docs',
  base: '/MDXPresenter',
  title: 'MDXP',
  description: 'Web Slides Made Easy',
  files: '**/*.doc.mdx',
  menu: [
    'Introduction',
    'Getting Started'
  ],
  themeConfig: {
    showDarkModeSwitch: false,
    showMarkdownEditButton: false
  }
};
