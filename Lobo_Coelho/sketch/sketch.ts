//CLASSES
class Entity {
  x: number;
  y: number;
  step: number;
  image: p5.Image;
  alive: boolean;
  timeToReturn: number;

  constructor(x: number, y: number, step: number, image: p5.Image) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.image = image;
    this.alive = true;
  }

  update(): void {
    if (!this.alive) {
      this.timeToReturn --;
      if (this.timeToReturn <= 0) {
        this.alive = true;
        this.timeToReturn = 0;
      }
    }
  }

  draw() {
    if(!this.alive) {
      return;
    }
    image(this.image, this.x * this.step, this.y * this.step, this.step, this.step)
  }
}

class Board {
  numLinhas: number;
  numColunas: number;
  step: number;
  background: p5.Image;
  
  constructor(numColunas: number, numLinhas: number, step: number, background: p5.Image) {
    this.numLinhas = numLinhas;
    this.numColunas = numColunas;
    this.step = step;
    this.background = background;
  }

  draw(): void {
    image(this.background, 0, 0, this.numLinhas * this.step, this.numColunas * this.step);
    for (let x = 0; x < this.numColunas; x++){
      for(let y = 0; y < this.numLinhas; y++){
        noFill();
        stroke(0, 120, 0);
        strokeWeight(2);
        rect(x * this.step, y * this.step, this.step, this.step);
      }
    }
  }
}

//VARIÁVEIS

let wolf_img: p5.Image;
let wolf_img2: p5.Image;
let coelho_img: p5.Image;
let coelho_img2: p5.Image;
let board_img: p5.Image;
let buraco_img: p5.Image;
let wolf: Entity;
let coelho: Entity;
let board: Board;
let buraco: Entity;

let pontosLobo: number = 0;
let pontosCoelho: number = 0; 

let timer: number = 100;

//FUNÇÕES
function loadImg(linkImg: string): p5.Image {
  return loadImage(
    linkImg,
    () => console.log("Loading" + linkImg + " ok"),
    () => console.log("Loading" + linkImg + " error")
  );
}

// carregar imagens
function preload() {    
  wolf_img = loadImg('../sketch/wolf.png');
  wolf_img2 = loadImg('../sketch/wolf - esquerda.png');
  coelho_img = loadImg('../sketch/coelho.png');  
  coelho_img2 = loadImg('../sketch/coelho - esquerda.png');  
  board_img = loadImg('../sketch/grama.jpg');    
  buraco_img = loadImg('../sketch/buraco.png');
}

function setup() {
  let size = 100;
  frameRate(100);
  wolf = new Entity(2, 2, size, wolf_img);
  coelho = new Entity(1, 1, size, coelho_img);
  buraco = new Entity(-1,-1, size, buraco_img);
  board = new Board(6, 6, size, board_img);
  createCanvas(board.numColunas * size, board.numLinhas * size);

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
      wolf.x--;
      wolf.image = wolf_img2;
  } else if (keyCode === RIGHT_ARROW) {
      wolf.x++;
      wolf.image = wolf_img;
  } else if (keyCode === UP_ARROW) {
        wolf.y--;
  } else if (keyCode === DOWN_ARROW) {
      wolf.y++; 
  }

  if (keyCode === "A".charCodeAt(0)) {
    coelho.x--;
    coelho.image = coelho_img2;
  } else if (keyCode === "D".charCodeAt(0)) {
    coelho.x++;
    coelho.image = coelho_img;
  } else if (keyCode === "W".charCodeAt(0)) {
    coelho.y--;
  } else if (keyCode === "S".charCodeAt(0)) {
    coelho.y++;
  }

  if(keyCode === "B".charCodeAt(0)) {
    buraco.x = Math.round(random(0, board.numColunas - 1));
    buraco.y = Math.round(random(0, board.numLinhas - 1));
  }
}

function movimentação(){
  
  // movimentação - lobo
  if(wolf.x === board.numColunas){
    wolf.x = 0;
  }
    
  if(wolf.y === board.numLinhas) {
    wolf.y = 0;
  }
  
  if(wolf.x === -1) {
    wolf.x = board.numColunas - 1;
  }
  
  if(wolf.y == -1) {
    wolf.y = board.numLinhas - 1;
  }

  // movimentação - coelho
  if(coelho.x === board.numColunas){
    coelho.x = 0;
  }
    
  if(coelho.y === board.numLinhas) {
    coelho.y = 0;
  }
  
  if(coelho.x === -1) {
    coelho.x = board.numColunas - 1;
  }
  
  if(coelho.y == -1) {
    coelho.y = board.numLinhas - 1;
  }
}

