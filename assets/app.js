var topics = ["Luke Skywalker", 
"Rey (Star Wars)",
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

buttonCreate();

$("#submit").on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();
    var submitValue = $("#text-submit").val().trim();
    topics.push(submitValue);
    buttonCreate();
  });


function buttonCreate () {
        $("#button-space").html("");
    for(var i = 0; i < topics.length; i++){
        var buttons = $("#button-space");
        buttons = buttons.append($("<button id = val-" + i + ">"));
        var addToButtons = $("#val-" + i);
        addToButtons.append(topics[i]);
    }
};
