const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Array to store connected clients
let clients = [];

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.push(ws);

  // Broadcast when a new client joins
  ws.send('Welcome to the chat!');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast message to all connected clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(String(message));
      }
    });
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter((client) => client !== ws);
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket chat server is running');
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});