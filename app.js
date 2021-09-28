$(document).ready(function () {
  let upperKeyboard = $("#keyboard-upper-container");
  let lowerKeyboard = $("#keyboard-lower-container");
  let sentenceDisplay = $("#sentence");
  let targetLetter = $("#target-letter")
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];

  let sentenceCtr = 0
  let letterCtr = 0

  //sentences[sentenceCtr] means the current sentence (that user should be typing)
  //sentences[sentenceCtr][letterCtr] means the current letter
  sentenceDisplay.text(sentences[sentenceCtr])

  upperKeyboard.hide();

  $(document).keydown(function (e) {
    if (e.shiftKey === true) {
      lowerKeyboard.hide();
      upperKeyboard.show();
    }

    //checks if the correct key is pressed
    if(e.key===sentences[sentenceCtr][letterCtr]){
        letterCtr++
        targetLetter.empty()
        targetLetter.append(sentences[sentenceCtr][letterCtr])
    }
  });

  $(document).keypress(function (e) {
      //template literal inside of a jQuery selector
     $(`#${e.which}`).css('background-color', 'yellow')
     if (targetLetter===true) {
        $('#spanid').text('✔');
     } else {
        <span class="ui-icon ui-icon-alert"></span>
     }
  })

  $(document).keyup(function (e) {
    let asciiCode = e.key.charCodeAt(0)

    $(`#${asciiCode}`).css('background-color', '#f5f5f5')

    if (e.which === 16) {
      lowerKeyboard.show();
      upperKeyboard.hide();
    }
  });
 
});
