const budo = require('budo');
const fs = require('fs');
const path = require('path');
const stylus = require('stylus');
const babelify = require('babelify');
const jade = require('jade');

const app = budo('index.js', {
  browserify: {
    transform: babelify
  },
  stream: process.stdout
});

app
  // listen to CSS file changes with some chokidar options
  .watch('**/*.{jade,styl,js}', { interval: 300, usePolling: true })
  // start LiveReload server
  .live()
  // handle file changes
  .on('watch', function(type, file) {
    // tell LiveReload to inject some CSS
    if (path.extname(file) === '.jade') {
      consoleilog('here');
      fs.readFile(file, (err, content) => {
        if (err) throw err;
        const fn = jade.compile(content);
        const html = fn();
        const output = path.basename(file, '.jade') + '.html';
        fs.writeFile(output, html, (err) => {
          if (err) throw err;
          app.reload(output);
        });
      });

    }

    if (path.extname(file) === '.styl') {

      fs.readFile(file, (err, content) => {
        if (err) throw err;
        stylus(content.toString())
          .set('filename', file)
          .render((err, css) => {
            const output = path.basename(file, '.styl') + '.css';
            fs.writeFile(output, css, (err) => {
              if (err) throw err;
              app.reload(output);
            });
          });
      });

    }

    if (path.extname(file) === '.js') {
      app.reload(file);
    }

  });
