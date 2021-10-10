var numLinhas = 10;
var numColunas = 10;
var lado = 50;
var cobraX = 0;
var cobraY = 0;
var speedX = 0;
var speedY = 0;
var cobra_color;
var celula_color;
var timer = 0;
var comidaX = 0;
var comidaY = 0;
var comida_color;
var comida_count = 0;
function gerar_comida() {
    comidaX = Math.round(random(0, numColunas));
    comidaY = Math.round(random(0, numLinhas));
    comida_color = color(random(255), random(255), random(255));
}
function setup() {
    createCanvas(numColunas * lado, numLinhas * lado);
    frameRate(40);
    cobra_color = color("blue");
    celula_color = color("grey");
    gerar_comida();
}
function draw_celula(x, y, color) {
    fill(color);
    noStroke();
    square(x * lado + 1, y * lado + 1, lado - 1);
}
function draw_matriz() {
    fill(155);
    for (var c = 0; c < numColunas; c++)
        for (var l = 0; l < numLinhas; l++)
            draw_celula(c, l, celula_color);
}
function movimentação() {
    if (cobraX == numColunas) {
        cobraX = 0;
    }
    if (cobraY == numLinhas) {
        cobraY = 0;
    }
    if (cobraX == -1) {
        cobraX = numColunas - 1;
    }
    if (cobraY == -1) {
        cobraY = numLinhas - 1;
    }
}
function movimentoAleatório() {
    if (frameCount - timer > 7) {
        timer = frameCount;
        cobraX += speedX;
        cobraY += speedY;
    }
}
function draw() {
    movimentoAleatório();
    movimentação();
    if (cobraX == comidaX && cobraY == comidaY) {
        gerar_comida();
        comida_count += 1;
    }
    background(220);
    draw_matriz();
    draw_celula(comidaX, comidaY, comida_color);
    draw_celula(cobraX, cobraY, cobra_color);
    fill(0);
    textSize(20);
    text(comida_count, 10, 30);
}
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        if (speedX === 1 && speedY === 0) {
            return false;
        }
        else {
            speedX = -1;
            speedY = 0;
        }
    }
    else if (keyCode === RIGHT_ARROW) {
        if (speedX === -1 && speedY === 0) {
            return false;
        }
        else {
            speedX = 1;
            speedY = 0;
        }
    }
    else if (keyCode === UP_ARROW) {
        if (speedX === 0 && speedY === 1) {
            return false;
        }
        else {
            speedX = 0;
            speedY = -1;
        }
    }
    else if (keyCode === DOWN_ARROW) {
        if (speedX === 0 && speedY === -1) {
            return false;
        }
        else {
            speedX = 0;
            speedY = 1;
        }
    }
}
//# sourceMappingURL=build.js.map