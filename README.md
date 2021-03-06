# Zendesk Sudoku Challenge
The assignment is to create a sudoku puzzle with options such as checking if a move is valid/invalid, checking if the entire board is solved correctly, restarting the board and giving the solution to the current board.


# Live Link
The live link to the project is here:  https://kennyhuynh125.github.io/zendesk-sudoku

# Program Structure
This was built using  the `create-react-app` NPM package. This package helps set up a React app without having to worry about Webpack/Babel configurations.
The structure is as followed:
`public` - Directory containing the HTML file to be shown on the web.
`src` - Directory containing all the JavaScript/CSS files for the program. This is where our program is located in.

This program takes advantage of React's ability to store data in states and ability to create objects in terms of components. In the src folder, you will find two files, Board.js and Board.css.
`Board.js` - This is the file that generates the main page of the program. Everything such as the board and buttons are handled in this file.
`Board.css` - This is the file that creates the CSS to stylize the content being displayed in Board.js.
The other files are used to render the UI to the front-end.

In `Board.js`, we keep track of two states:
- `board` - A 9x9 two dimensional array representation of the sudoku board. This is the variable that keeps track of the values in the board. Before starting, the array is filled with zeroes.
- `hasStarted` - A boolean that keeps track if the player started the game or not yet. This is used for determining what buttons appear on the UI.

For simplicity, there is only one board with a single solution.

Each square in the board is an `<input>` element. To keep track of the row number and column number, the `input` elements have an attribute `name` that has the value `rowNum, colNum`. For example, the top-left square has the location (0,0). So the name of the input would be `0,0`. To access the grid location to modify the `board` state, a `handleOnChange(event)` function is used to  fetch the values from the `name` and `value` attribute from the `input` element. Then the row and column number is extracted and the value in the `board` array is updated.
In order to make the default values uneditable in the UI, they are set as `String` values in the board and are checked. If it is a `String`, the attribute `readonly` is inserted in to the `input` element.

To display the UI, there are three functions:

 - `displayButtons()` - This function displays the buttons depending on whether the user started the game or not. If it did not start, display only the `Start` button. If it did start, display the other buttons.
 - `displayRow(rowNum)` - This function is used in generating the rows of the board. Each row is populated with nine `input` elements. The `rowNum` parameter is used for determining which row number is being generated.
 - `displayBoard()`- This function is used in generating the full board. This calls `displayRow(rowNum)` nine times to display the full board.

There are five buttons:

 - `Start` - Uses the `setupBoard()` function and creates a prefilled sudoku board by populating the `board` state with some values.
 - `Restart` - Uses the `restart()` function that resets the board to the state when the user started.
 - `Solve Board` - Uses the `solve()` function that modifies the `board` state with the correct solution.
 - `Check Current Board` - Uses the `checkCurrentBoard()` function and checks the state of the current board to see whether it is valid or invalid. 
 - `Check Whole Board` - Uses the `checkBoard()` function and checks to see if the board is completed or not. If it is completed, it determines whether the board is valid or invalid.
 
Both `Check Current Board` and `Check Whole Board` uses the `check()` method to determine whether the state of the board is valid or invalid.

To determine if a board is valid or invalid, we check each row, column, and 3x3 square and see if there are any duplicate digits. This was done by creating three helper methods:

 - `checkRows()` - This iterates through the rows of the `board` array.
 - `checkColumns()` This iterates through the columns of the `board` array.
 - `checkSquares(num)`- This iterates through the 3x3 squares of the `board` array. The `num` parameter is used to determine which 3x3 square is being checked.

These 3 methods returns `true` if the check is valid, and `false` if not. All three use a similar approach. A dictionary that allows key-value mapping is used to map the values in the array and how many time it occurs in a certain row, column or square. The value in the `board` array is the key, and the amount of time it occurs is the value. If any value in the dictionary is greater than one, then that indicates an invalid row, column or square.

# Built With
- create-react-app
- React
- JavaScript/JSX
- HTML/CSS

# Author
Kenny Huynh