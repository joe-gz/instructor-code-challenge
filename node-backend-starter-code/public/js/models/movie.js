var Movie = function(info){
  this.title = info.Title;
  this.year = info.Year;
  this.imdbID = info.imdbID;
  this.type = info.Type;
  this.poster = info.Poster;
  this.id = info._id;
};

var MovieInfo = function(info){
  this.title = info.Title;
  this.year = info.Year;
  this.rated = info.Rated;
  this.released = info.Released;
  this.runtime = info.Runtime;
  this.director = info.Director;
  this.actors = info.Actors;
  this.plot = info.Plot;
  this.poster = info.Poster;
  this.imdbRating = info.imdbRating;
  this.id = info._id;
};

Movie.all = []
Movie.fetch = function(keyword){
  var url = "http://www.omdbapi.com/?s="+keyword
  console.log(url);

  var request = $.getJSON(url).then(function(response){
    for(var i = 0; i < response.Search.length; i++){
      Movie.all.push(new Movie(response.Search[i]));
    }
  }).fail(function(response){
    console.log("js failed to load");
  });
  return request;
};

Movie.prototype = {
  makeFavorite: function(movieView) {
    var station = this;
    var url = "/favorites";
    var request = $.ajax({
      url: url,
      method: "POST",
      data: JSON.stringify(movieView),
      contentType : "application/json",
      success: function(movieView){
        console.log("success");
      }
      , error: function(jqXHR, textStatus, err){
        console.log(textStatus)
      }
    }).then(
      console.log("Done")
    );
    return request;
  }
}

MovieInfo.all = []
Movie.fetchInfo = function(movieTitle){
  var url = "http://www.omdbapi.com/?t="+movieTitle
  console.log(url);

  var request = $.getJSON(url).then(function(response){
    MovieInfo.all.push(new MovieInfo(response));
    // console.log(MovieInfo.all);
  }).fail(function(response){
    console.log("js failed to load");
  });
  // console.log(request);
  return request;
};

var Favorite = function(movie){
  this.title = movie.title;
  this.year = movie.year;
  this.imdbID = movie.imdbID;
  this.type = movie.type;
  this.poster = movie.poster;
  this.id = movie._id;
};

Favorite.all = []
Favorite.fetch = function(){
  var url = "/favorites"
  console.log(url);

  var request = $.getJSON(url).then(function(response){
    console.log(response.length);
    for(var i = 0; i < response.length; i++){
      Favorite.all.push(new Favorite(response[i].movie));
      console.log(response[i].movie);
    }
    console.log(Favorite.all[0]);
  }).fail(function(response){
    console.log("js failed to load");
  });
  // console.log(request);
  return request;
};


//   var request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.onreadystatechange = function() {
//     if (request.status >= 200 && request.readyState === 4) {
//       // Success!
//       var data = JSON.parse(request.responseText);
//       console.log(data.Search.length);
//       for(var i = 0; i < data.Search.length; i++){
//         Movie.all.push(new Movie(data.Search[i]));
//       }
//       console.log(Movie.all);
//     } else {
//       // We reached our target server, but it returned an error
//     }
//   };
//   request.onerror = function() {
//     // There was a connection error of some sort
//   };
// console.log(request);
//   request.send()
// };
