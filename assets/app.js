$(document).ready(function () {
    
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

    //When submit button is clicked, push the value of the input into the topics array
    //which in turn, run the buttonCreate function, deleting all previous buttons and rewriting
    //them onto the page
    $("#submit").on("click", function (event) {
        // Prevents the form from submitting!
        event.preventDefault();
        var submitValue = $("#text-submit").val().trim();
        topics.push(submitValue);
        $('#text-submit').val("");
        buttonCreate();
    });

    //Dynamically creates buttons from the topics array
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
    
    //Runs our button create function to have them on the page during startup
    buttonCreate();

    //When a button is clicked, insert 10 relevant gifs to the button content
    //on the page
    $("button").on("click", function (event) {
        event.preventDefault();
        $("#press-button").css("visibility","hidden");
        var buttonClick = $(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            buttonClick + "&api_key=vAPghN7nJYPVX5hhXhA9GMpovNI2g7Mm&limit=10";

        //Calls our giphy API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        //Responds with adding 'still' gifs to the page and giving them unique
        // element identifers to reference later in jquery and CSS
            .then(function (response) {
                var results = response.data;
                console.log(response.data);
                for (var j = 0; j < results.length; j++) {

                    var gifDiv = $("<div class='gifs-in-here'>");
                    var rating = results[j].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var starWarsImage = $("<img>");
                    starWarsImage.addClass("gif");
                    starWarsImage.attr("src", results[j].images.fixed_height_still.url);
                    starWarsImage.attr("data-state", "still");
                    starWarsImage.attr("data-animate", results[j].images.fixed_height.url);
                    starWarsImage.attr("data-still", results[j].images.fixed_height_still.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(starWarsImage);

                    $("#gif-dump").prepend(gifDiv);

                }
            });

    });

    //When clicking on a gif, animate it
    $(document).on("click", ".gif", function () {
        var gifState = $(this).attr("data-state");
        console.log(gifState);
        if (gifState == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (gifState == "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }


    });


});