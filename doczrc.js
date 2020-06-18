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
    'Syntax',
    'Components',
    'Theming',
    'Present',
    'Examples',
    '@mdxp/core',
    {name: '@mdxp/components', menu: ['Components', 'Extract', 'Layouts', 'Wrappers']},
    '@mdxp/rehypex-plugins'
  ],
  themeConfig: {
    showDarkModeSwitch: false,
    showMarkdownEditButton: false,
    styles: {
      ol: {
        listStyleImage: 'none',
        listStylePosition: 'outside',
        padding: 0,
        margin: 0,
        marginBottom: 3,
        marginLeft: 5,
        '@media screen and (max-width: 920px)': {
          marginLeft: 4,
        }
      },
      ul: {
        listStyleImage: 'none',
        listStylePosition: 'outside',
        padding: 0,
        margin: 0,
        marginBottom: 3,
        marginLeft: 5,
        '@media screen and (max-width: 920px)': {
          marginLeft: 4,
        }
      }
    }
  }
};
