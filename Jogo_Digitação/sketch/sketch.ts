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
      this.bolhas = [new Bolha(random(30, 300), random(10, 150), "a", 1)];
      this.bolhas.push(new Bolha(random(30, 300), random(10, 150), "b", 2));
      this.bolhas.push(new Bolha(random(30, 300), random(10, 150), "c", 3)); 
    }

    update(vel: number): void {
      this.verificarTempoBolha(vel);
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

    verificarTempoBolha(vel: number): void {
      this.timer -= 1;

      if (this.timer <= 0) {
        this.addBolha(vel);
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

    addBolha(vel:number): void {
      let x = random(30, width - 2 * Bolha.radius);
      let y = -20;
      let velocidade = vel;
      let letra = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);        
      let bolha = new Bolha(x, y, letra, vel);
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
    bolha: Bolha;
    activeState: () => void;

    constructor() {
      this.board = new Board();
      this.activeState = this.level1;    
    }

    gamePlay(): void {

      //lógica para passar do nível 1 para nível 2
      if(this.activeState == this.levelWin1) {
        if(keyCode === 98/* numero 2 */) {
          this.board = new Board();
          this.activeState = this.level2;
        }
      }  
        if (this.activeState == this.levelOver1) {
          if(keyCode === 103 /* numero 7 */ ) {
            this.activeState = this.level1;
            this.board = new Board();
          }
        }



      //lógica para passar do nível 2 para nível 3
      if(this.activeState == this.levelWin2) {
        if(keyCode === 99 /* numero 3 */) {
          this.board = new Board();
          this.activeState = this.level3;
        } 
      }  

      if (this.activeState == this.levelOver2) {
          if(keyCode === 104/* numero 8 */) {
            this.board = new Board();
            this.activeState = this.level2;
          }
      }

      if (this.activeState == this.levelOver3) {
        if(keyCode === 105/* numero 9*/) {
          this.board = new Board();
          this.activeState = this.level3;
        }
    }
  
    }

    level1(): void {

      this.board.update(random(1,5));
      background(50, 50, 50);
      this.board.draw();  

      stroke(0, 255, 0);
      fill(0, 255, 0);
      textSize(30);
      text("Nível 1", 650, 30);
      
      //lógica para ganhar/perder nível
      if (this.board.erros > 5) {
        if (this.board.acertos < 20){
          this.activeState = this.levelOver1;   
        }
      } else if (this.board.acertos >= 20) {
          this.activeState = this.levelWin1;
      }
    }

    level2(): void {
      //this.bolha.speed = random(3,6);
      this.board.update(random(3,7));
      background(70, 70, 70);
      this.board.draw();

      stroke(255, 255, 0);
      fill(255, 255, 0);
      textSize(30);
      text("Nível 2", 650, 30);

      //lógica para ganhar/perder nível
      if (this.board.erros > 5) {
        if (this.board.acertos < 20){
           this.activeState = this.levelOver2;   
        }
      } else if (this.board.acertos >= 20) {
          this.activeState = this.levelWin2;
        }
    }

    level3(): void {
      //this.bolha.speed = random(3,6);
      this.board.update(random(5,9));
      background(100, 100, 100);
      this.board.draw();

      stroke(255, 0, 0);
      fill(255, 0, 0);
      textSize(30);
      text("Nível 3", 650, 30);

      //lógica para ganhar/perder nível
      if (this.board.erros > 5) {
        if (this.board.acertos < 20){
          this.activeState = this.levelOver3;   
        }
      } else if (this.board.acertos >= 20) {
          this.activeState = this.gameWin;
        }
    }

    levelWin1(): void {
      background(0, 200, 0);
      noStroke();
      fill(0);
      textSize(100);
      text("Level 1 Won", 100, 350);
      fill(0, 100, 0);
      rect(192, 470, 350, 40, 10);
      fill(200);
      textSize(30);
      text("Press number 2 to next", 210, 500);
    }

    levelWin2(): void {
      background(0, 200, 0);
      noStroke();
      fill(0);
      textSize(100);
      text("Level 2 Won", 100, 350);
      fill(0, 100, 0);
      rect(192, 470, 350, 40, 10);
      fill(200);
      textSize(30);
      text("Press number 3 to next", 210, 500);
    }

    levelOver1(): void {
      background(200, 0, 0);
      noStroke();
      fill(0);
      textSize(100);
      text("Level 1 Failed", 75, 350);
      fill(100, 0, 0);
      rect(192, 470, 350, 40, 10);
      fill(200);
      textSize(30);
      text("Press number 7 to return", 200, 500);
    }
    
    levelOver2(): void {
      background(200, 0, 0);
      noStroke();
      fill(0);
      textSize(100);
      text("Level 2 Failed", 75, 350);
      fill(100, 0, 0);
      rect(192, 470, 350, 40, 10);
      fill(200);
      textSize(30);
      text("Press number 8 to return", 200, 500);
    }

    levelOver3(): void {
      background(200, 0, 0);
      noStroke();
      fill(0);
      textSize(100);
      text("Level 3 Failed", 75, 350);
      fill(100, 0, 0);
      rect(192, 470, 350, 40, 10);
      fill(200);
      textSize(30);
      text("Press number 9 to return", 200, 500);
    }

    gameWin(): void {
      background(0, 200, 0);
      noStroke();
      fill(0);
      textSize(100);
      text("You Won", 150, 350);
      textSize(20);
      text("Atualize a página para recomeçar", 200, 400);
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
  game.gamePlay();
  game.activeState();
}