/**************** ************** ************** ************** **************
    Function creates a HTML object to be displayed with attibutes
        takes as a parameter an object in this case a movie object
************** ************** ************** ************** ************** */
var newMovieTile = function(movie)
{
  'use strict';
    var $tile;
   // var $id;
    var votes = movie.meta.votes;
    var likes = movie.meta.likes;
    var rating;
    if (likes === 0 && votes === 0)
    {
      rating = 0;
    }
    else
    {
        rating = parseInt(likes / votes * 100);
    }
    $tile = $('<div class="five wide column">' +
                  '<div class="ui special cards">' +
              // gives movie and id depending on the movie name, used to identify votes
                      '<div class="ui card"id="' + movie.movie.Title + '">' +
                          '<div class="ui center aligned segment">' + movie.movie.Title + '</div>' + // title
                              '<div class="blurring dimmable image"> <img src=' + movie.movie.Poster + '>'+
                                  '<div class="ui dimmer">'+
                                      '<div class="content">'+
                                         '<div class="center">' +
                                            '<div class="ui inverted massive button">More info'+
                                             '</div>'+
                                         '</div>'+
                                      '</div>'+
                                   '</div>' +
                                '</div>' +
                            '<div class="extra center aligned content">' +
                                '<div class="ui two attached buttons">' +
                                    '<button class="ui green button"><i class="chevron up icon"></i></button>' +
                                    '<div class="or"> </div>' +
                                    '<button class="ui red button"><i class="chevron down icon"></i></button>' +
                                '</div>' +
                                '<div class="ui statistic" >' +
                                    '<div class="label">' +
                                        'Votes' +
                                    '</div>' +
                                    '<div class="value" >' +
                                        votes +
                                    '</div>'+
                                '</div>' +
                            '<div class="ui tiny progress"  data-percent = ' + rating + '>' +
                                '<div class="bar" style = " width : ' + rating + '%">' +
                                '</div>' +
                            '</div>' +
                        '</div>'+
                    '</div>'+
                '</div>');
    return $tile;
};


/*************** ************** ************** **************  **************
    Functiontion to initialize an array of elements that will
    be displayed in  app.
    This function takes as a parameter movies, a JSON response from database.
************** ************** ************** **************  ************** */
var initializeTiles = function(movies)
{
  'use strict';
    var array=[],
        totalNumberOfMovies = movies.length;

    var i = 0;

    //generate all movies and put into arrayOfTiles
    for (i; i < totalNumberOfMovies; i++)
    {
        var $element = newMovieTile(movies[i]);
        array.push($element);
    }
    return array;
};
