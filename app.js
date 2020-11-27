const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 7000;

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/**
 * [イベント] ユーザーが接続
 */
io.on('connection', (socket) => {
  console.log('ユーザーが接続しました');

  socket.on('post', (msg) => {
    io.emit('member-post', msg);
  });
});

/**
 * 7000番でサーバを起動する
 */
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
