const inputDir = './src';
const outputDir = './public';

const staticFilePaths = [
  '_headers',
  '_redirects',
  'manifest.webmanifest',
  'robots.txt',
  'service-worker.js'
];

module.exports = eleventy => {
  staticFilePaths.forEach(filePath => {
    eleventy.addPassthroughCopy(`${inputDir}/${filePath}`);
  });

  return {
    dir: {
      input: inputDir,
      output: outputDir
    }
  };
};
