var Bolha = (function () {
    function Bolha(x, y, letra, speed) {
        this.alive = true;
        this.x = x;
        this.y = y;
        this.letra = letra;
        this.speed = speed;
    }
    Bolha.prototype.update = function () {
        this.y += this.speed;
    };
    Bolha.prototype.draw = function () {
        fill(255);
        stroke(255);
        circle(this.x, this.y, 2 * Bolha.radius);
        fill(0);
        stroke(0);
        textSize(20);
        text(this.letra, this.x - 5, this.y + 3);
    };
    Bolha.radius = 20;
    return Bolha;
}());
var Board = (function () {
    function Board() {
        this.timeout = 30;
        this.timer = 0;
        this.acertos = 0;
        this.erros = 0;
        this.bolhas = [new Bolha(random(30, 300), random(10, 150), "a", 1)];
        this.bolhas.push(new Bolha(random(30, 300), random(10, 150), "b", 2));
        this.bolhas.push(new Bolha(random(30, 300), random(10, 150), "c", 3));
    }
    Board.prototype.update = function (vel) {
        this.verificarTempoBolha(vel);
        this.marcarBolhasdeFora();
        for (var _i = 0, _a = this.bolhas; _i < _a.length; _i++) {
            var bolha = _a[_i];
            bolha.update();
        }
        this.removerBolhasMortas();
    };
    Board.prototype.removerBolhasMortas = function () {
        this.bolhas = this.bolhas.filter(function (b) { return b.alive; });
    };
    Board.prototype.removerPeloAcerto = function (code) {
        for (var _i = 0, _a = this.bolhas; _i < _a.length; _i++) {
            var bolha = _a[_i];
            if (bolha.letra[0].toUpperCase().charCodeAt(0) == code) {
                bolha.alive = false;
                this.acertos++;
                break;
            }
        }
    };
    Board.prototype.verificarTempoBolha = function (vel) {
        this.timer -= 1;
        if (this.timer <= 0) {
            this.addBolha(vel);
            this.timer = this.timeout;
        }
    };
    Board.prototype.marcarBolhasdeFora = function () {
        for (var _i = 0, _a = this.bolhas; _i < _a.length; _i++) {
            var bolha = _a[_i];
            if (bolha.y + 2 * Bolha.radius >= height) {
                bolha.alive = false;
                this.erros++;
            }
        }
    };
    Board.prototype.addBolha = function (vel) {
        var x = random(30, width - 2 * Bolha.radius);
        var y = -20;
        var velocidade = vel;
        var letra = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
        var bolha = new Bolha(x, y, letra, vel);
        this.bolhas.push(bolha);
    };
    Board.prototype.draw = function () {
        stroke(255);
        fill(255);
        textSize(30);
        text("Acertos: " + this.acertos + "  Erros: " + this.erros, 30, 30);
        for (var _i = 0, _a = this.bolhas; _i < _a.length; _i++) {
            var bolha = _a[_i];
            bolha.draw();
        }
    };
    return Board;
}());
var Game = (function () {
    function Game() {
        this.board = new Board();
        this.activeState = this.level1;
    }
    Game.prototype.gamePlay = function () {
        if (this.activeState == this.levelWin1) {
            if (keyCode === 98) {
                this.board = new Board();
                this.activeState = this.level2;
            }
        }
        if (this.activeState == this.levelOver1) {
            if (keyCode === 103) {
                this.activeState = this.level1;
                this.board = new Board();
            }
        }
        if (this.activeState == this.levelWin2) {
            if (keyCode === 99) {
                this.board = new Board();
                this.activeState = this.level3;
            }
        }
        if (this.activeState == this.levelOver2) {
            if (keyCode === 104) {
                this.board = new Board();
                this.activeState = this.level2;
            }
        }
        if (this.activeState == this.levelOver3) {
            if (keyCode === 105) {
                this.board = new Board();
                this.activeState = this.level3;
            }
        }
    };
    Game.prototype.level1 = function () {
        this.board.update(random(1, 5));
        background(50, 50, 50);
        this.board.draw();
        stroke(0, 255, 0);
        fill(0, 255, 0);
        textSize(30);
        text("Nível 1", 650, 30);
        if (this.board.erros > 5) {
            if (this.board.acertos < 20) {
                this.activeState = this.levelOver1;
            }
        }
        else if (this.board.acertos >= 20) {
            this.activeState = this.levelWin1;
        }
    };
    Game.prototype.level2 = function () {
        this.board.update(random(3, 7));
        background(70, 70, 70);
        this.board.draw();
        stroke(255, 255, 0);
        fill(255, 255, 0);
        textSize(30);
        text("Nível 2", 650, 30);
        if (this.board.erros > 5) {
            if (this.board.acertos < 20) {
                this.activeState = this.levelOver2;
            }
        }
        else if (this.board.acertos >= 20) {
            this.activeState = this.levelWin2;
        }
    };
    Game.prototype.level3 = function () {
        this.board.update(random(5, 9));
        background(100, 100, 100);
        this.board.draw();
        stroke(255, 0, 0);
        fill(255, 0, 0);
        textSize(30);
        text("Nível 3", 650, 30);
        if (this.board.erros > 5) {
            if (this.board.acertos < 20) {
                this.activeState = this.levelOver3;
            }
        }
        else if (this.board.acertos >= 20) {
            this.activeState = this.gameWin;
        }
    };
    Game.prototype.levelWin1 = function () {
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
    };
    Game.prototype.levelWin2 = function () {
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
    };
    Game.prototype.levelOver1 = function () {
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
    };
    Game.prototype.levelOver2 = function () {
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
    };
    Game.prototype.levelOver3 = function () {
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
    };
    Game.prototype.gameWin = function () {
        background(0, 200, 0);
        noStroke();
        fill(0);
        textSize(100);
        text("You Won", 150, 350);
        textSize(20);
        text("Atualize a página para recomeçar", 200, 400);
    };
    return Game;
}());
var game;
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
//# sourceMappingURL=build.js.map