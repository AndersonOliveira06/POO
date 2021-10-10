var Entity = (function () {
    function Entity(x, y, step, image) {
        this.x = x;
        this.y = y;
        this.step = step;
        this.image = image;
    }
    Entity.prototype.draw = function () {
        image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
    };
    return Entity;
}());
var Board = (function () {
    function Board(numColunas, numLinhas, step, background) {
        this.numLinhas = numLinhas;
        this.numColunas = numColunas;
        this.step = step;
        this.background = background;
    }
    Board.prototype.draw = function () {
        image(this.background, 0, 0, this.numLinhas * this.step, this.numColunas * this.step);
        for (var x = 0; x < this.numColunas; x++) {
            for (var y = 0; y < this.numLinhas; y++) {
                noFill();
                stroke(0, 120, 0);
                strokeWeight(2);
                rect(x * this.step, y * this.step, this.step, this.step);
            }
        }
    };
    return Board;
}());
var wolf_img;
var wolf_img2;
var coelho_img;
var coelho_img2;
var board_img;
var buraco_img;
var wolf;
var coelho;
var board;
var buraco;
var pontosLobo = 0;
var pontosCoelho = 0;
var timer = 10;
var b = true;
function loadImg(linkImg) {
    return loadImage(linkImg, function () { return console.log("Loading" + linkImg + " ok"); }, function () { return console.log("Loading" + linkImg + " error"); });
}
function preload() {
    wolf_img = loadImg('../sketch/wolf.png');
    wolf_img2 = loadImg('../sketch/wolf - esquerda.png');
    coelho_img = loadImg('../sketch/coelho.png');
    coelho_img2 = loadImg('../sketch/coelho - esquerda.png');
    board_img = loadImg('../sketch/grama.jpg');
    buraco_img = loadImg('../sketch/buraco.png');
}
function setup() {
    var size = 100;
    wolf = new Entity(2, 2, size, wolf_img);
    coelho = new Entity(1, 1, size, coelho_img);
    buraco = new Entity(-1, -1, size, buraco_img);
    board = new Board(6, 6, size, board_img);
    createCanvas(board.numColunas * size, board.numLinhas * size);
}
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        wolf.x--;
        wolf.image = wolf_img2;
    }
    else if (keyCode === RIGHT_ARROW) {
        wolf.x++;
        wolf.image = wolf_img;
    }
    else if (keyCode === UP_ARROW) {
        wolf.y--;
    }
    else if (keyCode === DOWN_ARROW) {
        wolf.y++;
    }
    if (keyCode === "A".charCodeAt(0)) {
        coelho.x--;
        coelho.image = coelho_img2;
    }
    else if (keyCode === "D".charCodeAt(0)) {
        coelho.x++;
        coelho.image = coelho_img;
    }
    else if (keyCode === "W".charCodeAt(0)) {
        coelho.y--;
    }
    else if (keyCode === "S".charCodeAt(0)) {
        coelho.y++;
    }
    if (keyCode === "B".charCodeAt(0)) {
        buraco.x = Math.round(random(0, board.numColunas - 1));
        buraco.y = Math.round(random(0, board.numLinhas - 1));
    }
}
function movimentação() {
    if (wolf.x === board.numColunas) {
        wolf.x = 0;
    }
    if (wolf.y === board.numLinhas) {
        wolf.y = 0;
    }
    if (wolf.x === -1) {
        wolf.x = board.numColunas - 1;
    }
    if (wolf.y == -1) {
        wolf.y = board.numLinhas - 1;
    }
    if (coelho.x === board.numColunas) {
        coelho.x = 0;
    }
    if (coelho.y === board.numLinhas) {
        coelho.y = 0;
    }
    if (coelho.x === -1) {
        coelho.x = board.numColunas - 1;
    }
    if (coelho.y == -1) {
        coelho.y = board.numLinhas - 1;
    }
}
function capturaCoelho() {
    coelho.x = Math.round(random(0, board.numColunas));
    coelho.y = Math.round(random(0, board.numLinhas));
}
function cairNoBuraco() {
    buraco.x = -1;
    buraco.y = -1;
    wolf.x = 0;
    wolf.y = 0;
}
function fimDeJogo() {
    var size = 100;
    if (pontosCoelho >= 200) {
        fill(0, 0, 255);
        rect(0, 0, board.numColunas * size, board.numLinhas * size);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("PARABÉNS POR ESCAPAR, COELHO", 290, 220);
        textSize(45);
        text("VOCÊ É UM VENCEDOR!", 290, 280);
    }
    else if (pontosLobo >= 200) {
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
function draw() {
    movimentação();
    board.draw();
    buraco.draw();
    wolf.draw();
    coelho.draw();
    if (wolf.x === coelho.x && wolf.y === coelho.y) {
        capturaCoelho();
        pontosLobo += 10;
    }
    if (wolf.x === buraco.x && wolf.y === buraco.y) {
        pontosCoelho += 30;
    }
    fill(0, 255, 0, 99);
    noStroke();
    rect(430, -1, 160, 40);
    fill(70, 0, 130);
    strokeWeight(1);
    stroke(70, 0, 130);
    textSize(30);
    text("Lobo: " + pontosLobo, 435, 30);
    fill(0, 0, 255, 99);
    noStroke();
    rect(220, -1, 180, 40);
    fill(255, 255, 255);
    noStroke();
    textSize(30);
    text("Coelho: " + pontosCoelho, 225, 30);
    fimDeJogo();
}
//# sourceMappingURL=build.js.map