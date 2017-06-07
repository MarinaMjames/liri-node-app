// 
var fs = require('fs');
//twitter npm 
var twitter = require('twitter');
//spotify npm
var Spotify = require('node-spotify-api');
// OMDB request for API 
var request = require('request');
//my-tweets, spotify-this-song, movie-this, do-what-it-says 
var command = process.argv[2];


//Getting Twitter Keys from keys.js file 
var twitterKey = require('./keys');


//my-tweets command
if (command === 'my-tweets'){
	//twitter keys stored in variable named client
	var client = new twitter(
		twitterKey.twitterKeys
	);
	// request to get information from twitter api
	var twitterSearch = {screen_name: 'marinamjames'};
	client.get('statuses/user_timeline', twitterSearch, function(error, tweets, response) {
  		//handles any errors
  		if (error) {
    		console.log(error);
  		}
  	//loop through all the tweets
 	for (var i = 0; i < tweets.length; i++ ){
 		//Create dates and times for my tweets
 		console.log(tweets[i].created_at);
 		//Text of the tweets
 		console.log(tweets[i].text);
 	}
	});
}
if (command === 'spotify-this-song'){
	spotifyThis(process.argv[3]);
}
//spotify-this-song command
function spotifyThis(songSearch){

	if (songSearch === undefined){
		songSearch = 'The Sign';
	}
	//spotify keys
	var spotify = new Spotify({
  		id: 'f0fb8ac4076c4990ba4a911fcb4452e0',
 		secret: 'c45d2b83504e4efb81bb56f240bfb87b'
	});
	//call to the spotify api
	spotify.search({ type: 'track', query: songSearch }, function(err, data) {
  		//Handles any errors
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
  		//Display Artist
		console.log('The Artist: ' + data.tracks.items[0].album.artists[0].name);
		//Display Song Title
		console.log('Song Title: ' + data.tracks.items[0].name);
		//Display Preview Song URL
		console.log('Preview the Song: ' + data.tracks.items[0].preview_url);
		//Display Album Name
		console.log('The Album: ' + data.tracks.items[0].album.name);
	});
}

//movie-this command
if (command === 'movie-this'){
	omdbApi(process.argv[3]);
}
function omdbApi(inputSearch){

	//OMDB API Key
	var omdbKey = "40e9cece";

	if (inputSearch === undefined){
		inputSearch = 'Mr. Nobody';
	}
	//Movie title
		//request to the omdb api with the node input
		request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + inputSearch, function (error, response, body) {
			//parse the response from the api
			var response = JSON.parse(body);
			console.log(response);
			//Display Movie Title
			console.log('Movie Title: ' + response.Title);
			//Display Release Date
			console.log('Release Date: ' + response.Released);
			//Display IMDB Rating
			console.log('IMDB Rating: ' + response.imdbRating);
			//Display Country
			console.log('Country Produced in: ' + response.Country);
			//Display Language
			console.log('Language of Movie: ' + response.Language);
			//Display Plot
			console.log('Plot: ' + response.Plot);
			//Display Actors
			console.log('Actors: ' + response.Actors);
			//Display Rotten Tomatoes Link
			console.log('Rotten Tomatoes: ' + response.Ratings[1].Source.Value);
		});
}
//do-what-it-says command
if (command === 'do-what-it-says'){
	//reads the random.txt file that includes spotify-this-song and a song title
	var randomSearch = fs.readFile('../../random.txt', 'utf8', (err, data) =>{
		//Handles any errors
		if (err) throw err;
		//shows the text in the random.txt file
		
		var doWhatItSays = data.split(",");
		// console.log(doWhatItSays);

		if (doWhatItSays[0] === 'spotify-this-song'){
			spotifyThis(doWhatItSays[1]);
		}
	});

}
