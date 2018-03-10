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

function buttonCreate () {
    for(var i = 0; i < topics.length; i++){
        var buttons = $("#button-space");
        buttons = buttons.append($("<button id = val-" + i + ">"));
        var newButtons = $("#val-" + i);
        $("#val-" + i).text(topics[i]);
    }
}

buttonCreate();