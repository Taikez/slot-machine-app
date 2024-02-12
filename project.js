// 1. Deposit money
// 2. Determine number of betting lines
// 3. Collect betting amount
// 4. Spin slot machine
// 5. Check winner
// 6. Prize money
// 7. Play again

const prompt = require("prompt-sync")()

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
}

const depositMoney = () => {
    while(true) {
        const depositAmount = prompt("Enter deposit amount: ")
        const depositAmountAsNumber = parseFloat(depositAmount)
    
        if(isNaN(depositAmountAsNumber) || depositAmountAsNumber <= 0) {
            console.log("Invalid deposit amount, try again.")
        } else {
            return depositAmountAsNumber
        }
    }
}

const getNumberOfBettingLines = () => {
    while(true) {
        const numberOfBettingLines = prompt("Enter number of betting lines to bet on (1-3): ")
        const numberOfBettingLinesAsNumber = parseFloat(numberOfBettingLines)
    
        if(isNaN(numberOfBettingLinesAsNumber) || numberOfBettingLinesAsNumber <= 0 || numberOfBettingLinesAsNumber > 3) {
            console.log("Invalid number of lines, try again.")
        } else {
            return numberOfBettingLinesAsNumber
        }
    }
}

const getBetAmount = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter your bet per line: ")
        const betAsNumber = parseFloat(bet)
    
        if(isNaN(betAsNumber) || betAsNumber <= 0) {
            console.log("Invalid bet amount, try again.")
        } else if(betAsNumber > balance / lines) {
            console.log("Balance insufficient")
        } else {
            return betAsNumber
        }
    }
}

const spinMachine = () => {
    const symbols = []
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0; i < count; i++) {
            symbols.push(symbol)
        }
    }

    const reels = [[], [], []]
    for(let i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols]

        for(let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            
            reels[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex, 1)
        }
    }

    return reels
}

let balance = depositMoney()
const numberOfBettingLines = getNumberOfBettingLines()