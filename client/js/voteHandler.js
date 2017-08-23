/**************** ************** ************** ************** **************
    Function animates the displayed screen as the user upvote or downvote
    on movies
************** ************** ************** ************** ************** */
var updateVotes = function(object, votes)
{
  'use strict';
  	//find field for each movie
    var $field = $("div[id='" + object.movie.Title + "'] .ui.statistic");
    var $oldVote = $("div[id='" + object.movie.Title + "'] .value");
    var $updatetotalNumberOfMovies = '<div class="value" >' + votes + '</div></div>';

    $('<div class="value" id="' + object.movie.Title + ' " >');
    $oldVote.remove();
    $($field).append($updatetotalNumberOfMovies);

};

/**************** ************** ************** ************** **************
    Function animates the displayed progess bar as the user upvote or downvote
    on movies
************** ************** ************** ************** ************** */
var updateProgessbar = function(object, avg)
{
    //find field for each movie
  	'use strict';
    var $field = $("div[id='" + object.movie.Title + "'] .extra.center.aligned.content");
    var $ratingBar = $("div[id='" + object.movie.Title + "'] .ui.tiny.progress");
    var $updatedRatingBar = '<div class="ui tiny progress"  data-percent = ' + avg + '>' + '<div class="bar" style = "transition-duration : 300ms;  width : ' + avg + '%">';

    $ratingBar.remove();
    $($field).append($updatedRatingBar);
};

/**************** ************** ************** ************** **************
    Function makes post requests to server in order to  update votes on
    movie database
************** ************** ************** ************** ************** */
var sendVoteToServer = function(input, index, parentNode, node)
{
  'use strict';
    $.post('/movie/title/vote', input, function(res) {
        var $temp = node.next();

        if (res.result === 'success') {
            //update votes on the movie
            Movies[index].meta.votes = res.newVotes;
            Movies[index].meta.likes = res.newLikes;
            var ratingBar = (res.newLikes / res.newVotes) * 100;

            //Update rating
            $(parentNode).find('.rating').text('Likes: ' + res.newLikes + ' / totalNumberOfMovies Votes: ' + res.newVotes);

            //Update the width of rating bar
            var $temp1 = $temp.children();

            $temp1.width(ratingBar + '%');

            var $temp2 = $temp1.children();
            $temp2.text(parseInt(ratingBar) + '%');
            updateVotes(Movies[index], Movies[index].meta.votes);
            updateProgessbar(Movies[index], (Movies[index].meta.likes / Movies[index].meta.votes) * 100);
        }
    });
};
