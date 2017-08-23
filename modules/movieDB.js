 /* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

 /**************** ************** **************  **************
         Create  a movie schema
 ************** ************** **************  ************** */
 var mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/movieDB');

 // Create a movie schema
 var movieSchema = mongoose.Schema({
     title: String,
     movie: JSON,
     meta: {
         votes: Number,
         likes: Number
     }
 });

 // Create a database collection model
 var Movie = mongoose.model('Movie', movieSchema);

 module.exports.Movie = Movie;