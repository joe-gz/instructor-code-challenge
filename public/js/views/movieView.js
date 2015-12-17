var MovieView = function(movie){
  this.movie = movie;
};

MovieView.prototype = {
  render: function(){
    var self = this;
    console.log(self);
    self.movieTemplate(self.movie);

    var movieItem = document.getElementById(self.movie.imdbID);
    // click event to display movie information
    // this makes a SECOND ajax call to the details OMDB json file path
    movieItem.addEventListener("click", function(){
      self.getInfo(self.movie.title);
    })
  },
  movieTemplate: function(){
    var movie = this.movie;
    var bodyDiv = document.getElementsByClassName('movieListContainer');
    var div = document.createElement('div');
    div.className = "movieLink"
    // add in link to movie titles within their own divs
    div.innerHTML = "<a id = "+movie.imdbID+">" +movie.title+"</a>"
    bodyDiv[0].appendChild(div);
    return (bodyDiv)
  },
  removeInfo: function (section){
    section.parentNode.removeChild(section);
  },
  getInfo: function(movieTitle){
    var self = this;
    // calls the AJAX function to pull up detailed movie information
    Movie.fetchInfo(movieTitle).then(function(){
      for (var i = 0; i<MovieInfo.all.length;i++){
        // if statement below determines which title has been clicked
        if (movieTitle === MovieInfo.all[i].title) {
          var selectedMovie = MovieInfo.all[i];
          self.showInfo(selectedMovie);
        }
      }
    })
  },
  showInfo: function(selectedMovie){
    // VERY MESSY, but this is meant to build out the html elements to actually post the detailed movie information
    var movie = this.movie;
    movieChoice = document.getElementById(movie.imdbID).parentNode;
    // creates the containing div
    var div = document.createElement('div');
    div.className = "movieInfo"
    // creates nested div for favorite and hide buttons
    var buttonsDiv = document.createElement('div');
    buttonsDiv.innerHTML = "<button class = 'favorite'>Favorite</button>"+"<button class = 'hideButton'>Hide</button";
    div.appendChild(buttonsDiv);
    // creates "p" tags for text fields
    var yearTag = document.createElement('p');
    yearTag.innerHTML = "Release Year: "+selectedMovie.year;
    div.appendChild(yearTag);
    var actorsTag = document.createElement('p');
    actorsTag.innerHTML = "Actors: "+selectedMovie.actors;
    div.appendChild(actorsTag);
    var plotTag = document.createElement('p');
    plotTag.innerHTML = "Plot: "+selectedMovie.plot;
    div.appendChild(plotTag);
    // creates img tag for the poster url
    var posterTag = document.createElement('img');
    posterTag.src = selectedMovie.poster;
    div.appendChild(posterTag);

    // appends the entire nested div area to the given movie selection
    movieChoice.appendChild(div);

    this.favoriteButtonClick(movie);

    var hideButton = document.getElementsByClassName('hideButton');
    this.hideButtonClick(hideButton)

    return (movieChoice)
  },
  renderFavorites: function(){
    var self = this;
    self.favoriteTemplate(self.movie);

    var movieItem = document.getElementById(self.movie.imdbID);
    movieItem.addEventListener("click", function(){
      // renders detailed information for favorites
      self.getInfo(self.movie.title);
    })
  },
  favoriteTemplate: function(){
    var movie = this.movie;
    // creates new div for favorites
    // movie searches are removed through script.js
    var div = document.createElement('div');
    div.className = "favDivs"
    div.innerHTML = "<a id = "+movie.imdbID+">" +movie.title+"</a>"
    document.body.appendChild(div);
    var body = document.body
    return (body)
  },
  hideButtonClick: function (hideButton){
    // for loop that hides a given movie's detailed information
    for (var i = 0; i < hideButton.length; i++){
      hideButton[i].addEventListener("click", function(e){
        var section = document.getElementsByClassName('movieInfo');
        for (var j = 0; j < section.length; j++){
          console.log(section);
          section[j].parentNode.removeChild(section[j]);
          MovieInfo.all = []
        }
      })
    }
  },
  favoriteButtonClick: function(movie){
    // a bit of a hacky way to add favorites here..
    var addFavorite = function(movie) {
      var movieView = new MovieView(movie);
      movie.makeFavorite(movieView)
    }

    var favoriteButton = document.getElementsByClassName("favorite");
    for (var i = 0; i < favoriteButton.length; i++){
      favoriteButton[i].addEventListener("click", function(){
        console.log(movie);
        addFavorite(movie);
      })
    }
  }
};
