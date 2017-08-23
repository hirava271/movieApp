/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

'use strict';

var express = require('express'),
    parser = require('body-parser'),
    movieDB = require('./modules/movieDB'),
    app;

/**************** ************** **************  **************
        create  Express powered HTTP server
************** ************** **************  ************** */
app = express();

app.use(express.static(__dirname + '/client'));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.send('This is the root route');
});

app.get('/movie', function(req, res) {
    //return all of the movies sorted by total votes
    movieDB.Movie.find({}).sort({
        'meta.votes': 'descending'
    }).exec(function(err, movies) {
        if (err) {
            res.send('error');
        } else {
            console.log(movies);
            res.json(movies);
        }
    });
});
/**************** ************** **************  **************
        When vote up update data on database 
************** ************** **************  ************** */
app.post('/movie/title/vote', function(req, res) {

    var vote = req.body.vote;
    var name = req.body.title;
    console.log('Stranger votes ' + vote + ' on ' + name);
    movieDB.Movie.findOne({ title: name }, function(err, result) {
        if (err) {
            res.json({ 'result': 'error' });
            console.log('Error on accessing the database');
            return;
        }
        var newVotes = result.meta.votes + 1;
        var newLikes = result.meta.likes;
        if (vote === 'yes') {
            newLikes += 1;
        }

        movieDB.Movie.update({ title: result.title }, {
            meta: { votes: newVotes, likes: newLikes }
        }, function(err, success) {

            if (err) {
                console.log('Error while updating database');
                res.json({ 'result': 'error' });
                return;
            }
            if (success) {
                var reply = {
                    'result': 'success',
                    'newVotes': newVotes,
                    'newLikes': newLikes
                };
                res.json(reply);
            }
        });
    });

});


app.listen(3000, function() {
    console.log('server is listening on port 3000');
});