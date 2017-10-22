var inquirer = require("inquirer");
var coloring = require('coloring');
var chosen_word = require('./chosen_word');
var test = null;


var start_game = function start_game(pcPicked, array, word, tries){
	this.pcPicked = pcPicked; 
	this.array = array;
	this.word = word;
	this.tries = tries;
	console.log('\n'+this.array+'\n');
	this.game = function(){
		inquirer.prompt([
		{
			type: 'input',
			name: 'letter',
			message: 'Choose one letter.'
		}
		]).then(function(user){
				if(user.letter.length > 1){
					console.log('\n****** MUST ENTER SINGLE CHARACTER ******\n');
					test.game();
					return;
				}

				if (user.letter < String.fromCharCode(65) || user.letter > String.fromCharCode(122) && tries > 0 && word < pcPicked){
					// if(tries > 0 && word < pcPicked)
					console.log('\n****** MUST ENTER VALID CHARACTER ******\n');
				}
				else if (user.letter >= String.fromCharCode(65) || user.letter <= String.fromCharCode(122)){
					user.letter = user.letter.toLowerCase();
					var control = 0;

					for (var i = 0; i < pcPicked.length; i++) {
						if(pcPicked.charAt(i) === user.letter ){
							array[i] = user.letter;
							control = 1;
						}
					}
					for (var j = 0; j < array.length; j++) {
						word = array.join('');
						if(word === pcPicked){
							isWinner(pcPicked,true);
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
						isWinner(pcPicked, false);
						return;
					}	
				}
				console.log('\n'+array+'\n');
				test.game();
		});
	}
}
function isWinner(pcPicked, survived){
	if(survived === true){
		var text = "YOU HAVE SURVIVED";
	}
	else if(survived === false){
		var text = "YOU'RE DEAD";
	}
	console.log("\n******  "+ text +"  ******");
	console.log('The word was: '+ coloring.green(pcPicked.toUpperCase()));
	inquirer.prompt([{
		type: 'confirm',
		name: 'confirm',
		message: 'Would you like to play another game?',
		default: true
	}]).then(function(option){
		if(option.confirm === true){
			getStart();
			return true;
		}
		console.log('\n****** SEE YOU LATER BUDDY! ******\n');
		return false;
	})
}
function getStart(){ 
	var words = ["apple","pinapple","mango"];
	var tries = 3;
	var array = [];
	var word = [];
	var control = 0;
	var pcPicked = words[Math.floor(Math.random() * words.length)];
	var str = pcPicked;
	for (var i = 0; i < pcPicked.length; i++) {
	 	array[i] = "_ ";
	}
	// array = array.replace(/', '/g,' ');

	test = new start_game(pcPicked, array, word, tries);
	test.game();
}
	getStart();