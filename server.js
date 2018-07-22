var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');

const dbfile = 'chatdb';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    const messages = getDatabaseMessages();
    messages.forEach(message => io.to(socket.id).emit('chat message', message.msg));

    socket.on('chat message', function(msg) {
        writeMessageToDatabase(socket.client.id, msg, new Date());
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

const readDatabase = () => {
    return JSON.parse(fs.readFileSync(dbfile, 'utf8'));
}

const getDatabaseMessages = () => {
    const messagesObj = readDatabase();
    return messagesObj.messages;
}

const writeMessageToDatabase = (id, msg, date) => {
    const databaseList = readDatabase();
	const newMessage = {
		date : date,
        msg : msg,
        id: id
    };
    databaseList.messages.push(newMessage);
	const json = JSON.stringify(databaseList, null, 4);
	fs.writeFile(dbfile, json, 'utf8', (err) => {});
}
