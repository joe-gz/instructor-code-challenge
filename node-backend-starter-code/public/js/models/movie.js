var Movie = function(info){
  this.title = info.Title;
  this.year = info.Year;
  this.imdbID = info.imdbID;
  this.type = info.Type;
  this.poster = info.Poster;
  this.id = info._id;
};

Movie.all = []
Movie.fetch = function(keyword){
  // var color = $(".dropdown-menu option:selected").val();
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
