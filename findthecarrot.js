const prompt = require("prompt-sync")({ sigint: true });

const CARROT = "^";
const HOLE = "O";
const GRASS = "░";
const PLAYER = "*";


// WIN / LOSE / OUT / QUIT messages constants
const WIN = "Congratulations! You found the carrot!";                                         // customise message when player wins
const LOST = "Sorry! You fell down into a hole. Retry again?";                               // customise message when player lose
const OUT = "Sorry! You went out of bounds. Retry again?";                                  // customise message when player is out of bounds (lose)
const QUIT = "Game ended."                                                                 // customise message when player quits



class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    // Set the "home" position before the game starts
    this.field[0][0] = PLAYER;
  }

  // Creates game loop
  play() {
    const userInput = String(input).toLowerCase();
    let gameState = true;
    while (gameState) {
      this.print();
      this.askQuestion();
      if (
        this.locationX < 0 ||
        this.locationX >= this.field[0].length ||
        this.locationY < 0 ||
        this.locationY >= this.field.length
      ) {
        console.log(OUT);
        gameState = false;
        return;
      } else if (this.field[this.locationY][this.locationX] === CARROT) {
        console.log(WIN);
        gameState = false;
        return;
      } else if (this.field[this.locationY][this.locationX] === HOLE) {
        console.log(LOST);
        gameState = false;
        return;
      } else if (userInput === "q"){
        this.quitGame();

      
      // Update the current location on the map
      this.field[this.locationY][this.locationX] = PLAYER;
    }
  }

  // Shows field.
  print(); {
    const displayString = this.field.map(row => {
        return row.join('');
      }).join('\n');
    console.log(displayString);
  }

  //Ask for input
  askQuestion(); {
    const move = prompt("Which way (u, d, l, r)? ").toUpperCase();
    if (move === "R") {
      this.locationX += 1;
    } else if (move === "L") {
      this.locationX -= 1;
    } else if (move === "U") {
      this.locationY -= 1;
    } else if (move === "D") {
      this.locationY += 1;
    } else {
      console.log("Please enter the U, D, L, or R key.");
    }
  }

    static generateField(height, width, percent) {
    const HOLENum = (height * width) * percent;
    const field = [];
    for (let i = 0; i < height; i++) {
      field.push([]);
      for (let j = 0; j < width; j++) {
        field[i].push(GRASS);
      }
    }
    for (let i = 0; i < HOLENum; i++) {
      const randomCol = Math.floor(Math.random() * height);
      const randomRow = Math.floor(Math.random() * width);
      field[randomCol][randomRow] = HOLE;
    }

    let randomCol = Math.floor(Math.random() * height);
    let randomRow = Math.floor(Math.random() * width);
    
    while (randomCol === 0 && randomRow === 0) {
         randomCol = Math.floor(Math.random() * height);
         randomRow = Math.floor(Math.random() * width);
    }

    let genField=1;
    console.log('1 - Small');
    console.log('2 - Normal');
    console.log('3 - Large');
    const size = prompt('Choose the size of the map: ');
    switch(size) {
    case '1':
    genField = Field.generateField(8,8);
    break;
    case '2':
    genField = Field.generateField(16,16);
    break;
    case '3':
    genField = Field.generateField(32,32);
    break;
    default:
    console.log('Invalid input. The map is normal by default.')
    genField = Field.generateField(16,16);
    break;
}

    // Dynamically generate % of holes
    var holeOrEmptyField = Math.random() < holesPercent ? 'O' : '░';
    arr[y][x] = holeOrEmptyField;

    field[randomCol][randomRow] = CARROT;
    return field;
  }

}

const myField = new Field(Field.generateField(16, 16, .2));
myField.play();