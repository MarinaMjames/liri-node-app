// 
var fs = require('fs');
//twitter npm 
var twitter = require('twitter');
//spotify npm
var Spotify = require('node-spotify-api');
// OMDB request for API 
var request = require('request');
// my-tweets, spotify-this, movie-this 
var command = process.argv[2];

// Getting Twitter Keys from keys.js file 
var twitterKeys = fs.readFile('keys.js', 'utf8', (err, data) =>{
	if(err) throw err;
});
var twitterKey = require('./keys');


// Twitter
if (command === 'my-tweets'){
	// twitter keys stored in variable named client
	var client = new twitter(
		twitterKey.twitterKeys
	);
	// 
	var twitterSearch = {screen_name: 'marinamjames'};
	client.get('statuses/user_timeline', twitterSearch, function(error, tweets, response) {
  if (error) {
    console.log(error);
  }
 	for (var i = 2; i < tweets.length; i++ ){
 		// console.log(tweets);
 		 console.log(tweets[i].created_at);
 		console.log(tweets[i].text);
 	}
 	// console.log(tweets);
});
}

// Spotify 
if (command === 'spotify-this-song'){
	// song title
	var songSearch = process.argv[3];
	var spotify = new Spotify({
  		id: 'f0fb8ac4076c4990ba4a911fcb4452e0',
 		secret: 'c45d2b83504e4efb81bb56f240bfb87b'
	});
 
	spotify.search({ type: 'track', query: songSearch }, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
  	}
console.log('The Artist: ' + data.tracks.items[0].album.artists[0].name);
console.log('Song Title: ' + data.tracks.items[0].name);
console.log('Preview the Song: ' + data.tracks.items[0].preview_url);
console.log('The Album: ' + data.tracks.items[0].album.name);
});
}

// OMDB

if (command === 'movie-this'){
//OMDB API Key
var omdbKey = "40e9cece";
//Movie title
	var inputSearch = process.argv[3];
	request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + inputSearch, function (error, response, body) {
		// console.log('error:', error); // Print the error if one occurred 
		// console.log('statusCode:', response); // Print the response status code if a response was received 
		// console.log('body:', body); // Print the HTML for the Google homepage. 
		console.log(JSON.stringify(body));
		var response = body.split(",");
		console.log(response);
		console.log(response[0].Title)
});
};

if (command === 'do-what-it-says'){
	// var 
}
