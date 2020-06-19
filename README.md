<div align="center">

<img alt="Logo" src="public/logo.svg" width="100%"/>

[![NPM](https://img.shields.io/npm/v/@mdxp/core)](https://www.npmjs.com/package/@mdxp/core)
![Downloads](https://img.shields.io/npm/dt/@mdxp/core)
[![Size](https://img.shields.io/bundlephobia/minzip/@mdxp/core)](https://bundlephobia.com/result?p=@mdxp/core)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/0phoff/MDXP/blob/master/LICENSE.md)
<a href="https://ko-fi.com/D1D31LPHE"><img alt="Ko-Fi" src="https://www.ko-fi.com/img/githubbutton_sm.svg" height="20"></a>

_Web Slides Made Easy_

</div>

MDX Presenter allows you to create slides easily with React and MDX.  
With this tool, you can:

- _Write_ your presentations in Markdown.
- _Use_ React components, or even build your own.
- _Create_ a consistent look and feel with Theme-UI.
- _Present_ on any computer with a (modern) browser, by using the onepage build mode.
- _Integrate_ it in any of your favourite web bundlers, static site generators, ...

[Click here](https://0phoff.github.io/MDXP/examples/demo) to view a demo built with MDXP or  
[Click here](https://0phoff.github.io/MDXP) to take a look at the documentation.


### Gettting started
```bash
# Initialize presentation project
npm init @mdxp/webpack -g my_presentation
cd my_presentation

# Start dev server
npm run start

# Edit presentation with your favourite editor
vim src/presentation.mdx

# Build presentation
npm run build
```


### How is this different from MDX-Deck
I started using [MDX-Deck](https://github.com/jxnblk/mdx-deck) and immediately loved the concept of writing your presentations with MDX.  
However, I found one big flaw with it and that is that it builds your presentation as a gatsby website.

I have two reasons for disliking this:

1. When presenting at conferences, you are sometimes obliged to present on a given computer and thus it is not feasible to present with a local server on your computer. While you could host your presentation somewhere and just browse to it, that has the downside that you are at the mercy of internet speeds at the conference, which might be a serious issue if you have lots of images and/or videos. The best solution would be to have a single file, like a `.ppt`, that you can just open on any computer. MDXP allows to build your presentation in `onepage` mode, which means you end up with one `index.html` file (+ any videos or huge images), which you can open in any (modern) browser, without the need for a server.
2. The fact that it uses Gatsby adds a whole layer of complexity. Gatsby is not a small tool and learning to use it takes some time. This also means that the threshold for someone being able to contribute to the project becomes much higher. The core of MDXP is just a react library and thus it is easier to learn and contribute to this repository. If need be, you can still integrate MDXP into a Gatsby project, thus having the best of both worlds.

I would like to expres my gratitude towards the MDX-Deck project and the team behind it!  
I took a lot of inspiration and even some code from it, and would not have been able to build MDXP without it.


### Contributing
This project is setup as a monorepo with lerna and yarn workspaces.  
After installing [yarn](https://yarnpkg.com/), you can clone this repository and run the following commands to set everything up and start developing:
```bash
yarn install
lerna bootstrap
```
