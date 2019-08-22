import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Grid from './grid/Grid';

const andysServer = 'http://192.168.43.231:3300/rsbs/v1';
const simonsServer = 'http://192.168.43.207:5000/rsbs/v1';
const baseURL = simonsServer;
class App extends Component {
	constructor(props) {
		super(props);

		this.xCoords = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		this.yCoords = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

		this.state = {
			aShips: [
				['H4', 'H5', 'H6', 'H7', 'H8'],
				['F2', 'G2', 'H2', 'I2'],
				['C5', 'D5', 'E5'],
				['C9', 'D9', 'E9'],
				['B2', 'C2']
			],
			ourships: {
				c: [
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					}
				],
				b: [
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					}
				],
				d: [
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					}
				],
				s: [
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					}
				],
				p: [
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					},
					{
						position: '',
						isHit: ''
					}
				]
			},
			guesses: [],
			theirGuess: [],
			grid1Data: {
				ships: {
					c: {},
					b: {},
					d: {},
					s: {},
					p: {}
				}
			},

			ourGrid: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
				[0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
				[0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
				[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 1, 1, 1, 1, 1, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			],

			theirGrid: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		};
	}

	componentDidMount() {
		this.get();
	}

	get = () => {
		const request = () => {
			axios
				.get(baseURL + '/status/', {
					params: { source: 'red' }
				})
				.then(response => {
					console.log({ response });
					this.status = response.data.status;
					this.cell = response.data.cell;
					if (response.data.status === 'T') {
						// if (!response.data)
						this.response(response.data.cell);
					} else if (response.data.status === 'A') {
						this.makeGuess();
					} else {
						if (response.data.cell) {
							var result = this.translateResponse(response.data.status);
							let newGrid = this.state.theirGrid;

							var iY = response.data.cell.charCodeAt(0) - 65;
							var iX = response.data.cell.substr(1) - 1;

							console.log({ iY });
							console.log({ iX });
							newGrid[iY][iX] = result;
							this.setState({ theirGrid: newGrid });
						}
					}
				});
		};
		setInterval(request, 300);
	};

	makeGuess = () => {
		var coords = this.getGuess(); //this.status === 'H' ? this.getEducatedGuess() : this.getGuess();
		var guessString = coords.y + coords.x;
		console.log({ guessString });

		let newGrid = this.state.theirGrid;

		var iY = guessString.charCodeAt(0) - 65;
		var iX = guessString.substr(1) - 1;

		console.log({ iY });
		console.log({ iX });
		newGrid[iY][iX] = 4;
		this.setState({ theirGrid: newGrid });

		axios
			.post(baseURL + '/target/', { cell: guessString, source: 'red' })
			.then(response => {
				// this.get();
			})
			.catch(error => {
				// this.get();
			});
	};

	// getGuess = () => {
	// 	var x = 0;
	// 	var y = 0;
	// 	var guessString = '';
	// 	if (this.ourShipQty > 0 && this.theirShipQty > 0) {
	// 		if (this.deathPlan > 0) {
	// 			var lastGuess_y = this.guesses[this.guesses.length - 1][0];
	// 			var lastGuess_x = this.guesses[this.guesses.length - 1][1];
	// 			var firstHCS_y = this.firstHitCurShip[0];
	// 			var firstHCS_x = this.firstHitCurShip[1];
	// 			//Make intelligent guess
	// 			if (this.deathPlan === 1) {
	// 				y = firstHCS_y - 1;
	// 				x = firstHCS_x;
	// 			} else if (this.deathPlan === 2) {
	// 				y = firstHCS_y;
	// 				x = firstHCS_x + 1;
	// 			} else if (this.deathPlan === 5) {
	// 				y = lastGuess_y;
	// 				x = lastGuess_x + 1;
	// 			} else if (this.deathPlan === 3) {
	// 				y = firstHCS_y + 1;
	// 				x = firstHCS_x;
	// 			} else if (this.deathPlan === 6) {
	// 				y = lastGuess_y + 1;
	// 				x = lastGuess_x;
	// 			} else if (this.deathPlan === 4) {
	// 				y = firstHCS_y;
	// 				x = firstHCS_x - 1;
	// 			}
	// 		}
	// 		if (x === 0) {
	// 			// Make Sequenced Guess
	// 			do {
	// 				this.last_guess[1] = this.last_guess[1] + 2;
	// 				if (this.last_guess[1] === 11) {
	// 					this.last_guess[1] = 0;
	// 					++this.last_guess[0];
	// 				} else if (this.last_guess[1] === 10) {
	// 					this.last_guess[1] = 1;
	// 					++this.last_guess[0];
	// 				}
	// 				if (this.last_guess[0] > 9) {
	// 					this.last_guess[0] = 0;
	// 					this.last_guess[1] = 0;
	// 				}
	// 			} while (this.theirGrid[this.last_guess[0]][this.last_guess[1]] > 0);
	// 			x = this.last_guess[1];
	// 			y = this.last_guess[0];
	// 		}
	// 		guessString = String.fromCharCode(y + 65) + (x + 1);
	// 		this.theirGrid[y][x] = 2;
	// 		this.guesses.push([y, x]);
	// 	}
	// 	//dispGrid(1);
	// 	return guessString;
	// };

	translateResponse = response => {
		switch (response) {
			case 'P':
				return 4;
			case 'H':
			case 'S':
				return 3;
			case 'M':
				return 2;
			default:
				return 2;
		}
	};

	getGuess = () => {
		var guess, x, y;

		do {
			x = this.xCoords[Math.floor(Math.random() * this.xCoords.length)];
			y = this.yCoords[Math.floor(Math.random() * this.yCoords.length)];

			guess = y + x;
			console.log({ guess });
		} while (this.state.guesses.includes(guess));

		this.setState(prevState => {
			prevState.guesses.push(guess);
		});

		return {
			x: x,
			y: y
		};
	};

	getEducatedGuess = () => {
		var iY = this.cell.charCodeAt(0) - 65;
		var iX = this.cell.substr(1) - 1;
	};

	response = cPos => {
		let cRet = 'M';
		var iShip = -1;
		var iPart = -1;
		var lGood = false;
		this.setState(prevState => {
			prevState.theirGuess.push(cPos);
		});
		this.state.aShips.forEach(aRow => {
			++iShip;
			iPart = -1;
			lGood = false;
			aRow.forEach(cPart => {
				++iPart;
				if (cPos === cPart) {
					cRet = 'H';
					let newAShips = this.state.aShips;
					newAShips[iShip][iPart] = 'X' + cPos;
					this.setState({ aShips: newAShips });
				} else if (this.state.aShips[iShip][iPart].substr(0, 1) !== 'X') {
					lGood = true;
				}
			});
			if (cRet === 'H' && !lGood) {
				cRet = 'S';
			}
		});
		this.setState({ ourGrid: this.ourState() });
		axios
			.post(baseURL + '/status/', { status: cRet, cell: cPos, source: 'red' })
			.then(response => {
				// status?
				// this.get();
			});
	};

	ourState = () => {
		var ourGrid = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
		this.state.theirGuess.forEach(cGuess => {
			var iY = cGuess.charCodeAt(0) - 65;
			var iX = cGuess.substr(1) - 1;
			ourGrid[iY][iX] = 2;
		});

		this.state.aShips.forEach(aRow => {
			aRow.forEach(cPart => {
				if (cPart.substr(0, 1) == 'X') {
					var iY = cPart.charCodeAt(1) - 65;
					var iX = cPart.substr(2) - 1;
					console.log(cPart, iX, iY);
					ourGrid[iY][iX] = 3;
				} else {
					var iY = cPart.charCodeAt(0) - 65;
					var iX = cPart.substr(1) - 1;
					console.log(cPart, iX, iY);
					ourGrid[iY][iX] = 1;
				}
			});
		});
		return ourGrid;
	};

	render() {
		return (
			<div className='App'>
				<button
					style={{
						marginTop: '50px',
						width: '300px',
						height: '80px',
						backgroundColour: 'green',
						borderRadius: '25px'
					}}
					onClick={() => this.makeGuess()}
				>
					GO!
				</button>
				<div style={{ display: 'flex', width: '100vw', justifyContent: 'center' }}>
					<Grid colour='red' data={this.state.ourGrid} />
					<Grid colour='blue' data={this.state.theirGrid} />
				</div>
			</div>
		);
	}
}

export default App;
