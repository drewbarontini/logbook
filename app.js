const express = require('express');
const fs = require('fs');
const showdown = require('showdown');

const app = express();
const converter = new showdown.Converter();

function parseMarkdown(req, res, next) {
  fs.readFile('LOGBOOK.md', (error, data) => {
    if (error) throw error;

    const string = data.toString();
    res.markdown = converter.makeHtml(string);

    next();
  });
}

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', parseMarkdown, function(req, res) {
  res.render('index', { content: res.markdown });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
