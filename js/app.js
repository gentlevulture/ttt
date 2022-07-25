/*-------------------------------- Constants --------------------------------*/

// 4) Define the required constants:
// 4.1) Define the 8 possible winning combinations as an array of arrays.
	  // Each array will contain three indexes of the board that make a winner if they hold the same player value.
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    
    /*---------------------------- Variables (state) ----------------------------*/
    
    // Step 1 - Define the required variables used to track the state of the game
    // 1a) Use a variable named `board` to represent the state of the squares on
    //     the board.
    
    // 1b) Use a variable named `turn` to track whose turn it is.
    
    // 1c) Use a variable named `winner` to represent if anyone has won yet, or if
    //     a tie has occurred.
    let board, turn, winner
    
    /*------------------------ Cached Element References ------------------------*/
    
    // Step 2 - Store cached element references
    
    // 2a) In a constant called `squareEls`, store the nine elements 
    //     representing the squares on the page.
    const squareEls = document.querySelectorAll('section > div')
    // 2b) In a constant called `messageEl`, store the element that displays the 
    //     game's status on the page.
    const messageEl = document.querySelector('#message')
    // Step 8 - Create Reset functionality
    // 8a) Add a reset button to the HTML document.
    
    // 8b) Store the new reset button element in a constant named `resetBtnEl`.
    const resetBtn = document.getElementById('reset')
    
    /*----------------------------- Event Listeners -----------------------------*/
    
    // 6b) Attach an event listener to the game board. On the `'click'` event, it 
    //     should call the `handleClick` function you created in 6a.
    squares.forEach((square) => {
      square.addEventListener('click', handleClick)
    })
    
    // 8c) Attach an event listener to the `resetBtnEl`. On the `'click'` event 
    //     it should call the `init` function you created in 3.
    resetBtn.addEventListener('click', init)
    
    /*-------------------------------- Functions --------------------------------*/
    
    // Step 3 - Upon loading, the game state should be initialized, and a function 
    //          should be called to render this game state
    // 3b) Call this `init` function when the app loads.
    init()
    // 3a) Create a function called `init`.
    function init() {
    
      // 3c) Set the `board` variable to an array containing nine `null`s to 
      //    represent empty squares.
      board = [null, null, null, null, null, null, null, null, null]
      
      // 3d) Set the `turn` to `1` - which will represent player X.
      turn = 1
    
      // 3e) Set the `winner` to `null`.
      winner = null
    
      // 3f) Call a function called `render` at the end of the `init` function.
      render()
    }
    
    // Step 4 - The state of the game should be rendered to the user
    
    // 4a) Create a function called `render`.
    
    function render() {
      
      // 4b) Loop over `board` and for each element:
      
      board.forEach((cell, idx) => {
        //  - Style that square however you wish, dependent on the value contained 
        //    in the current cell being iterated over (`-1`, `1`, or `null`).
        let cellColor
        let cellLetter
        if (cell === 1) {
          cellColor = "green"
          cellLetter = 'X'
        } else if (cell === -1) {
          cellColor = "purple"
          cellLetter = 'O'
        } else if (cell === null) {
          cellColor = "white"
          cellLetter = ""
        }
        //  - Use the current index of the iteration to access the corresponding
        //    square in the `squareEls` array.
        squareEls[idx].style.background = cellColor
        squareEls[idx].innerText = cellLetter
      })
    
      // 4c) Render a message based on the current game state:
      if (!winner) {
        //  - If winner has a value of `null` (meaning the game is still in
        //    progress), render whose turn it is.
        messageEl.innerText = `It is ${turn === 1 ? "X" : "O"}'s turn!`
      } else if (winner === "T") {
        //  - If `winner` is equal to `'T'` (tie), render a tie message.
        messageEl.innerText = `Cat's game. 🐱 MEOW!!!!`
      } else {
        //  - Otherwise, render a congratulatory message to the player that has won.
        messageEl.innerText = `Congratulations ${winner === 1 ? "X" : "O"}!!!!!`
      }
    }
    
    // Step 6 - Handle a player clicking a square with a `handleClick` function
    // 6a) Create a function called `handleClick`. It will have an `evt`
    //     parameter.
    function handleClick(evt){
      // 6c) Obtain the index of the square that was clicked by "extracting" the 
      //     index from an `id` assigned to the element in the HTML. Assign this  
      //     to a constant called `sqIdx`.
      let sqIdx = parseInt(evt.target.id.replace('sq', ''))
      // 6d) If the `board` has a value at the `sqIdx`, immediately `return`  
      //     because that square is already taken. Also, if `winner` is not `null`
      //     immediately `return` because the game is over.
      if (board[sqIdx] || winner) {
        return
      }
      // 6e) Update the `board` array at the `sqIdx` with the current value of
      //     `turn`.
      board[sqIdx] = turn
      
      
      // 6f) Change the turn by multiplying `turn` by `-1` (this flips a `1` to
      //     `-1`, and vice-versa).
      turn *= -1
      
      // 6g) Set the `winner` variable if there's a winner by calling a new 
      //     function: `getWinner`.
      winner = getWinner()
    
      // 6h) All the state has been updated so we need to render our updated state 
      //     to the user by calling the `render` function we wrote earlier.
      render()
    }
    
    // Step 7 - Build the `getWinner` function
    // 7a) Create a function called `getWinner`
    function getWinner() {
      /* 
       * There are two methods you can use to find out if there is a winner.
       *
       * Step b1 below is a more elegant method that takes advantage of the
       * `winningCombos` array you wrote above in step 5. 
       *
       * Step b2 might be a little simpler to comprehend, but you'll need to write  
       * more code. Step b2 also won't take advantage of the `winningCombos`
       * array, but using it as a reference will help you build a solution.
       * ***Ensure you choose only one path.***
       */
    
      // 7b1)Loop through each of the winning combination arrays defined in the 
      //     `winningCombos` array. Total up the three board positions using the 
      //     three indexes in the current combo. Convert the total to an absolute 
      //     value (convert any negative total to positive). If the total equals 3, 
      //     we have a winner! Set the `winner` variable to the board's value at
      //     the index specified by the first index of that winning combination's
      //     array by returning that value.
    
      // More elegant approach:
      // for (let i = 0; i < winningCombos.length; i++) {
      //   if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]]
      // }
    
      // 7b2)For each one of the winning combinations you wrote in step 5, find the
      //     total of each winning combination. Convert the total to an absolute 
      //     value (convert any negative total to positive). If the total equals 3, 
      //     we have a winner! Set the `winner` variable to the board's value at 
      //     the index specified by the first index of that winning combination's 
      //     array by returning that value.
    
      if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0]
      if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3]
      if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6]
      if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0]
      if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1]
      if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2]
      if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0]
      if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2]
    
    
      
      // 7c) If there is no winner, check to see if there is a tie. Set the  
      //     `winner` variable to `'T'` if there are no more nulls in the board  
      //     array by returning the string `'T'`.
      // 7d) If there is no winner and there isn’t a tie, return `null`.
      if (board.includes(null)) {
        return null
      } else {
        return "T"
      }
    }