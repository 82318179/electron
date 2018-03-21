const fs = require('fs');
const util = require('util');

console.log = function(d) {
	let time = new Date();
	let data = '';
	
	let year = time.getFullYear();
	let month = time.getMonth() + 1;
	let date = time.getDate();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();

	data = '[' + year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ':' + seconds + ']';
	fs.appendFile('console.log', data + util.format(d) + '\n', 'utf-8', function (err){});
	process.stdout.write(util.format(d) + '\n');
};