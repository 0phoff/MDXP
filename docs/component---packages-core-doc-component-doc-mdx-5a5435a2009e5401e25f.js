(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{mNGJ:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return b})),n.d(t,"default",(function(){return m}));n("5hJT"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("PJhk"),n("mXGw");var o=n("/FXl"),r=n("TjRS"),a=n("ZFoC"),i=n("CFjq"),l=n("Bwcg"),c=n("e7Do");n("aD51");function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var b={};void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"packages/core/doc/component.doc.mdx"}});var p={_frontmatter:b},d=r.a;function m(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(o.b)(d,s({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"deck"},"Deck"),Object(o.b)("p",null,"This is the main component, which creates the slide deck on your page."),Object(o.b)("h3",{id:"properties"},"Properties"),Object(o.b)(a.c,{of:i.a,mdxType:"Props"}),Object(o.b)("h3",{id:"examples"},"Examples"),Object(o.b)("pre",null,Object(o.b)("code",s({parentName:"pre"},{className:"language-jsx"}),"import Presentation from 'my-presentation.mdx'\n\nReactDOM.render(\n  <Deck>\n    <Presentation />\n  </Deck>,\n  document.getElementById('root')\n);\n")),Object(o.b)("hr",null),Object(o.b)("h2",{id:"step"},"Step"),Object(o.b)("p",null,"This component can be used inside your slides, to step through certain items.\nIt generates a step for each of its direct children and can style them depending on their respective order and the current ",Object(o.b)("inlineCode",{parentName:"p"},"stepIndex"),".\nThe most common use case is to make items appear or disappear in order."),Object(o.b)("p",null,"If this component only has one child, it will implement the stepping behaviour on it's children.\nIf the child component happens to be a table, it will step through its rows or columns,\ndepending on the ",Object(o.b)("inlineCode",{parentName:"p"},"useColumns")," property."),Object(o.b)("h3",{id:"properties-1"},"Properties"),Object(o.b)(a.c,{of:l.b,mdxType:"Props"}),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("strong",{parentName:"p"},"NOTE"),Object(o.b)("br",{parentName:"p"}),"\n","The styles are applied to the children according to the following rules:  "),Object(o.b)("ol",{parentName:"blockquote"},Object(o.b)("li",{parentName:"ol"},"All children elements get ",Object(o.b)("inlineCode",{parentName:"li"},"base")," styles."),Object(o.b)("li",{parentName:"ol"},"Children whose index is greater than the stepIndex (aka they have not been stepped through), get styled with ",Object(o.b)("inlineCode",{parentName:"li"},"before"),"."),Object(o.b)("li",{parentName:"ol"},"Children whose index is equal to the stepIndex, get styled with ",Object(o.b)("inlineCode",{parentName:"li"},"current")," if it exists."),Object(o.b)("li",{parentName:"ol"},"Children whose index is smaller or equal to the stepIndex (aka they have been stepped through), get styled with ",Object(o.b)("inlineCode",{parentName:"li"},"after"),".")),Object(o.b)("p",{parentName:"blockquote"},"When different styles get applied to a child element, they get combined using spread operators, in the following order:"),Object(o.b)("ol",{parentName:"blockquote"},Object(o.b)("li",{parentName:"ol"},Object(o.b)("inlineCode",{parentName:"li"},"styles.base")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("inlineCode",{parentName:"li"},"styles.before")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("inlineCode",{parentName:"li"},"styles.after")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("inlineCode",{parentName:"li"},"styles.current")))),Object(o.b)("h3",{id:"examples-1"},"Examples"),Object(o.b)("pre",null,Object(o.b)("code",s({parentName:"pre"},{className:"language-md"}),"---\n\n# My awesome slide\n\n\x3c!-- This will uncover the items from the list one after the other with a nice opacity transition,\n     and will highlight the current item in red. --\x3e\n<Step styles={{\n  base:     {transition: 'opacity 0.5s ease-in-out'},\n  before:   {opacity: 0},\n  after:    {opacity: 1},\n  current:  {color: 'red'},\n}}>\n\n- Item 1\n- Item 2\n- Item 3\n- Item 4\n- Item 5\n\n</Step>\n\n---\n")),Object(o.b)("hr",null),Object(o.b)("h2",{id:"defaultlayout"},"DefaultLayout"),Object(o.b)("p",null,"This is the default DefaultLayout that is used for your presentation,\nif you do not give one to the ",Object(o.b)("a",s({parentName:"p"},{href:"#step"}),"Step")," component."),Object(o.b)("p",null,"It creates a div to contain all your elements, with the following default style:"),Object(o.b)("pre",null,Object(o.b)("code",s({parentName:"pre"},{className:"language-css"}),".DefaultLayout {\n  width: '100%';\n  height: '100%';\n  boxSizing: 'border-box';\n  position: 'relative';\n  overflow: 'hidden';\n  display: 'flex';\n  flexDirection: 'column';\n  alignItems: 'center';\n  justifyContent: 'center';\n  color: {theme.colors.text};\n  backgroundColor: {theme.colors.background};\n}\n\n.DefaultLayout p {\n  textAlign: 'center';\n}\n")),Object(o.b)("h3",{id:"properties-2"},"Properties"),Object(o.b)(a.c,{of:c.a,mdxType:"Props"}))}void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"packages/core/doc/component.doc.mdx"}}),m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---packages-core-doc-component-doc-mdx-5a5435a2009e5401e25f.js.map