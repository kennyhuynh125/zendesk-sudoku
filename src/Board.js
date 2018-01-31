import React from 'react';
import './Board.css';
class Board extends React.Component {
	constructor(props) {
		super(props);
		//current state of board is just all 0's.
		this.state = {
			board: [[],[],[],[],[],[],[],[],[]],
			hasStarted: false,
		}
		this.check = this.check.bind(this);
		this.checkBoard = this.checkBoard.bind(this);
		this.checkColumns = this.checkColumns.bind(this);
		this.checkCurrentBoard = this.checkCurrentBoard.bind(this);
		this.checkRows = this.checkRows.bind(this);
		this.displayBoard = this.displayBoard.bind(this);
		this.displayButtons = this.displayButtons.bind(this);
		this.displayRow = this.displayRow.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.restart = this.restart.bind(this);
		this.setupBoard = this.setupBoard.bind(this);
		this.solve = this.solve.bind(this);
	}

	//setup the board with initial squares filled, this is given by the example on the email.
	setupBoard() {
		this.setState({
			board:  [
			['5','3',0,0,'7',0,0,0,0],
			['6',0,0,'1','9','5',0,0,0],
			[0,'9','8',0,0,0,0,'6',0],
			['8',0,0,0,'6',0,0,0,'3'],
			['4',0,0,'8',0,'3',0,0,'1'],
			['7',0,0,0,'2',0,0,0,'6'],
			[0,'6',0,0,0,0,'2','8',0],
			[0,0,0,'4','1','9',0,0,'5'],
			[0,0,0,0,'8',0,0,'7','9',]],
			hasStarted: true
		});
	}

	//populates the entire board with the correct solution.
	solve() {		
		this.setState({
			board:  [
			['5','3','4','6','7','8','9','1','2'],
			['6','7','2','1','9','5','3','4','8'],
			['1','9','8','3','4','2','5','6','7'],
			['8','5','9','7','6','1','4','2','3'],
			['4','2','6','8','5','3','7','9','1'],
			['7','1','3','9','2','4','8','5','6'],
			['9','6','1','5','3','7','2','8','4'],
			['2','8','7','4','1','9','6','3','5'],
			['3','4','5','2','8','6','1','7','9',]],
			isSolved: true
		});
	}

	//if user clicks restart, board should go back to state when it was setup
	restart() {
		this.setupBoard();
	}

	//checks to see if the board is successfully completed
	checkBoard() {
		for( let i = 0; i < 9; i++) {
			if (this.state.board[i].includes(0)) {
				alert("Board is not completed yet!");
				return;
			}
		}
		this.check() ? (alert("Congratulations! You have completed the board."), this.setState({isSolved: true})) : alert("Board is invalid");
	}

	checkCurrentBoard() {
		this.check() ? alert("Current Board is valid.") : alert("Current Board is invalid.");
	}
	//check to see if the current status of the board is valid or not.
	check() {
		let correctRows = this.checkRows();
		let correctCols = this.checkColumns();
		let correctSquares = [];
		for (let i = 0; i < 9; i+=3) {
			correctSquares.push(this.checkSquares(i,0));
			correctSquares.push(this.checkSquares(i,3));
			correctSquares.push(this.checkSquares(i,6));
		}
		return !correctRows || !correctCols || correctSquares.includes(false) ? false : true;
	}

	//checks each of the rows in the board and determines if there is an invalid row or not.
	checkRows() {
		let digitCount = {};
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				let currentValue = parseInt(this.state.board[i][j], 10);
				if (currentValue === 0) {
					continue;
				}
				if (currentValue in digitCount) {
					digitCount[currentValue]++;
					if (digitCount[currentValue] > 1) {
						return false;
					}
				} else {
					digitCount[currentValue] = 1;
				}
			}
			digitCount = {};
		}
		return true;
	}

	//checks each of the columns in the board and determines if there is an invalid column or not.
	checkColumns() {
		let digitCount = {};
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				let currentValue = parseInt(this.state.board[j][i], 10);
				if (currentValue === 0) {
					continue;
				}
				if (currentValue in digitCount) {
					digitCount[currentValue]++;
					if (digitCount[currentValue] > 1) {
						return false;
					}
				} else {
					digitCount[currentValue] = 1;
				}
			}
			digitCount = {};
		}
		return true;
	}

	//checks each 3x3 square and determines if it is valid or not.
	checkSquares(rowNum, colNum) {
		let digitCount = {};
		for (let i = rowNum; i < rowNum + 3; i++) {
			for (let j = colNum; j < colNum + 3; j++) {
				let currentValue = parseInt(this.state.board[i][j], 10);
				if (currentValue === 0) {
					continue;
				}
				if (currentValue in digitCount) {
					digitCount[currentValue]++;
					if (digitCount[currentValue] > 1) {
						return false;
					}
				} else {
					digitCount[currentValue] = 1;
				}
			}
		}
		return true;
	}

	//used to track down when one of the square's value is changed. If it is changed, the array gets updated with the new value.
	handleOnChange(event) {
		let value = parseInt(event.target.value, 10);
		let currentBoard = this.state.board;
		let gridValues = event.target.name;
		let row = gridValues.split(",")[0];
		let col = gridValues.split(",")[1];
		currentBoard[row][col] = value;
		this.setState({
			board: currentBoard
		});
		event.preventDefault();
	}

	//displays the current board
	displayBoard() {
		let board = [];
		//iterate 9 times to get the rows and create the board.
		for (let i = 0; i < 9; i++) {
			board.push(	
				<div className="flexbox">
					{this.displayRow(i)}
				</div>
				);
		}
		return board;
	}

	//display individual rows for the board
	displayRow(rowNum) {
		let squares = [];
		for (let i = 0; i < 9; i++) {
			//if the value at the current grid location is 0, just leave the input value blank.
			if (this.state.board[rowNum][i] === 0) {
				squares.push(<input type="number" min="0" max="9" className='square' value="" onChange={this.handleOnChange} name={"" + rowNum + "," + i}/>);
			} else if (typeof this.state.board[rowNum][i] === 'string') {
				squares.push(<input type="number" min="0" max="9" className='square' value={this.state.board[rowNum][i]} readonly="true" />);
			}
			else {
				squares.push(<input type="number" min="0" max="9" className='square' value={this.state.board[rowNum][i]} onChange={this.handleOnChange} name={"" + rowNum + "," + i} />);
			}
		}
		return squares;
	}

	//used in determining which buttons should be displayed in the UI.
	displayButtons() {
		let buttons;
		if (!this.state.hasStarted) {
			buttons = (
				<div className="buttons">
					<button onClick={this.setupBoard}>Start</button>
				</div>
			);
		} else {
			buttons = (
				<div>
					<div className="buttons">
						<button onClick={this.checkCurrentBoard}>Check Current Board</button>
						<button onClick={this.checkBoard}>Check Whole Board</button>
					</div>
					<div className="buttons">
						<button onClick={this.restart}>Restart</button>
						<button onClick={this.solve}>Solve Board</button>
					</div>
				</div>
			);
		}
		return buttons;
	}

	render() {
		return (
			<div>
				<div className="header">
					<h1>Zendoku</h1>
					<p>Sudoku Challenge for Zendesk</p>
				</div>
				{this.displayButtons()}
				<div className="board">
					{this.displayBoard()}
				</div>
			</div>
		);
	}
}

export default Board;