(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{lQmn:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return u}));var o=n("Fcif"),a=n("+I+c"),r=(n("mXGw"),n("/FXl")),p=n("TjRS"),s=n("3Lmf"),i=(n("aD51"),{});void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"packages/rehypex/doc/auto-import.doc.mdx"}});var l={_frontmatter:i},m=p.a;function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)(m,Object(o.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"auto-import"},"Auto Import"),Object(r.b)("p",null,"Auto Import is a Rehype plugin for MDXHAST that modifies JSX nodes to automatically import files that are passed as properties.\nIt only works for JSX nodes and thus will not work with other nodes like regular HAST element nodes."),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"NOTE"),Object(r.b)("br",{parentName:"p"}),"\n","In order to automatically import from image nodes as well, you can use the ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"./rehypex-bettermedia"}),"Better Media")," plugin, which transforms image elements to JSX nodes, before using this plugin.")),Object(r.b)("h3",{id:"arguments"},"Arguments"),Object(r.b)(s.a,{mdxType:"Arguments"},{name:"test",type:"(value, dir) => bool",default:"(value, dir) => fs.existsSync(path.resolve(dir, value))",desc:"Function that tells whether the value is a file that should be imported"},{name:"noImport",type:"string",default:"null (not being used)",desc:"If a property starts with this value, that part of the value is simply stripped and it is not imported. This is useful to provide a way to pass a file path as raw value to a component."}),Object(r.b)("h3",{id:"usage"},"Usage"),Object(r.b)("p",null,"To use this plugin, put it in the ",Object(r.b)("inlineCode",{parentName:"p"},"rehypePlugins")," option of your MDX-JS loader.",Object(r.b)("br",{parentName:"p"}),"\n","In this example we also pass the string ",Object(r.b)("em",{parentName:"p"},"'!noimport!'")," as ",Object(r.b)("inlineCode",{parentName:"p"},"noImport")," option."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// Webpack example\nconst rehypeAutoImport = require('@mdxp/rehypex-plugins/auto-import');\n\nmodule.exports = {\n  module: {\n    rules: [\n      {\n        test: /\\.mdx$/,\n        use: [\n          'babel-loader',\n          {\n            loader: '@mdx-js/loader',\n            options: {\n              rehypePlugins: [\n                [rehypeAutoImport, {noImport: '!noimport!'}]\n              ]\n            }\n          }\n        ]\n      },\n      ...\n    ]\n  }\n}\n")),Object(r.b)("h3",{id:"examples"},"Examples"),Object(r.b)("p",null,"Once the plugin is setup, you can write the following code:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'<MyComponent file="./path/to/some/data.json" />\n\n// Gets transformed by the plugin to:\nimport AI__path_to_some_data_json from "./path/to/some/data.json"\n<MyComponent file={AI__path_to_some_data_json} />\n')),Object(r.b)("p",null,"If you do not want to import a certain path and you setup a ",Object(r.b)("inlineCode",{parentName:"p"},"noImport")," string as shown above, you can use:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),'<MyComponent file="!noimport!./path/to/some/data.json" />\n\n// Gets transformed by the plugin to:\n<MyComponent file="./path/to/some/data.json" />\n')))}void 0!==u&&u&&u===Object(u)&&Object.isExtensible(u)&&!u.hasOwnProperty("__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"packages/rehypex/doc/auto-import.doc.mdx"}}),u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---packages-rehypex-doc-auto-import-doc-mdx-a2b6278efddc86f9a1e8.js.map