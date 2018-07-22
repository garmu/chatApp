const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const dbfile = 'chatdb';

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	writeDatabase();
	res.end(readDatabase());
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

function readDatabase() {
	fs.readFile(dbfile, 'utf8', (err, data) => {
		if(err) { console.log(err) }
		else {
			const obj = JSON.parse(data); //now it an object
			debugger;
			return JSON.stringify(obj);
		}
	});
}

function writeDatabase() {
	const obj = {
		date : new Date(),
		msg : "Hello Jordan"
	};

	const json = JSON.stringify(obj);

	fs.writeFile(dbfile, json, 'utf8', (err) => {});
}