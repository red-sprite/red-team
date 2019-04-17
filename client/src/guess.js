


var guesser = {

	guesses: [],

	xCoords: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

	yCoords: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],

	theirGrid: [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
	],

	translateResponse: function(response) {
		// return 3 - Hit, 2 - Miss
		return 3;
	},

	makeGuess: function () {
		var coords = this.getGuess();

		var guessString = coords.y + coords.x;
		// Call the server and get it's response

		var result = this.translateResponse("");

		this.theirGrid[this.yCoords.indexOf(coords.y)][this.xCoords.indexOf(coords.x)] = result;
	},

	getGuess: function () {
		var guess;

		do {
			var x = this.xCoords[Math.floor(Math.random() * this.xCoords.length)];
			var y = this.yCoords[Math.floor(Math.random() * this.yCoords.length)];

			guess = x + y;
		} while (this.guesses.indexOf(guess) === -1);

		this.guesses.push(guess);

		return {
			x: x,
			y: y
		};
	}
};
