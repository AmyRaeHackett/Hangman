"use strict";

$("img").hide();


// global variables
var words = ["zebra", "tiger", "horse", "lion", "monkey", "walrus", "seal", "penguin", "dolphin", "shark"];
var word = words[Math.floor(Math.random() * words.length)];
var userArray = [];
var livesLeft = 10;
var remainingLetters = word.length;
var myImage =  document.getElementById("mainImage");
var images = ["hangman1.png", "hangman2.png", "hangman3.png", "hangman4.png", "hangman5.png", "hangman6.png", "hangman7.png",
    "hangman8.png", "hangman9.png", "hangman10.png"];
var imageIndex = 0;
var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alphabet2 = alphabet.split("");
console.log(alphabet2);
var usedLetters = [];

//assign _ _ _ _ _ array
for (var i = 0; i < word.length; i++) {
    userArray[i] = "_";
}

//printing the _ _ _ _ _ array
function arrayChange() {
    if (remainingLetters > 0) {
        $("#user").text(userArray.join(" "));
    }
}
arrayChange();

//lives left
$("#guessesleft").text(`You have ${livesLeft} lives left.`);

//function for changing the image every time an answer is wrong
function changeImage() {
    $("img").show();
    myImage.setAttribute("src", images[imageIndex]);
    imageIndex++;

}

//hint button
$("#hintButton").on("click", function () {
    $("#hintButton").hide();
    $("#hintMessage").text("The category is animals.");
});

//runs when hit guess button
$("#submitButton").on("click", function () {

    //getting user input from form (even if user enters capital letter)
    var textBox = $("#textBox").val().toLowerCase();


//if guess correct letter, show letter in array
    for (var j = 0; j < word.length; j++) {
        if (textBox === word[j]) {
            userArray[j] = textBox;
            arrayChange();
        }

        //turn array into string
        var arrayJoin = userArray.join("");

        //if user wins
        if (arrayJoin === word) {
            $("#message").text(`Woo, you got it! The word is ${word}. Refresh the page for another go!`);
            $("#hintMessage").hide();
            $("#hintButton").hide();

        }
        //if user loses
        if (livesLeft === 1) {
            $("#message").text(`Err... you died. The word was ${word}. Refresh the page for another go!`);
            $("#hintMessage").hide();
            $("#hintButton").hide();
        }
    }

    for (var x = 0; x < alphabet2.length; x++) {
        //print out all used letters
        if (textBox === alphabet2[x]) {
            usedLetters.push(textBox);
            $("#usedLetters").text(usedLetters.join(" "))
        }

        //when user gets letter wrong, image will change, and lives will decrement
        if ((word.indexOf(textBox) === -1) && (livesLeft>0) && (textBox === alphabet2[x])) {
            livesLeft--;
            $("#guessesleft").text(`You have ${livesLeft} lives left.`);
            changeImage();
        }


}});