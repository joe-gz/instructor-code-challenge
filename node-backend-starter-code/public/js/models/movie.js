var Movie = function(info){
  this.title = info.Title;
  this.year = info.Year;
  this.imdbID = info.imdbID;
  this.type = info.Type;
  this.poster = info.Poster;
  this.id = info._id;
};

Movie.all = []
Movie.fetch = function(){
  // var color = $(".dropdown-menu option:selected").val();
  var url = "/movies"
  console.log(url);
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json"
  }).done ( function(response){
    console.log(response.Search.length);
    for(var i = 0; i < response.Search.length; i++){
      $('body').append("<p>"+response.Search[i].Title+"</p>")
    }
  }).fail ( function (){
    console.log("Failure");
  }).always( function(){
    console.log("Something's happening");
  })
};