function capturaCoelho() {
  if(wolf.x === coelho.x && wolf.y === coelho.y) {
    coelho.x = Math.round(random(0, board.numColunas));
    coelho.y = Math.round(random(0, board.numLinhas));
    pontosLobo += 10;
  }
  
}

function cairNoBuraco() {
  /*
  fill(255, 0, 0, 99);
  noStroke();
  rect(0, 0, 80, 40);
  textSize(30);
  fill(255, 255, 255);
  if(timer >= 10) {
    text("0:" + timer, 10, 30);
  } else {
    text("0:0" + timer, 10, 30);
  }

   if (frameCount % 60 === 0 && timer > 0) {
    b = false;
    timer--;
  }
  if (timer === 0) {
    buraco.x = -1;
    buraco.y = -1;
    b = true;
  }
*/  

 
  /*
  buraco.x = -1;
  buraco.y = -1;
  wolf.x = 0;
  wolf.y = 0;
*/
  if(wolf.x === buraco.x && wolf.y === buraco.y) {
    pontosCoelho += 30;
  
    wolf.alive = false;
    wolf.timeToReturn = 400;
    buraco.x = -1;
    buraco.y = -1;    
  }

  if (wolf.alive === true) {
    return 
  } else {
      fill(148, 0, 211, 90);
      rect(520, 555, 80, 50);
      fill(255, 255, 0);
      stroke(0);
      strokeWeight(3);
      textSize(30);
      text(wolf.timeToReturn, 540, 590);
      textSize(20);
      text("Tempo Para Retornar :", 315, 585);
  }
  
  
}

function fimDeJogo() {
  let size: number = 100;
  if(pontosCoelho >= 200 ) {
    fill(0, 0, 255);
    rect(0, 0, board.numColunas * size, board.numLinhas * size);

    fill(255, 255, 255);
    textAlign(CENTER, CENTER);

    textSize(20);
    text("PARABÉNS POR ESCAPAR, COELHO", 290, 220);
    
    textSize(45);
    text("VOCÊ É UM VENCEDOR!", 290, 280);

    textSize(10);
    text("ATUALIZE A PÁGINA PARA JOGAR NOVAMENTE", 290, 500);

  } else if (pontosLobo >= 200) {
    fill(0, 255, 0);
    rect(0, 0, board.numColunas * size, board.numLinhas * size);

    fill(70, 0, 130);
    textAlign(CENTER, CENTER);
    textSize(20);
    stroke(70, 0, 130);
    strokeWeight(1);

    text("PARABÉNS, LOBO", 290, 220);

    textSize(30);
    stroke(70, 0, 130);
    strokeWeight(1);
    text("VOCÊ É UM MONSTRO INDOMÁVEL!", 290, 280);

    textSize(10);
    text("ATUALIZE A PÁGINA PARA JOGAR NOVAMENTE", 290, 500);
  }
}

function tempoParaFuga() {
    if(frameCount % 60 === 0 && timer > 0) {
      timer--;
    }
    if(timer === 0) {
      if (pontosLobo < 200) {
        pontosCoelho = 200;
      } else {
        return false;
      }
        
    }
}

function showTime() {
  fill(255, 0, 0, 99);
  noStroke();
  rect(0, 0, 80, 40);
  textSize(30);
  fill(255, 255, 255);
  if(timer >= 10) {
    text("0:" + timer, 10, 30);
  } else {
    text("0:0" + timer, 10, 30);
  }
}

function draw() {
  movimentação();
  wolf.update();
  board.draw();
  buraco.draw();
  wolf.draw();
  coelho.draw();
  
  showTime();

  tempoParaFuga();

  capturaCoelho();

  cairNoBuraco();

  //pontuação Lobo
  fill(0, 255, 0, 99)
  noStroke();
  rect(430, -1, 160, 40);

  fill(70, 0, 130);
  strokeWeight(1);
  stroke(70, 0, 130);
  textSize(30);
  text("Lobo: " + pontosLobo, 435, 30);

  //pontuação Coelho
  fill(0, 0, 255, 99)
  noStroke();
  rect(220, -1, 180, 40);

  fill(255, 255, 255);
  noStroke();
  textSize(30);
  text("Coelho: " + pontosCoelho, 225, 30);

  fimDeJogo();

}