const visit = require('unist-util-visit');

module.exports = (options = {}) => {
  const videoFile = options.videoTest || /\.(mp4|webm|avi|mpe?g|wmv|ogg)$/i;
  const videoMarker = options.videoMarker || null;
  const altSeparator = options.altSeparator || '&&';
  const jsxPropTest = /^{.*}$/;
  const jsxPropTestEqual = /={.*}$/;

  return tree => {
    visit(tree, {type: 'element', tagName: 'img'}, (node, index, parent) => {
      const newNode = {type: 'jsx', position: node.position};
      let {src, alt, ...props} = node.properties;
      alt = alt || '';

      // Tagname
      if (videoMarker && src.startsWith(videoMarker)) {
        src = src.slice(videoMarker.length);
        newNode.value = '<video ';
      } else if (src.match(videoFile)) {
        newNode.value = '<video ';
      } else {
        newNode.value = '<img ';
      }

      // Source
      src = decodeURI(src);
      if (src.match(jsxPropTest)) {
        newNode.value += `src=${src} `;
      } else {
        newNode.value += `src="${src}" `;
      }

      // Alt properties
      let styleValue;
      const style = {};
      if (alt.match(altSeparator)) {
        let altProps;
        [alt, ...altProps] = alt.split('&&');

        altProps.forEach(prop => {
          if (prop.match(/^(width|height)=/)) {
            let [propName, propValue] = prop.split('=');
            if (propValue.match(/^['"].*['"]$/)) {
              propValue = propValue.slice(1, -1);
            }

            style[propName] = propValue;
          } else if (prop.match(/^style=/)) {
            let propValue = prop.split('=')[1];
            styleValue = propValue;
          } else if (prop.match(jsxPropTestEqual)) {
            const [propName, propValue] = prop.split('=');
            newNode.value += `${propName}=${propValue} `;
          } else if (prop.match(/^.+=.+$/)) {
            const [propName, propValue] = prop.split('=');
            newNode.value += `${propName}="${propValue}" `;
          } else if (prop === 'autoplay') {
            newNode.value += 'autoPlay ';
          } else {
            newNode.value += `${prop} `;
          }
        });
      }

      Object.entries(style).forEach(([key, value]) => {
        if (styleValue) {
          styleValue = styleValue.slice(0, -2) + `, ${key}:${value}}}`;
        } else {
          styleValue = `{{${key}:"${value}"}}`;
        }
      });

      if (styleValue) {
        newNode.value += `style=${styleValue} `;
      }

      // Props
      Object.entries(props).forEach(([key, value]) => {
        if (value.match(jsxPropTestEqual)) {
          newNode.value += `${key}=${value} `;
        } else {
          newNode.value += `${key}="${value}" `;
        }
      });

      if (alt.match(jsxPropTestEqual)) {
        newNode.value += `alt=${alt} `;
      } else {
        newNode.value += `alt="${alt}" `;
      }

      // EndTag
      newNode.value += '/>';

      // Replace node
      parent.children[index] = newNode;
    });
  };
};
