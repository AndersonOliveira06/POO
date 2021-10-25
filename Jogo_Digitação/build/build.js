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
        this.bolhas = [new Bolha(100, 100, "a", 1)];
        this.bolhas.push(new Bolha(200, 100, "b", 2));
        this.bolhas.push(new Bolha(300, 100, "c", 3));
    }
    Board.prototype.update = function () {
        this.verificarTempoBolha();
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
    Board.prototype.verificarTempoBolha = function () {
        this.timer -= 1;
        if (this.timer <= 0) {
            this.addBolha();
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
    Board.prototype.addBolha = function () {
        var x = random(30, width - 2 * Bolha.radius);
        var y = -20;
        var speed = random(1, 4);
        var letra = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
        var bolha = new Bolha(x, y, letra, speed);
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
        this.activeState = this.gamePlay;
    }
    Game.prototype.gamePlay = function () {
        this.board.update();
        background(50, 50, 50);
        this.board.draw();
        if (this.board.erros > 5) {
            if (this.board.acertos < 50) {
                this.activeState = this.gameOver;
            }
        }
        else if (this.board.acertos >= 50) {
            this.activeState = this.gameWin;
        }
    };
    Game.prototype.gameWin = function () {
        background(0, 200, 0);
        fill(0);
        textSize(100);
        text("You Won", 150, 350);
        textSize(20);
        text("Atualize a página para recomeçar", 200, 400);
    };
    Game.prototype.gameOver = function () {
        background(200, 0, 0);
        fill(0);
        textSize(100);
        text("You Failed", 100, 350);
        textSize(20);
        text("Atualize a página para reiniciar", 200, 400);
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
    game.activeState();
}
//# sourceMappingURL=build.js.map