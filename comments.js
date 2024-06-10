// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file.

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url);
  let filePath = '.' + urlObj.pathname;

  if (filePath === './') {
    filePath = './comments.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
  };

  contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.write(data);
    return res.end();
  });
});

server.listen(3000, () => {
  console.log('Server running at http://