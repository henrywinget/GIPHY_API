
//Creates initial strings to put in our array of buttons
var topics = ["Luke Skywalker",
    "Rey",
    "Obi-Wan Kenobi",
    "Qui-Gon Jinn",
    "Princess Leia",
    "Padme Amidala",
    "Han Solo",
    "Poe Dameron",
    "Darth Vader",
    "Kylo Ren",
    "Ewoks",
    "Porgs"];

var emptyBox = "";

$("#submit").on("click", function (event) {
    // prevent form from submitting
    event.preventDefault();
    var submitValue = $("#text-submit").val().trim();
    topics.push(submitValue);
    $('#text-submit').val("");
    buttonCreate();
});

//Dynamically creates buttons
function buttonCreate() {
    $("#button-space").empty();
    for (var i = 0; i < topics.length; i++) {
        var buttons = $("#button-space");
        var newString = topics[i].replace(/\s/g, '-');
        buttons = buttons.append($("<button id =" + newString + ">"));
        var addToButtons = $("#" + newString);
        addToButtons.addClass("button-click");
        addToButtons.append(topics[i]);
    }
};

buttonCreate();

$("button").on("click", function (event) {
    event.preventDefault();
    var buttonClick = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        buttonClick + "&api_key=vAPghN7nJYPVX5hhXhA9GMpovNI2g7Mm&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response.data);
            for (var j = 0; j < results.length; j++) {

                var gifDiv = $("<div class='gif'>");
                var rating = results[j].rating;
                var p = $("<p>").text("Rating: " + rating);
                var starWarsImage = $("<img>");
                starWarsImage.attr("src", results[j].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(starWarsImage);

                $("#gif-dump").prepend(gifDiv);

            }
        });

});

