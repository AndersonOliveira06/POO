class Bolha {
    x: number;
    y: number;
    letra: string;
    speed: number;
    static radius: number = 20;
    alive: boolean = true;

    constructor (x: number, y: number, letra: string, speed: number) {
      this.x = x;
      this.y = y;
      this.letra = letra;
      this.speed = speed;
    }

    update(): void {
      this.y += this.speed;
    }

    draw(): void {
      fill(255);
      stroke(255);
      circle(this.x, this.y, 2 * Bolha.radius);

      fill(0);
      stroke(0);
      textSize(20);
      text(this.letra, this.x - 5, this.y + 3);
    }
}

class Board {
    bolhas: Bolha[];
    timeout: number = 30;
    timer: number = 0;
    acertos: number = 0;
    erros: number = 0;

    constructor() {
      this.bolhas = [new Bolha(100, 100, "a", 1)];
      this.bolhas.push(new Bolha(200, 100, "b", 2));
      this.bolhas.push(new Bolha(300, 100, "c", 3)); 
    }

    update(): void {
      this.verificarTempoBolha();
      this.marcarBolhasdeFora();

      for(let bolha of this.bolhas){
        bolha.update();
      }
      
      this.removerBolhasMortas();
    }

    removerBolhasMortas(): void {
      this.bolhas = this.bolhas.filter(b => b.alive);    
    }

    removerPeloAcerto(code: number): void {
      for (let bolha of this.bolhas) {
        if(bolha.letra[0].toUpperCase().charCodeAt(0) == code) {
          bolha.alive = false;
          this.acertos++;
          break;
        }
      }
    }

    verificarTempoBolha(): void {
      this.timer -= 1;

      if (this.timer <= 0) {
        this.addBolha();
        this.timer = this.timeout;
      }    
    }

    marcarBolhasdeFora(): void {
      for(let bolha of this.bolhas){
        if (bolha.y + 2 * Bolha.radius >= height) {
          bolha.alive = false;
          this.erros ++;
        }   
      }      
    }

    addBolha(): void {
      let x = random(30, width - 2 * Bolha.radius);
      let y = -20;
      let speed = random(1, 4);
      let letra = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);        
      let bolha = new Bolha(x, y, letra, speed);
      this.bolhas.push(bolha);
    }

    draw(): void {
      stroke(255);
      fill(255);
      textSize(30);
      text("Acertos: " + this.acertos + "  Erros: " + this.erros, 30, 30);
      
      for(let bolha of this.bolhas){
        bolha.draw();
      }     
    }
}

class Game {
    board: Board;
    activeState: () => void;

    constructor() {
      this.board = new Board();
      this.activeState = this.gamePlay;    
    }

    gamePlay(): void {
      this.board.update();
      background(50, 50, 50);
      this.board.draw();  

      if (this.board.erros > 5) {
        if (this.board.acertos < 50){
          this.activeState = this.gameOver;   
        }
      } else if (this.board.acertos >= 50) {
          this.activeState = this.gameWin;
      }
    }

    gameWin(): void {
      background(0, 200, 0);
      fill(0);
      textSize(100);
      text("You Won", 150, 350);
      textSize(20);
      text("Atualize a página para recomeçar", 200, 400);
    }

    gameOver(): void {
      background(200, 0, 0);
      fill(0);
      textSize(100);
      text("You Failed", 100, 350);
      textSize(20);
      text("Atualize a página para reiniciar", 200, 400);
    }
}

let game: Game;

function setup() {
  createCanvas(800, 600);
  frameRate(30);
  game = new Game();
}

function keyPressed() {
  game.board.removerPeloAcerto(keyCode);
}

function draw() {
  game.activeState();
}