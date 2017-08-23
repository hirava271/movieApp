 /* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

 'use strict';

 var fs = require('fs'),
     request = require('request'),
     movieDB = require('./modules/movieDB');

 /**************** ************** ************** ************** **************
          Remove the old movies in the collection
 ************** ************** ************** ************** ************** */
 movieDB.Movie.remove({}, function(err, movies) {
   if(movies){
     console.log('collection removed');
   }
 });

 var totalMovies = 0;
var listOfMovies = [];

 /**************** ************** **************  **************
          Add movies in the collection
 ************** ************** **************  ************** */
 fs.readFile('movies.txt', 'utf8', function(err, fileData) {
     // Parameters to make comma delimited. 
   //White space is not consideredpart of the string
     listOfMovies = fileData.replace(/\n/g, ' ');
     listOfMovies = listOfMovies.replace(/\r/g, ' ');
     listOfMovies = listOfMovies.split(', ');

     totalMovies = listOfMovies.length;

     /**************** ************** **************  **************
              connect to omdbapi to get data for each movie.
              After connecting to omdbapi store data for each
            object on databae
     ************** ************** **************  ************** */
     listOfMovies.forEach(function(name) {
         request('http://www.omdbapi.com/?t=' + name + '&y=&plot=short&r=json', 
                 function(error, response, body) {
             var info = JSON.parse(body);
             console.log(info.Title);
             var movie = new movieDB.Movie({ title: info.Title, 
                                            movie: info, 
                                            meta: { votes: 0, likes: 0 } });
             // Store the movie to the database
             movie.save();
             totalMovies--;
             if (totalMovies === 0) {
                 console.log('All movies are added to the database'+ 
                             'Press Ctrl-C to terminate the script');
             }
         });
     });
 });