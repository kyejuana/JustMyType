$(document).ready(function () {
    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];
    let sentenceIndex = 0; // which sentence the user is on at any time.
    let letterIndex = 0; // current letter in current sentence
    let numOfMistakes = 0;
    let highlighterPosition = 15;
    let startTime;

    $("#keyboard-upper-container").toggle();
    $("#sentence").text(sentences[sentenceIndex]);
    $("#target-letter").text(sentences[sentenceIndex][letterIndex]);

    $(document).one("keypress", function () {
        startTime = Date.now();
    });

    $(document).keydown(function (e) {
        // Show upper keyboard and hide lower when shift is pressed
        if (e.key == "Shift") {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        } else {
            // highlight pressed key
            const key = e.key.charCodeAt(0);
            $("#" + key).css("background-color", "yellow");

            // check if user typed correct character and append symbol if yes or no.
            if (e.key == sentences[sentenceIndex][letterIndex]) {
                $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>");
            } else {
                $("#feedback").append("<span class='glyphicon glyphicon-remove'></span>");

                numOfMistakes++
            }

            $("#yellow-block").css("left", (highlighterPosition += 15) + 'px');

            // increment letterIndex by one on move and append next letter
            letterIndex++
            if (sentences[sentenceIndex][letterIndex] == " ") {
                $("#target-letter").text("space");
            } else {
                $("#target-letter").text(sentences[sentenceIndex][letterIndex]);
            }

            // check if sentence is complete.
            if (sentences[sentenceIndex].length == letterIndex) {
                sentenceIndex++;
                letterIndex = 0;
                highlighterPosition = 15;

                if (sentenceIndex == sentences.length) {
                    let endTime = Date.now();
                    let gameTimeinMS = endTime - startTime;
                    let minutes = gameTimeinMS / 60000
                    alert(calcWPM(minutes, numOfMistakes));

                    setTimeout(function () {
                        const playAgain = confirm("Play again?");

                        if (playAgain) {
                            window.location.reload();
                        }
                    }, 1000);
                }

                $("#yellow-block").css("left", highlighterPosition + 'px');

                $("#target-letter").text(sentences[sentenceIndex][letterIndex]);

                $("#feedback").empty();

                $("#sentence").text(sentences[sentenceIndex]);
            }
        }
    });

    $(document).keyup(function (e) {
        // Show lower keyboard and hide upper when shift is released
        if (e.key == "Shift") {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        } else {
            // highlight pressed key
            const key = e.key.charCodeAt(0);
            $("#" + key).css("background-color", "#f5f5f5");
        }
    });
});

function calcWPM(minutes, numOfMistakes) {
    return Math.round(54 / minutes - 2 * numOfMistakes)
}