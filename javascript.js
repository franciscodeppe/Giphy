var topics = ["happy", "sad", "laughing", "angry", "dumb", "confused", "annoyed", "tired", "finished"]
var apiKey = "dc6zaTOxFJmzC"
var num;
var search;
var animate;
var still;
var rating = "pg"



$("#rating_slider").slider();
$("#rating_slider").on("slide", function(slideEvt) {
  var ratings = ["y", "g", "pg", "pg-13", "r"];
  var n = slideEvt.value - 1;
  $("#RatingSliderVal").text(ratings[n]);
  rating = $("#RatingSliderVal").text()
});

$("#gif_slider").slider();
$("#gif_slider").on("slide", function(slideEvt) {
  $("#GifSliderVal").text(slideEvt.value)

});

$("#add-gif").on("click", function() {
  topics.push($("add-gif").val())
  populateButtons()
})


function populateButtons() {
  for (var i = 0; i < topics.length; i++) {
    var $buttons = $('<button>')
    $($buttons).text(topics[i])
    $($buttons).addClass('btn btn-primary')
    $("#buttons").append($buttons)
  }
}
populateButtons()

$("#buttons").on("click", "button", function() {

  search = ($(this)[0].innerHTML)
  console.log(search)
  console.log(rating)


  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&rating=" + rating + "&api_key=" + apiKey + "&limit=" + num;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    $("#gifs").empty()

    var gifDiv = $("<div>");


    for (var i = 0; i < response.data.length; i++) {
      still = response.data[i].images.fixed_height_still.url;
      animate = response.data[i].images.fixed_height.url;
      var gifImage = $("<img>");
      $(gifImage).attr("src", still)
      $(gifDiv).append(gifImage);
      $(document).on("click", "img", function() {
        if (gifImage.attr("src") === still) {
          $(this).attr("src", animate)
        } else {
          $(this).attr("src", still)
        }
      })
    }

    $("#gifs").append(gifDiv)

    console.log(response.data)
    console.log(queryURL)
  })

  $("#buttons").empty()
  populateButtons()
});
