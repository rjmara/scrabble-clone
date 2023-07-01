// edited version of Jesse M. Heines's associative array
var ScrabbleTiles = [
    { "letter": "A", "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  },
    { "letter": "B", "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "C", "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "D", "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  },
    { "letter": "E", "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 },
    { "letter": "F", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "G", "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  },
    { "letter": "H", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "I", "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  },
    { "letter": "J", "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  },
    { "letter": "K", "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  },
    { "letter": "L", "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  },
    { "letter": "M", "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "N", "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  },
    { "letter": "O", "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  },
    { "letter": "P", "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "Q", "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  },
    { "letter": "R", "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  },
    { "letter": "S", "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  },
    { "letter": "T", "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  },
    { "letter": "U", "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  },
    { "letter": "V", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "W", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "X", "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  },
    { "letter": "Y", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
    { "letter": "Z", "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  },
    { "letter": "Blank", "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  }
];

// is called on start and on next round
startFunction = () => {
    $( ".draggable" ).draggable({
        snap: ".dropArea",
        snapTolerance: 60,
        snapMode: "inner",
        revert: "invalid"
    });
    $( ".droppable" ).droppable({
        accept: ".draggable",
        tolerance: "pointer",
        drop: function( event, ui ) {
            let droppedElementClasses = ui.draggable.attr("class");
            let thisDropArea = $(this).attr("class");
            let letterClass = droppedElementClasses.split(" ")[0];
            let dropAreaClass = thisDropArea.split(" ")[0];

            let scoreSpan = $("#score");
            let letterValue;
            for (let i = 0; i < 27; i++) {
                if(ScrabbleTiles[i]["letter"] == letterClass) {
                    letterValue = ScrabbleTiles[i]["value"];
                }
            }

            if (dropAreaClass == 6 || dropAreaClass == 8 || dropAreaClass == 2 || dropAreaClass == 12) {
                scoreSpan.text(parseInt(scoreSpan.text()) + (letterValue * 2));
            } else {
                scoreSpan.text(parseInt(scoreSpan.text()) + letterValue);
            }

            ui.draggable.draggable("disable");
            $(this).droppable("disable");
        }
    });
}

$(document).ready( startFunction );

// creates the board
var createBoard = () => {
    let boardWrapper = $("#boardWrapper");
    for (let i = 1; i <= 14; i++) {
        let newDroppable = $("<div></div>");
        newDroppable.addClass(i.toString()); 
        newDroppable.addClass("droppable");
        newDroppable.addClass("dropArea");
        //newDroppable.addClass("ui-widget-header");
        newDroppable.css({"left": i*75 + 5});
        boardWrapper.append(newDroppable);
    }
};

// function that gets a random tile
let selectedTile;
let totalTiles = 100; 
var randomizeLetter = () => {
    let randomNum = Math.floor(Math.random() * 27);
    if (ScrabbleTiles[randomNum]["number-remaining"] == 0) {
        randomNum = Math.floor(Math.random() * 27);
    }
    totalTiles--;
    selectedTile = ScrabbleTiles[randomNum];
    ScrabbleTiles[randomNum]["number-remaining"]--;
}

// creates tiles using randomization
var spawnTiles = () => {
    let imgUrl; 
    let tileHolderWrapper = $("#tileHolderWrapper");
    for (let i = 1; i <= 7; i++) {
        if (totalTiles <= 0) {
            break;
        }
        randomizeLetter();
        imgUrl = "./assets/scrabble_tiles/Scrabble_Tile_" + selectedTile["letter"] + ".jpg";
        let newTile = $("<div></div>");
        newTile.addClass(selectedTile["letter"]);
        newTile.addClass("tiles");
        newTile.addClass("draggable");
        newTile.css("background", 'url(' + imgUrl + ')');
        newTile.css("background-size", "cover");
        newTile.css({"left": i*75});
        tileHolderWrapper.append(newTile);
    }
}

// behavior for next button
var nextRoundButton = () => {
    $(".draggable").remove();
    spawnTiles();
    startFunction();
    $( ".draggable" ).draggable( "enable" );
    $( ".droppable" ).droppable( "enable" );
}

createBoard();
spawnTiles();
randomizeLetter();


console.log(totalTiles);
