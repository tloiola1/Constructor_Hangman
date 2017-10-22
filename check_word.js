var fs = require('fs');
var chosen_word = require('./chosen_word');

var check_word = function(letter){
	fs.appendFile('user_letters.txt', letter, function(err){
		if(err){
			return err;
		}
		console.log('check_word: '+letter);
	})
}

module.exports = check_word;