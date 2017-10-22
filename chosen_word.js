var fs = require("fs");
var word = '';
var chosen_word = function(){
	this.word = word;
	this.getWord = function() {
	    fs.readFile("my_secret_words.txt", "utf8", function(error, data) {
	      var dataArr = data.split(", ");
	      theWord = dataArr[Math.floor(Math.random()*dataArr.length)];
	    });
  	};
};
module.exports = chosen_word;

// function getStart(){ 
// 	var words = ["apple","pinapple","mango"];
// 	var tries = 3;
// 	var array = [];
// 	var word = [];
// 	var control = 0;
// 	var pcPicked = words[Math.floor(Math.random() * words.length)];
// 	var str = pcPicked;
// 	for (var i = 0; i < pcPicked.length; i++) {
// 	 	array[i] = "_ ";
// 	}
// 	// array = array.replace(/', '/g,' ');

// 	test = new start_game(pcPicked, array, word, tries);
// 	test.game();
// }