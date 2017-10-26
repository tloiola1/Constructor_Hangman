var inquirer = require("inquirer");
var coloring = require('coloring');
var main_menu = require('./main_menu')
var fs = require('fs');

var game = function game(word, array, tries, callback){
	this.word = word;
	this.array = array;
	this.tries = tries;
	console.log(word);
	console.log('\nThe Word is: '+this.array);
	console.log('You have: '+tries+' tries.');
	this.gameStart = function gameStart(){
		inquirer.prompt([
		{
			type: 'input',
			name: 'letter',
			message: 'Choose one letter.'
		}
		]).then(function(user){
				if(user.letter.length > 1){
					console.log('\n****** MUST ENTER SINGLE CHARACTER ******\n');
					gameStart();
					return;
				}

				if (user.letter < String.fromCharCode(65) || user.letter > String.fromCharCode(122) && tries > 0 && word < word){
					console.log('\n****** MUST ENTER VALID CHARACTER ******\n');
				}
				else if (user.letter >= String.fromCharCode(65) || user.letter <= String.fromCharCode(122)){
					user.letter = user.letter.toLowerCase();
					var control = 0;
					var correct;

					for (var i = 0; i < word.length; i++) {
						if(word.charAt(i) === user.letter ){
							array[i] = user.letter;
							control = 1;
							correct = true;
						}
					}
					if(correct === true){
							console.log(coloring.green('\nCORRECT!'));
							correct = false;
					}
					for (var j = 0; j < array.length; j++) {
						var newWord = array.join('');
						if(newWord === word){
							isWinner(word, true,callback);
							return true;
						}
					}
					if(control === 0){
						tries--;
						if(tries > 0){
							console.log(coloring.red('\nINCORRECT!\nYou have '+ tries + ' tries left.'));
						}
					}
					if (control === 0 && tries === 0) {
						isWinner(word, false, callback);
						return false;
					}	
				}
				console.log('\n'+array+'\n');

				gameStart();
		});
	}
}

function isWinner(word, survived, _callback){
		if(survived === true){
			var text = "YOU HAVE SURVIVED";
		}
		else if(survived === false){
			var text = "YOU'RE DEAD";
		}
		console.log("\n******  "+ text +"  ******");
		console.log('The word was: '+ coloring.green(word.toUpperCase()));
		inquirer.prompt([{
			type: 'confirm',
			name: 'confirm',
			message: 'Would you like to play another game?',
			default: true
		}]).then(function(option){
			if(option.confirm === true){
				_callback();
				return true;
			}
			console.log('\n****** SEE YOU LATER BUDDY! ******\n');
			return false;
		});
};


module.exports = game;