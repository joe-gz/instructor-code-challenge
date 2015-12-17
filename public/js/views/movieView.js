var MovieView = function(movie){
  this.movie = movie;
};

MovieView.prototype = {
  render: function(){
    var self = this;
    console.log(self);
    self.movieTemplate(self.movie);

    var movieItem = document.getElementById(self.movie.imdbID);
    movieItem.addEventListener("click", function(){
      self.getInfo(self.movie.title);
    })
  },
  movieTemplate: function(){
    var movie = this.movie;
    var bodyDiv = document.getElementsByClassName('movieListContainer');
    var div = document.createElement('div');
    div.className = "movieLink"
    div.innerHTML = "<a id = "+movie.imdbID+">" +movie.title+"</a>"
    bodyDiv[0].appendChild(div);
    var body = document.body
    return (bodyDiv)
  },
  removeInfo: function (section){
    console.log("Clicked?");
    section.parentNode.removeChild(section);
  },
  getInfo: function(movieTitle){
    var self = this;
    Movie.fetchInfo(movieTitle).then(function(){
      for (var i = 0; i<MovieInfo.all.length;i++){
        if (movieTitle === MovieInfo.all[i].title) {
          var selectedMovie = MovieInfo.all[i];
          self.showInfo(selectedMovie);
        }
      }
    })
  },
  showInfo: function(selectedMovie){
    var movie = this.movie;
    movieChoice = document.getElementById(movie.imdbID).parentNode;
    var div = document.createElement('div');
    div.className = "movieInfo"
    var buttonsDiv = document.createElement('div');
    buttonsDiv.innerHTML = "<button class = 'favorite'>Favorite</button>"+"<button class = 'hideButton'>Hide</button";
    div.appendChild(buttonsDiv);
    var yearTag = document.createElement('p');
    yearTag.innerHTML = "Release Year: "+selectedMovie.year;
    div.appendChild(yearTag);
    var actorsTag = document.createElement('p');
    actorsTag.innerHTML = "Actors: "+selectedMovie.actors;
    div.appendChild(actorsTag);
    var plotTag = document.createElement('p');
    plotTag.innerHTML = "Plot: "+selectedMovie.plot;
    div.appendChild(plotTag);
    var posterTag = document.createElement('img');
    posterTag.src = selectedMovie.poster;
    div.appendChild(posterTag);
    movieChoice.appendChild(div);

    var addFavorite = function(movie) {
      var movieView = new MovieView(movie);
      movie.makeFavorite(movieView)
    }

    var favoriteButton = document.getElementsByClassName("favorite");
    for (var i = 0; i < favoriteButton.length; i++){
      favoriteButton[i].addEventListener("click", function(){
        var fav = document.getElementById(movie.imdbID)
        console.log(movie);
        addFavorite(movie);
      })
    }

    var hideButton = document.getElementsByClassName('hideButton');
    for (var i = 0; i < hideButton.length; i++){
      hideButton[i].addEventListener("click", function(e){
        var section = document.getElementsByClassName('movieInfo');
        for (var j = 0; j < section.length; j++){
          console.log(section);
          section[j].style.display = "none";
        }
      })
    }
    return (movieChoice)
  },
  renderFavorites: function(){
    var self = this;
    console.log(self);
    self.favoriteTemplate(self.movie);

    var movieItem = document.getElementById(self.movie.imdbID);
    movieItem.addEventListener("click", function(){
      self.getInfo(self.movie.title);
    })
  },
  favoriteTemplate: function(){
    var movie = this.movie;
    var div = document.createElement('div');
    div.className = "favDivs"
    div.innerHTML = "<a id = "+movie.imdbID+">" +movie.title+"</a>"
    document.body.appendChild(div);
    var body = document.body
    return (body)
  }
};
