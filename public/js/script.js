document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("submit").addEventListener("click", function(evt){
    evt.preventDefault();
    determineMovieArea();

    Movie.all = [];
    var keyword = document.getElementById("movieSearch").value;
    Movie.fetch(keyword).then(function(movies){
      Movie.all.forEach(function(movie){
        var view = new MovieView(movie)
        view.render();
      });
    });
  });

  document.getElementById("showFavorites").addEventListener("click", function(evt){
    evt.preventDefault();
    console.log("favorites!");
    determineMovieArea();
    Favorite.fetch().then(function(){
      console.log("This has been done");
      console.log(Favorite.all);
      Favorite.all.forEach(function(movie){
        var view = new MovieView(movie)
        view.renderFavorites();
      });
    });
  })

  var determineMovieArea = function(){
    var movieListContainer = document.getElementsByClassName('movieListContainer');
    if (movieListContainer[0]){
      movieListContainer[0].parentNode.removeChild(movieListContainer[0]);
      setMovieArea()
    } else {
      setMovieArea()
    }
  }

  var setMovieArea = function (){
    var newDiv = document.createElement('div');
    newDiv.className = "movieListContainer"
    var movieContainer = document.getElementsByClassName('movieContainer');
    movieContainer[0].appendChild(newDiv)
  }

});
