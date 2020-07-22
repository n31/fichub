import express from 'express';
import renderRouterMiddleware from '../iso-middleware/renderRoute';

const app = express();
const bodyParser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const path = require('path');
const buildPath = path.join(__dirname, '../', 'build');
app.use(bodyParser.json());
app.use('/', express.static(buildPath));
app.use(express.static(__dirname));

app.get('*', renderRouterMiddleware);

server.listen(process.env.PORT || 8080, '192.168.100.6', () => {
  console.log('Listening on 192.168.100.6:8080');
});