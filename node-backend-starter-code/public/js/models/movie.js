Movie.all = []
Movie.fetch = function(){
  var color = $(".selectpicker option:selected").val();
  console.log(color)
  var url = "/movies"
  var request = $.getJSON(url).then(function(response){
    for(var i = 0; i < response.length; i++){
      $('body').append("<p>"+response[i]+"</p");
    }
  }).fail(function(response){
    console.log("js failed to load");
  });
  return request;
};
