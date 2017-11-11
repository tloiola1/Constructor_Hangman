var fs = require('fs');
var game = require('./game');


function main_menu(){
	var word;
	var array = [];
	var tries = 3;
    fs.readFile("my_secret_words.txt", "utf8", function(error, data) {
		var dataArr = data.split(", ");
		word = dataArr[Math.floor(Math.random()*dataArr.length)];
		for (var i = 0; i < word.length; i++) {
			if(word.charAt(i) === ' '){
				array[i] = ' ';
			}
			else{
		 	array[i] = "_ ";
		 	}
		}
		var start = new game(word, array, tries, main_menu);
		start.gameStart();
    });
}
module.exports = main_menu;
main_menu();