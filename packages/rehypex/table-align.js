const visit = require('unist-util-visit');

const hastCssMap = {
  align: 'text-align',
  valign: 'vertical-align',
  height: 'height',
  width: 'width'
};

module.exports = () => tree => {
  visit(tree, [{type: 'element', tagName: 'th'}, {type: 'element', tagName: 'td'}], node => {
    if (!node.properties) {
      return;
    }

    for (const [hast, css] of Object.entries(hastCssMap)) {
      if (!node.properties[hast]) {
        continue;
      }

      // Append style
      let style = (node.properties.style || '').trim();
      if (style.length && !/;$/.test(style)) {
        style += '; ';
      } else if (style.length) {
        style += ' ';
      }

      style += css + ': ' + node.properties[hast] + ';';

      // Set new style and remove property
      node.properties.style = style;
      delete node.properties[hast];
    }
  });
};
