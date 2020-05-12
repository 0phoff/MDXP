const fs = require('fs-extra');

const copyExampleToBuild = (source, destination) => {
  fs.mkdirpSync(destination);
  return fs.copy(source, destination)
    .then(p => {
      console.log(`Copied ${source}`);
      return p;
    });
};


async function copyExamples() {
  const examples = [
    ['./examples/demo/dist/web', './docs/examples/demo']
  ];

  try {
    await Promise.all(examples.map(example => copyExampleToBuild(...example)));
  } catch (err) {
    console.error(err);
  }
}

copyExamples();
