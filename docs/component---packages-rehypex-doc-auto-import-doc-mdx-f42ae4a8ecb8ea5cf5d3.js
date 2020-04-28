(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{lQmn:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return p})),n.d(t,"default",(function(){return u}));n("5hJT"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("PJhk"),n("mXGw");var o=n("/FXl"),r=n("TjRS"),a=n("gFrE");n("aD51");function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var p={};void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"packages/rehypex/doc/auto-import.doc.mdx"}});var l={_frontmatter:p},s=r.a;function u(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(o.b)(s,i({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"auto-import"},"Auto Import"),Object(o.b)("p",null,"Auto Import is a Rehype plugin for MDXHAST that modifies JSX nodes to automatically import files that are passed as properties.\nIt only works for JSX nodes and thus will not work with other nodes like regular HAST element nodes."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("strong",{parentName:"p"},"NOTE"),Object(o.b)("br",{parentName:"p"}),"\n","In order to automatically import from image nodes as well, you can use the ",Object(o.b)("a",i({parentName:"p"},{href:"./rehypex-bettermedia"}),"Better Media")," plugin, which transforms image elements to JSX nodes as well.")),Object(o.b)(a.a,{values:[["test","(value, dir) => bool","Function that tells whether the value is a file that should be imported"],["noImport","string","If a property starts with this value, that part of the value is simply stripped and it is not imported. This is useful to provide a way to pass a file as raw value to a component."]],mdxType:"Arg"}),Object(o.b)("h2",{id:"usage"},"Usage"),Object(o.b)("p",null,"To use this plugin, put it in the ",Object(o.b)("inlineCode",{parentName:"p"},"rehypePlugins")," option of your MDX-JS loader."),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-js"}),"// Webpack example\nconst rehypeAutoImport = require('@mdxp/rehypex-plugins/auto-import');\n\nmodule.exports = {\n  module: {\n    rules: [\n      {\n        test: /\\.mdx$/,\n        use: [\n          'babel-loader',\n          {\n            loader: '@mdx-js/loader',\n            options: {\n              rehypePlugins: [\n                rehypeAutoImport\n              ]\n            }\n          }\n        ]\n      },\n      ...\n    ]\n  }\n}\n")))}void 0!==u&&u&&u===Object(u)&&Object.isExtensible(u)&&!u.hasOwnProperty("__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"packages/rehypex/doc/auto-import.doc.mdx"}}),u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---packages-rehypex-doc-auto-import-doc-mdx-f42ae4a8ecb8ea5cf5d3.js.map