var fs = require('fs'); 

var keysFile = fs.readFile('keys.js', 'utf8', (err, data) =>{
	if (err) throw err;
	console.log(data);
})