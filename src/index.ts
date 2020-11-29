import * as Express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = Express();
const http = createServer(app);
const io = new Server(http);

const PORT = 7000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/**
 * [イベント] ユーザーが接続
 */
io.on('connection', (socket) => {
  console.log('ユーザーが接続しました');

  socket.on('post', (msg: string) => {
    io.emit('member-post', msg);
  });
});

/**
 * 7000番でサーバを起動する
 */
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
