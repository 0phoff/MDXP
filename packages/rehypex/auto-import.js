const fs = require('fs');
const path = require('path');
const visit = require('unist-util-visit');
const flatFilter = require('unist-util-flat-filter');

const testWrapper = (value, vfile, test) => {
  const filepath = vfile.history
    .map(filepath => path.dirname(filepath))
    .filter((val, i, arr) => arr.indexOf(val) === i);

  if (Array.isArray(filepath)) {
    return filepath.some(p => test(value, p));
  }

  return test(value, filepath);
};

module.exports = (options = {}) => {
  const test = options.test || ((value, dir) => fs.existsSync(path.resolve(dir, value)));
  const noImport = options.noImport || null;

  return (tree, file) => {
    // Get existing import paths
    const importNodes = flatFilter(tree, node => node.type === 'import');
    let imports = [];
    if (importNodes) {
      imports = importNodes.children.map(node => {
        const match = node.value.match(/^import\s+(.+)\s+from\s+['"](.+)['"]/);

        if (match) {
          return [match[1], match[2]];
        }

        return null;
      }).filter(value => value && !value[0].startsWith('{'));
    }

    // Search for importable paths
    visit(tree, ['jsx'], node => {
      if (node.value.startsWith('</')) {
        return;
      }

      const valueParts = node.value.split(/\s+/);
      const newValueParts = valueParts.map(part => {
        const match = part.match(/^(.+)=(['"])(.+)['"]$/);

        if (match) {
          const key = match[1];
          const quote = match[2];
          let value = match[3];

          // Starts with special no import string
          if (noImport && value.startsWith(noImport)) {
            return `${key}=${quote}${value.slice(noImport.length)}${quote}`;
          }

          // Includeable values
          if (testWrapper(value, file, test)) {
            // Existing imports
            for (const [name, path] of imports) {
              if (value === path) {
                return `${key}={${name}}`;
              }
            }

            // Insert new import
            const importName = 'AI_' + value.replace(/[-~./\\\s]/g, '_');
            tree.children.unshift({
              type: 'import',
              value: `import ${importName} from '${value}';`,
              position: node.position
            });
            imports.push([importName, value]);

            // Use new import
            return `${key}={${importName}}`;
          }
        }

        return part;
      });

      node.value = newValueParts.join(' ');
    });
  };
};
