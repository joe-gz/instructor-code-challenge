document.addEventListener("DOMContentLoaded", function() {

// click event to search for movies
  document.getElementById("submit").addEventListener("click", function(evt){
    evt.preventDefault();

    //Clears out divs containing movie information on new search
    determineMovieArea();

    //Clears out movie array so search function only renders new searches
    Movie.all = [];
    var keyword = document.getElementById("movieSearch").value;
    Movie.fetch(keyword).then(function(movies){
      Movie.all.forEach(function(movie){
        var view = new MovieView(movie)
        view.render();
      });
    });
  });

// click event to display favorites
  document.getElementById("showFavorites").addEventListener("click", function(evt){
    evt.preventDefault();
    determineMovieArea();
    Favorite.all = []
    Favorite.fetch().then(function(){
      console.log("This has been done");
      Favorite.all.forEach(function(movie){
        // uses the same MovieView as the initial search to reduce code
        var view = new MovieView(movie)
        view.renderFavorites();
      });
    });
  })

  var determineMovieArea = function(){
    // meant to reduce duplicate displays of favorites
    var favDivs = document.getElementsByClassName('favDivs');
    if (favDivs.length>=0){
      for (var i = 0;i<favDivs.length;i++){
        favDivs[i].parentNode.removeChild(favDivs[i]);
      }
    }

    // removes list of movies when search is selected again
    var movieListContainer = document.getElementsByClassName('movieListContainer');
    if (movieListContainer[0]){
      movieListContainer[0].parentNode.removeChild(movieListContainer[0]);
      setMovieArea()
    } else {
      setMovieArea()
    }
  }

  // sets new div to populate movies upon search
  var setMovieArea = function (){
    var newDiv = document.createElement('div');
    newDiv.className = "movieListContainer"
    var movieContainer = document.getElementsByClassName('movieContainer');
    movieContainer[0].appendChild(newDiv)
  }
});
