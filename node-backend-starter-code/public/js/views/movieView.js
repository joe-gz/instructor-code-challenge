var MovieView = function(movie){
  this.movie = movie;
  // this.$el = $("<div class='movie'></div>");
  // this.render();
  // $(".artists").append(this.$el);
};

MovieView.prototype = {
  render: function(){
    var self = this;
    self.movieTemplate(self.movie);

    var movieItem = document.getElementById(self.movie.imdbID);
    movieItem.addEventListener("click", function(){
      self.getInfo(self.movie.title);
    })

    var favoriteButton = document.getElementsByClassName("favorite");
    for (var i = 0; i < favoriteButton.length; i++){
      favoriteButton[i].addEventListener("click", function(){
        self.addFavorite();
      })
    }

    // var hideButton = document.getElementById('hideButton'+self.movie.imdbID);
    // console.log(hideButton);
    // hideButton.addEventListener("click", function(){
    //   self.removeInfo();
    // })
  },
  movieTemplate: function(){
    var movie = this.movie;
    var div = document.createElement('div');
    div.innerHTML = "<a id = "+movie.imdbID+">" +movie.title+"</a>"+"<button class = 'favorite'>Favorite</button>"
    document.body.appendChild(div);
    var body = document.body
    return (body)
  }
  ,
  removeInfo: function (){
    console.log("Clicked?");
    var movie = this.movie;
    movieChoice = movie.getElementsByTagName('div')[0];

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
    var yearTag = document.createElement('p');
    yearTag.innerHTML = selectedMovie.year;
    div.appendChild(yearTag);
    var actorsTag = document.createElement('p');
    actorsTag.innerHTML = selectedMovie.actors;
    div.appendChild(actorsTag);
    var plotTag = document.createElement('p');
    plotTag.innerHTML = selectedMovie.plot;
    div.appendChild(plotTag);
    var posterTag = document.createElement('img');
    posterTag.src = selectedMovie.poster;
    div.appendChild(posterTag);
    var hideButton = document.createElement('span');
    hideButton.innerHTML = "<input id = hideButton"+movie.imdbID+" type='button' value='Hide'/>";
    div.appendChild(hideButton);
    movieChoice.appendChild(div);

    var hideButton = document.getElementById('hideButton'+movie.imdbID);
    console.log(hideButton);
    hideButton.addEventListener("click", function(){
      movieChoice.removeInfo();
    })

    return (movieChoice)
  },
  addFavorite: function() {
    var self = this.movie;
    // console.log(self);
    var movieView = new MovieView(self);
    self.makeFavorite(movieView)
    // .then(function() { commentsDiv.prepend(commentView.render()); });
  }
};
