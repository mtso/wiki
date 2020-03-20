const fs = require('fs');
const path = require('path');

const childProcess = require('child_process');
const MarkdownIt = require('markdown-it'),
      md = new MarkdownIt();

const USAGE = `
  node src/index.js path/to/content
`

const CONTENT_PATH = process.argv[2];
const OUTPUT_PATH = process.argv[3];

console.log(CONTENT_PATH)

const head = '<head><link href="../links/style.css" rel="stylesheet"></head>'
const files = fs.readdirSync(CONTENT_PATH);

function t(t, inner) {
  return '<' + t + '>' + inner + '</' + t + '>';
}

files.forEach(function(file) {
  const filename = path.join(CONTENT_PATH, file);
  console.log('processing: ' + filename);
  const stat = fs.statSync(filename);

  if (stat.isFile()) {
    const cmd = 'git log --oneline --follow ' + filename + ' | wc -l && git log -1 --follow --pretty="%cd" ' + filename;
    childProcess.exec(cmd, function (err, stdout, stderr) {
      if (err) {
        console.error('error: ' + err.message);
        return;
      }
      if (stderr) {
        console.log('stderr: ' + stderr);
        return;
      }
      console.log(stdout)
      const pieces = stdout.trim().split('\n');
      const revisionCount = +(pieces[0].trim());
      const date = !!pieces[1] ? new Date(pieces[1].trim()) : new Date();
      const contents = fs.readFileSync(filename).toString('utf8');
      const slug = file.replace(/\.md$/, '');
      const revisionInfo = '<span><a href="./' + slug + '.history.html">Updated on ' + date.toLocaleDateString()
        + ', edited ' + revisionCount + ' times.</a><span>';
      const markup = md.render(contents);
      const page = '<!DOCTYPE html><html>' + t('body', head + t('main', markup) + revisionInfo) + '<html>';
  
      const outputPath = path.join(OUTPUT_PATH, file.replace(/\.md$/, '.html'));
      fs.writeFileSync(outputPath, page)
    });
  }

});

