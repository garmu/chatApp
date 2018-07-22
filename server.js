var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


/*

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const dbfile = 'chatdb';

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.write(getHTML());
	res.end();
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

function readDatabase() {
	const obj = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
	return JSON.stringify(obj);
}

function writeDatabase() {
	const obj = {
		date : new Date(),
		msg : "Hello Jordan"
	};

	const json = JSON.stringify(obj);

	fs.writeFile(dbfile, json, 'utf8', (err) => {});
}

function getHTML() {
	return "<b>Hello</b><br />This is HTML";
}
*/