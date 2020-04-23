(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"+B26":function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return r})),t.d(n,"default",(function(){return h}));t("5hJT"),t("W1QL"),t("K/PF"),t("t91x"),t("75LO"),t("PJhk"),t("mXGw");var o=t("/FXl"),a=t("TjRS"),c=t("gFrE");t("aD51");function i(){return(i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}).apply(this,arguments)}var r={};void 0!==r&&r&&r===Object(r)&&Object.isExtensible(r)&&!r.hasOwnProperty("__filemeta")&&Object.defineProperty(r,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"packages/core/doc/util.doc.mdx"}});var s={_frontmatter:r},b=a.a;function h(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,o,a={},c=Object.keys(e);for(o=0;o<c.length;o++)t=c[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,["components"]);return Object(o.b)(b,i({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"deckmodes"},"deckModes"),Object(o.b)("p",null,"Enum object which contains the different modes for the deck to be in.\nIt can be used for with the ",Object(o.b)("inlineCode",{parentName:"p"},"setMode()")," function from the ",Object(o.b)("a",i({parentName:"p"},{href:"/MDXP/core-hooks#usenavigation"}),"useNavigation")," hook."),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-js"}),"const deckModes = {\n  NORMAL:     0,\n  PRESENTER:  1,\n  OVERVIEW:   2,\n  GRID:       3,\n  PRINT:      4,\n}\n")),Object(o.b)("hr",null),Object(o.b)("h2",{id:"basetheme"},"baseTheme"),Object(o.b)("p",null,"Base theme object that is always being merged into the given theme, to provide sane defaults for some things.\nYou can overwrite any of its properties by providing your own values in your theme."),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-js"}),"export const baseTheme = {\n  colors: {\n    text: '#000',\n    background: '#FFF',\n  },\n  fonts: {\n    body: 'system-ui, sans-serif',\n    monospace: 'Menlo, monospace',\n  },\n  fontWeights: {\n    body: 400,\n  },\n  lineHeights: {\n    body: 1.5,\n  },\n  styles: {\n    root: {\n      fontFamily: 'system-ui, sans-serif',\n    },\n    img: {\n      width: '100vw',\n      maxWidth: '100%',\n      height: '100vh',\n      objectFit: 'contain',\n    },\n    code: {\n      fontFamily: 'monospace',\n    },\n    pre: {\n      fontFamily: 'monospace',\n    },\n    Slide: {\n      fontFamily: 'body',\n      fontSize: '1.5rem',\n    },\n  }\n};\n")),Object(o.b)("hr",null),Object(o.b)("h2",{id:"defaulttheme"},"defaultTheme"),Object(o.b)("p",null,"This is the default theme that is used for your presentation,\nif you do not give one to the ",Object(o.b)("a",i({parentName:"p"},{href:"/MDXP/core-components#deck"}),"Deck")," component."),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-js"}),"const defaultTheme = {\n  colors: {\n    text: '#000',\n    background: '#FFF',\n    primary: '#CCC',\n    secondary: '#555',\n    accent: '#F9AC00',\n    muted: '#888',\n  },\n  fonts: {\n    heading: 'inherit',\n  },\n  fontWeights: {\n    heading: 700,\n  },\n  lineHeights: {\n    heading: 1.125,\n  },\n  text: {\n    heading: {\n      fontFamily: 'heading',\n      fontWeight: 'heading',\n      lineHeight: 'heading',\n    },\n  },\n  styles: {\n    h1: {\n      variant: 'text.heading',\n      textTransform: 'uppercase',\n    },\n    h2: {\n      variant: 'text.heading',\n    },\n    h3: {\n      variant: 'text.heading',\n    },\n    h4: {\n      variant: 'text.heading',\n    },\n    h5: {\n      variant: 'text.heading',\n    },\n    h6: {\n      variant: 'text.heading',\n    },\n  }\n};\n")),Object(o.b)("hr",null),Object(o.b)("h2",{id:"mergethemes"},"mergeThemes"),Object(o.b)("p",null,"This function can be used to merge different theme objects together, overwriting with the latest theme given."),Object(o.b)(c.a,{values:[["...themes","Object","The theme objects you want to merge together."]],mdxType:"Arg"}),Object(o.b)(c.b,{values:[["combinedTheme","Object","New Theme-UI theme object, which is the result of merging all passed themes together."]],mdxType:"Return"}),Object(o.b)("hr",null),Object(o.b)("h2",{id:"mdxptypes"},"MDXPTypes"),Object(o.b)("p",null,"Some components hold a special meaning for the MDXP code and will be handled specially.",Object(o.b)("br",{parentName:"p"}),"\n","This is the enum object which contains the different types of special MDXP components."),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-js"}),"const MDXPTypes = {\n  NONE: 0,\n  LAYOUT: 1,\n};\n")),Object(o.b)("hr",null),Object(o.b)("h2",{id:"getmdxptype"},"getMDXPType"),Object(o.b)("p",null,"This function can be used to retrieve the MDXP type of a component."),Object(o.b)(c.a,{values:[["component","componentType","Component of which you would like to know the MDXP type of."]],mdxType:"Arg"}),Object(o.b)(c.b,{values:[["type",["MDXPTypes","#mdxptypes"],"Type of the component (default: NONE)."]],mdxType:"Return"}),Object(o.b)("hr",null),Object(o.b)("h2",{id:"setmdxplayouttype"},"setMDXPLayoutType"),Object(o.b)("p",null,"This is a higher-order component, which turns your component into a MDXP layout component."),Object(o.b)(c.a,{values:[["component","componentType","Component of which you would like to be a layout component."]],mdxType:"Arg"}),Object(o.b)(c.b,{values:[["component","componentType","MDXP Layout component of your component"]],mdxType:"Return"}),Object(o.b)("h3",{id:"examples"},"Examples"),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-jsx"}),"import {setMDXPLayoutType} from '@MDXP/core'\n\nconst TomatoLayout = ({children, ...props}) => (\n  <div\n    style={{\n      width: '100%',\n      height: '100%',\n      overflow: 'hidden',\n      backgroundColor: 'tomato',\n      color: 'white'\n    }}\n  >\n    {children}\n  </div>\n)\n\nexport default setMDXPLayoutType(TomatoLayout);\n")))}void 0!==h&&h&&h===Object(h)&&Object.isExtensible(h)&&!h.hasOwnProperty("__filemeta")&&Object.defineProperty(h,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"packages/core/doc/util.doc.mdx"}}),h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---packages-core-doc-util-doc-mdx-342600eb2169f8779fdd.js.map