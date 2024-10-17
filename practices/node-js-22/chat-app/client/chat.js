'use strict';

const app = document.getElementById('root');

const messageElement = (title) => {
  const li = document.createElement('li');
  li.innerText = title
  return li;
}

const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open', () => {
  console.log("Websocket is openning");
});

ws.addEventListener('error', (err) => {
  console.error("ERROR WS: ", err);
});

ws.addEventListener('message', (res) => {
  const li = messageElement(res.data);
  app.appendChild(li);
});

const handleOnSendMessage = (message) => {
  ws.send(message);
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  handleOnSendMessage(form.get('message'));
});