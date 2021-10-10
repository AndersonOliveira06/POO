//CLASSES
class Entity {
  x: number;
  y: number;
  step: number;
  image: p5.Image;

  constructor(x: number, y: number, step: number, image: p5.Image) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.image = image;
  }

  draw() {
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


let timer: number = 10;
let b: boolean = true;

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
  coelho.x = Math.round(random(0, board.numColunas));
  coelho.y = Math.round(random(0, board.numLinhas));
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

 
  
  buraco.x = -1;
  buraco.y = -1;
  wolf.x = 0;
  wolf.y = 0;

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
  }
}

/*
function tempoParaFuga() {
    if(frameCount % 60 === 0 && timer > 0) {
      timer--;
    }
    if(timer === 0) {
      pontosCoelho = 200;
    }
}
*/

function draw() {
  movimentação();
  board.draw();
  buraco.draw();
  wolf.draw();
  coelho.draw();
  


  //mostrar timer na tela
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

  */

  //tempoParaFuga();
  
  if(wolf.x === coelho.x && wolf.y === coelho.y) {
    capturaCoelho();
    pontosLobo += 10;
  }

  if(wolf.x === buraco.x && wolf.y === buraco.y) {
    //cairNoBuraco();
    pontosCoelho += 30;    
  }

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

  //fneifnwofn
}