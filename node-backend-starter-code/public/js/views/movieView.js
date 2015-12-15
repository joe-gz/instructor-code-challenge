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
      self.showInfo();
    })

  },
  movieTemplate: function(){
    var movie = this.movie;
    var div = document.createElement('div');
    div.innerHTML = "<a id = "+movie.imdbID+">" +movie.title+"</a>"+"<button class = 'favorite'>Favorite</button>"
    // div.id = movie.imdbID;
    document.body.appendChild(div);
    var body = document.body
    return (body)
  },
  showInfo: function(){
    var movie = this.movie;
    movieChoice = document.getElementById(movie.imdbID).parentNode;
    var div = document.createElement('div');
    div.className = "movieInfo"
    console.log(movieChoice);
    var yearTag = document.createElement('p');
    yearTag.innerHTML = movie.year;
    div.appendChild(yearTag);
    var posterTag = document.createElement('img');
    posterTag.src = movie.poster;
    div.appendChild(posterTag);
    var hideButton = document.createElement('span');
    hideButton.innerHTML = "<input class = hideButton"+movie.imdbID+" type='button' value='Hide'/>";
    div.appendChild(hideButton);
    movieChoice.appendChild(div);
    return (movieChoice)
  },
  removeInfo: function (){
    console.log("Clicked?");
    var movie = this.movie;
    movieChoice = movie.getElementsByTagName('div')[0];
  }
};
