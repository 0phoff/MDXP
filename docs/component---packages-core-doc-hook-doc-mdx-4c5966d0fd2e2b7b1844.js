(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{l2am:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return l}));n("5hJT"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("PJhk"),n("mXGw");var o=n("/FXl"),r=n("TjRS"),s=n("gFrE");n("aD51");function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var i={};void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"packages/core/doc/hook.doc.mdx"}});var c={_frontmatter:i},d=r.a;function l(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(o.b)(d,a({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"usedeck"},"useDeck"),Object(o.b)("p",null,"This hook returns the deck context, which is an object with useful information about the state of the deck."),Object(o.b)(s.b,{nameCol:"Key",values:[["mode",["deckModes","/core-util#deckmodes"],"The mode that the slide deck is currently displayed as."],["slideLength","number > 0","Number of slides in the deck."],["slideIndex","number ∈ [0, slideLength[","Index of the current slide."],["stepLength","number > 0","Number of steps that the current slide contains."],["stepIndex","number ∈ [0, stepLength[","Index of the current step."],["rawStepIndex","string","Raw step value, as seen in the URL."],["preview","bool","Whether the slide should be rendered in a static preview mode (mainly used for printing to pdf)."]],mdxType:"Return"}),Object(o.b)("h3",{id:"examples"},"Examples"),Object(o.b)("pre",null,Object(o.b)("code",a({parentName:"pre"},{className:"language-jsx"}),"import {useDeck} from '@mdxp/core'\n\nconst Footer = (props) => {\n  const deck = useDeck();\n\n  return (\n    <span>\n      {deck.slideIndex} / {deck.slideLength}\n    </span>\n  );\n}\n")),Object(o.b)("hr",null),Object(o.b)("h2",{id:"usestep"},"useStep"),Object(o.b)("p",null,"This hook allows to allocate a certain number of steps for your component."),Object(o.b)(s.a,{values:[["length","number > 0","The number of steps you need to allocate."]],mdxType:"Arg"}),Object(o.b)(s.b,{values:[["stepIndex","number ∈ [-1,length[","The current stepIndex your component should follow."]],mdxType:"Return"}),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("strong",{parentName:"p"},"NOTE"),Object(o.b)("br",{parentName:"p"}),"\n","If your component is being used in a ",Object(o.b)("a",a({parentName:"p"},{href:"/MDXP/core-components#Step"}),"Step"),',\nthe returned stepIndex might be -1 to indicate that your component has not been "stepped" through yet.')),Object(o.b)("h3",{id:"examples-1"},"Examples"),Object(o.b)("pre",null,Object(o.b)("code",a({parentName:"pre"},{className:"language-jsx"}),"import {useStep} from '@mdxp/core'\n\nconst ChangeColor = ({children}) => {\n  const colors = ['red', 'green', 'blue'];\n  const stepIndex = useStep(colors.length);\n\n  return (\n    <div style={{color: colors[stepIndex]}}>\n      {children}\n    </div>\n  );\n}\n")),Object(o.b)("hr",null),Object(o.b)("h2",{id:"usenavigation"},"useNavigation"),Object(o.b)("p",null,"This hooks returns an object with a number of useful navigation functions."),Object(o.b)(s.b,{nameCol:"Key",values:[["next","() => void","Navigate to the next step or slide."],["previous","() => void","Navigate to the previous step or slide."],["nextSlide","(step=0:number) => void","Navigate to the next slide and specified step."],["previousSlide","(step=0:number) => void","Navigate to the previous slide and specified step."],["navigate","(slide:number, step=0:Integer, replace=false:Boolean) => void","Navigate to the specified slide and step, deciding whether to replace history or add a new page to it."],["setMode","(mode:deckMode) => void","Set the display mode the presentation"]],mdxType:"Return"}),Object(o.b)("h3",{id:"examples-2"},"Examples"),Object(o.b)("pre",null,Object(o.b)("code",a({parentName:"pre"},{className:"language-jsx"}),"import {useNavigation} from '@mdxp/core'\n\nconst LinkSlide = ({slide, step, text}) => {\n  const {navigate} = useNavigation();   // Destructure object to extract only navigate\n\n  return (\n    <button onClick={() => {navigate(slide, step)}}>\n      {text}\n    </button>\n  );\n}\n")))}void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"packages/core/doc/hook.doc.mdx"}}),l.isMDXComponent=!0}}]);
//# sourceMappingURL=component---packages-core-doc-hook-doc-mdx-4c5966d0fd2e2b7b1844.js.map