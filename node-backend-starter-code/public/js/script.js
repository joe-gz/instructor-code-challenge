document.addEventListener("DOMContentLoaded", function() {
  // code...
  document.getElementById("submit").addEventListener("click", function(evt){
    evt.preventDefault();
    console.log("starts?");
    var keyword = document.getElementById("movieSearch").value;
    console.log(keyword);

    Movie.fetch(keyword).then(function(movies){
      Movie.all.forEach(function(movie){
        var view = new MovieView(movie)
        view.render();
        //
        // Movie.fetch(keyword);
      });
    });
  });
});
