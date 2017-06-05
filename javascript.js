var topics = ["happy", "sad", "laughing", "angry", "dumb", "confused", "annoyed", "tired", "finished", ]
var apiKey = "dc6zaTOxFJmzC"
var num;
var search;
var animate;
var still;
var rating = "pg"



$("#rating_slider").slider();
$("#rating_slider").on("slide", function(slideEvt) {
    ratingOption = ["y", "g", "pg", "pg-13", "r"];
    var n = slideEvt.value - 1;
    $("#RatingSliderVal").text(ratingOption[n]);
    rating = $("#RatingSliderVal").text()
});

$("#gif_slider").slider();
$("#gif_slider").on("slide", function(slideEvt) {
    $("#GifSliderVal").text(slideEvt.value)
	num = slideEvt.value;
});

$("#GifSliderVal").text($("#GifCurrentSliderValLabel").attr("data-slider-value"))

$("#add-gif").on("click", function(event) {
    event.preventDefault()
    var newTopic = $("#gif-input").val();
    topics.push(newTopic);
    populateButtons();
})

function populateButtons() {
    $("#buttons").empty()
    for (var i = 0; i < topics.length; i++) {
        var $buttons = $('<button>')
        $($buttons).text(topics[i])
        $($buttons).addClass('btn btn-primary')
        $("#buttons").append($buttons)
    }
}
populateButtons()


$("#buttons").on("click", "button", function() {
	event.preventDefault()
    search = ($(this)[0].innerHTML)
    console.log(search)
    console.log(rating)


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&rating=" + rating + "&api_key=" + apiKey + "&limit=" + num;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        $("#gifs").empty()
		console.log(response.data)

        var gifObject = []

        for (var i = 0; i < response.data.length; i++) {
			var gifImage = $("<img>")


			gifImage.attr("data-still", response.data[i].images.fixed_height_still.url)
			gifImage.attr("data-animate", response.data[i].images.fixed_height.url)


			gifObject[i] = {
				still: response.data[i].images.fixed_height_still.url,
				animate: response.data[i].images.fixed_height.url,
			}

			gifImage.attr("src", gifObject[i].still)
			$("#gifs").append(gifImage)

        }

        console.log(gifObject[1])




        // console.log(response.data)
        console.log(queryURL)
    })
	var check = true
	$(document).on("click", "img", function() {
		event.preventDefault()
		// console.log($(this).attr("data-still"))
		if (check) {
			// console.log("yes")
			// console.log(num)
			$(this).attr("src", $(this).attr("data-animate"))
			check = false

		} else {
			// console.log(false)
			$(this).attr("src", $(this).attr("data-still"))
			check = true
		}
	})


});
