const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x: any) => process.stdout.write("" + x);

class Personagem {
    private idade: number;
    private diamante: number;
    private alive: boolean;
    private limpeza: number;
    private limpezaMax: number;
    private energia: number;
    private energiaMax: number;
    private saciedade: number;
    private saciedadeMax: number;

    constructor(energia: number, saciedade: number, limpeza: number) {
        this.energiaMax = energia;
        this.energia = energia;
        this.saciedadeMax = saciedade;
        this.saciedade = saciedade;
        this.limpezaMax = limpeza;
        this.limpeza = limpeza;
        this.idade = 0;
        this.diamante = 0;
        this.alive = true;
    }

    public getEnergia(): number {
        return this.energia;
    }

    public getEnergiaMax(): number {
        return this.energiaMax;
    }

    public getFome(): number {
        return this.saciedade;
    }

    public getFomeMax(): number {
        return this.saciedadeMax;
    }

    public getLimpeza(): number {
        return this.limpeza;
    }

    public getLimpezaMax(): number {
        return this.limpezaMax;
    }

    public setEnergia(valor: number) {
        if(valor < 0) {
            this.energia = 0;
            this.alive = false;
            write("fail: pet morreu de cansaço\n");
        } else if(valor > this.energiaMax) {
            this.energia = this.energiaMax;
        } else {
            this.energia = valor;
        }
    }

    public setFome(valor: number) {
        if(valor < 0) {
            this.saciedade = 0;
            this.alive = false;
            write("fail: pet morreu de fome\n");
        } else if(valor > this.saciedadeMax) {
            this.saciedade = this.saciedadeMax;
        } else {
            this.saciedade = valor;
        }
    }

    public setLimpeza(valor: number) {
        if(valor < 0) {
            this.limpeza = 0;
            this.alive = false; 
            write("fail: pet morreu de sujeira\n");
        } else if(valor > this.limpezaMax) {
            this.limpeza = this.limpezaMax;
        } else {
            this.limpeza = valor;
        }
    }

    comer() {
        if (!this.alive) {
            console.log("fail: pet está morto");
        } else {
            this.setEnergia(this.energia - 1);
            this.setFome(this.saciedade + 4);
            this.setLimpeza(this.limpeza - 2);
            this.idade += 1;
        }
    }

    brincar() {
        if (!this.alive) {
            console.log("fail: pet está morto");
        } else {
            this.setEnergia(this.energia - 2);
            this.setFome(this.saciedade - 1);
            this.setLimpeza(this.limpeza - 3);
            this.diamante += 1;
            this.idade += 1;
        }
    }

    banho() {
        if (!this.alive) {
            console.log("fail: pet está morto");
        } else {
            this.setEnergia(this.energia - 3);
            this.setFome(this.saciedade - 1);
            this.setLimpeza(this.limpezaMax);
            this.idade += 2;
        }
    }

    dormir() {
        if (!this.alive) {
            console.log("fail: pet está morto");
        } else {
            if(this.energia >= this.energiaMax - 5) {
                console.log("fail: não está com sono");
            } else {
                this.setEnergia(this.energiaMax);
                this.idade += 5;
            }
        }    
    }

    toString(): any {
        if (this.alive) {
            return `E: ${this.energia}/${this.energiaMax}, S: ${this.saciedade}/${this.saciedadeMax}, L: ${this.limpeza}/${this.limpezaMax}, D: ${this.diamante}, I: ${this.idade}`;
        } else {
            console.log("fail: pet está morto");
        }
    }
}

class Jogo {

    create(): Personagem {
        write("Digite a energia máxima do pet: ");
        let energy = +input();
        write("Digite a saciedade máxima do pet: ");
        let saciedade = +input();
        write("Digite a limpeza máxima do pet: ");
        let limpeza = +input();
        let personagem = new Personagem(energy, saciedade, limpeza);
        return personagem;
    }
    
    mostrar_ajuda() {
        write("Comandos:\n");
        write(" init <energiaMax> <saciedadeMax> <limpezaMax>: cria um novo pet\n");
        write(" show: mostra o pet\n");
        write(" brincar: faz o pet brincar\n");
        write(" comer: faz o pet comer\n");
        write(" dormir: faz o pet dormir\n");
        write(" banho: faz o pet tomar banho\n");
        write(" sair: sai do jogo\n");
    }

    interacao() {
        let pet = this.create();   
        this.mostrar_ajuda();     
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "sair") {
                break;
            } else if (words[0] == "ajuda") {
                this.mostrar_ajuda();
            } else if (words[0] == "comer") {
                pet.comer();
            } else if (words[0] == "brincar") {
                pet.brincar();
            } else if (words[0] == "dormir") {
                pet.dormir();
            } else if (words[0] == "banho") {
                pet.banho();
            } else if (words[0] == "show") {
                write("" + pet + "\n");
            } else if (words[0] == "init") {
                let energiaMax = +words[1];
                let saciedadeMax = +words[2];
                let limpezaMax = +words[3];
                pet = new Personagem(energiaMax, saciedadeMax, limpezaMax)
            } else {
                console.log("Comando inválido");
            }
        }
    }
}

let jogo = new Jogo();
jogo.interacao();


/*
let pet = new Personagem(20, 15, 30);
console.log(" " + pet);

console.log("------- CASE BRINCAR -------");
pet.brincar();
console.log(" " + pet);

console.log("\n");

pet.brincar();
console.log(" " + pet);

console.log("------- CASE COMER -------");
pet.comer();
console.log(" " + pet);

console.log("------- CASE DORMIR -------");
pet.dormir();
console.log(" " + pet);

console.log("------- CASE TOMAR BANHO -------");
pet.banho();
console.log(" " + pet);

console.log("------- CASE MORRER -------");
pet.brincar();
pet.brincar();
pet.brincar();
pet.brincar();
pet.brincar();
pet.brincar();
console.log(" " + pet);

*/
//
//npm install ts-node readline-sync @types/readline-sync @types/node