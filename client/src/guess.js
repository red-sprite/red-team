


var guesser = {

	guesses: [],

	theirGrid: {
		A: ["", "", "", "", "", "", "", "", "", ""],
		B: ["", "", "", "", "", "", "", "", "", ""],
		C: ["", "", "", "", "", "", "", "", "", ""],
		D: ["", "", "", "", "", "", "", "", "", ""],
		E: ["", "", "", "", "", "", "", "", "", ""],
		F: ["", "", "", "", "", "", "", "", "", ""],
		G: ["", "", "", "", "", "", "", "", "", ""],
		H: ["", "", "", "", "", "", "", "", "", ""],
		I: ["", "", "", "", "", "", "", "", "", ""],
		J: ["", "", "", "", "", "", "", "", "", ""],
	},

	translateResponse: function(response) {
		// return H or M - Hit or Miss
		return "M";
	},

	makeGuess: function () {
		var coords = this.getGuess();

		var guessString = coords[0] + coords[1];
		// Call the server and get it's response

		var result = this.translateResponse("");

		this.theirGrid[coords[0]][coords[1] - 1] = result;
	},

	getGuess: function () {
		var xCoords = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		var yCoords = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
		var guess;

		do {
			var x = xCoords[Math.floor(Math.random() * xCoords.length)];
			var y = yCoords[Math.floor(Math.random() * yCoords.length)];

			guess = x + y;
		} while (this.guesses.indexOf(guess) === -1);

		this.guesses.push(guess);

		return [x, y];
	}
};
