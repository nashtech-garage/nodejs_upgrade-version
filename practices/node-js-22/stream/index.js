const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the file path (change this to your large file)
const filePath = path.join(__dirname, 'video.mp4');  // or any large file you want to stream

// Create the HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/video') {
    // Get file stats to know the size of the file
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
      }

      // Parse the range header from the client request
      const range = req.headers.range;
      if (!range) {
        // No range specified, send the entire file
        res.writeHead(416, { 'Content-Type': 'text/plain' });
        res.end('Requires Range header');
        return;
      }

      const fileSize = stats.size;
      const CHUNK_SIZE = 10 ** 6; // 1MB per chunk (adjust as necessary)
      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

      // Headers for partial content (streaming)
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4', // Adjust MIME type based on the file
      });

      // Create a readable stream for this chunk and pipe it to the response
      const stream = fs.createReadStream(filePath, { start, end });
      console.log(stream.readableHighWaterMark);
      stream.pipe(res);

      // Handle stream errors
      stream.on('error', (streamErr) => {
        console.error(streamErr);
        res.end(streamErr);
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to File Streaming Server</h1><p>Use /video to stream video</p>');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});