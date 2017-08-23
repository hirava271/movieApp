/**************** ************** ************** ************** **************
    Function to show Modal when clicked on movie image
************** ************** ************** ************** ************** */
var showModal = function()
{
	'use strict';
    $('#modal-button').on('click', function() {
        $('.ui.modal').modal('hide');
        $('.ui.modal').remove();
    });
};



/**************** ************** ************** ************** **************
    Function creates a HTML Modal to be displayed when clicked on movie poster
        takes as a parameter an object in this case a movie object
************** ************** ************** ************** ************** */
var appendModal = function(movie) {
  'use strict';
    var $popUpModal = $('<div class = "ui modal"><i class="close icon" id ="modal-button"></i>' +
        '<div class="ui items">' +
        '<div class="item">' +
        '<div class="image">' +
        '<img src=' + movie.Poster + '>' +
        '</div>' +
        '<div class="content">' +
        '<h1 class="ui header">' + movie.Title + ' (' + movie.Year + ')' +
        '<div class="sub header">' +
        movie.Rated + ' | ' + movie.Runtime + ' | ' + movie.Genre + ' | ' + movie.Released + ' (' + movie.Country + ')' +
        '</div>' +
        '</h1>' +
        '<hr>' +
        '<div class="description">' +
        '<p>' + movie.Plot + '</p>' +
        '</div>' +
        '<div class="extra">' +
        '<p><strong>Director</strong>: ' + movie.Director + '</p>' +
        '<p><strong>Writers</strong>: ' + movie.Writer + '</p>' +
        '<p><strong>Stars</strong>: ' + movie.Actors + '</p>' +
        '</div>' +
        '</div>' +
        '<h3 class="ui bottom attached header">' +
        '<p>Metascore: ' + movie.Metascore + '</p>' +
        '<p>IMDB Rating: ' + movie.imdbRating + '</p>' +
        '<p>IMDB Votes: ' + movie.imdbVotes + '</p>' +
        '<p>Awards: ' + movie.Awards + '</p>' +
        '</h3>' +
        '</div>' +
        '</div>' +
        '</div>');
    $('head').append($popUpModal);
    $('.ui.modal').modal('show');
    showModal($popUpModal);
};
