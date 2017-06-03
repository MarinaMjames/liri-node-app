// 
var fs = require('fs');
//twitter npm 
var twitter = require('twitter');
//spotify npm
var spotify = require('spotify');
// OMDB request for API 
var request = require('request');
// my-tweets, spotify-this, movie-this 
var command = process.argv[2];
// song or movie title

//OMDB API Key
// var omdbKey = "2e1b7625"; 
var omdbKey = "40e9cece";
// Getting Twitter Keys from keys.js file 
var twitterKeys = fs.readFile('keys.js', 'utf8', (err, data) =>{
	if(err) throw err;
	// console.log(data);
	// var twitterKeys = data.split(',');
	// for (var i = 0; i < twitterKeys.length; i++){
		// console.log(twitterKeys[i]);

	// }
});
var twitterKey = require('./keys');
// console.log()
// console.log(twitterKey);
// console.log(twitterKey.twitterKeys);

// Twitter
if (command === 'my-tweets'){

	var client = new twitter(
twitterKey.twitterKeys
);

	console.log("List of 20 most recent tweets here!");
	var twitterSearch = {screen_name: 'marinamjames'};
	client.get('statuses/user_timeline', twitterSearch, function(error, tweets, response) {
  if (error) {
    console.log(error);
  }

  console.log(tweets);
});
}

// Spotify 
if (command === 'spotify-this'){

//  console.log(inputSearch);
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//     console.log(data); 

// function getSpotify() {
        
        var artist = process.argv[3];
        // Running an initial search to identify the artist's unique Spotify id
        var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist&limit=1";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
        	console.log(response);
        });
    // };
// });

}

// OMDB

if (command === 'movie-this'){

	var inputSearch = process.argv[3];
request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + inputSearch, function (error, response, body) {
	console.log('error:', error); // Print the error if one occurred 
	console.log('statusCode:', response); // Print the response status code if a response was received 
	console.log('body:', body); // Print the HTML for the Google homepage. 
});
};
