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

    getEnergia(): number {
        return this.energia;
    }

    getEnergiaMax(): number {
        return this.energiaMax;
    }

    getFome(): number {
        return this.saciedade;
    }

    getFomeMax(): number {
        return this.saciedadeMax;
    }

    getLimpeza(): number {
        return this.limpeza;
    }

    getLimpezaMax(): number {
        return this.limpezaMax;
    }

    setEnergia(valor: number) {
        if(valor < 0) {
            this.energia = 0;
        } else if(valor > this.energiaMax) {
            this.energia = this.energiaMax;
        } else {
            this.energia = valor;
        }
    }

    setFome(valor: number) {
        if(valor < 0) {
            this.saciedade = 0;
        } else if(valor > this.saciedadeMax) {
            this.saciedade = this.saciedadeMax;
        } else {
            this.saciedade = valor;
        }
    }

    setLimpeza(valor: number) {
        if(valor < 0) {
            this.limpeza = 0;
        } else if(valor > this.limpezaMax) {
            this.limpeza = this.limpezaMax;
        } else {
            this.limpeza = valor;
        }
    }

    comer() {
        this.energia -= 1;
        this.saciedade += 4;
        this.limpeza -= 2;
        this.idade += 1;

//--------------------- SE ATRIBUTOS FOREM MAIORES QUE O MAX ---------------------\\

        if(this.saciedade > this.saciedadeMax) {
            this.saciedade = this.saciedadeMax;
        }

//--------------------- SE ATRIBUTOS FOREM MENORES QUE ZERO ---------------------\\

        if(this.energia <= 0) {
            console.log("fail: pet morreu de cansaço");
            this.alive = false;
            this.energia = 0;
        }

        if (this.saciedade <= 0) {
            console.log("fail: pet morreu de fome");
            this.alive = false;
            this.saciedade = 0;
        }

        if (this.limpeza <= 0) {
            console.log("fail: pet morreu de sujeira");
            this.alive = false;
            this.limpeza = 0;
        } 
    }

    brincar() {
        this.energia -= 2;
        this.saciedade -= 1;
        this.limpeza -= 3;
        this.diamante += 1;
        this.idade += 1;

//--------------------- SE ATRIBUTOS FOREM MENORES QUE ZERO ---------------------\\

        if(this.energia <= 0) {
            console.log("fail: pet morreu de cansaço");
            this.alive = false;
            this.energia = 0;
        }

        if (this.saciedade <= 0) {
            console.log("fail: pet morreu de fome");
            this.alive = false;
            this.saciedade = 0;
        }

        if (this.limpeza <= 0) {
            console.log("fail: pet morreu de sujeira");
            this.alive = false;
            this.limpeza = 0;
        } 
    }

    banho() {
        this.energia -= 3;
        this.saciedade -= 1;
        this.limpeza = this.limpezaMax;
        this.idade += 2;

        //--------------------- SE ATRIBUTOS FOREM MENORES QUE ZERO ---------------------\\

        if(this.energia <= 0) {
            console.log("fail: pet morreu de cansaço");
            this.alive = false;
            this.energia = 0;
        }

        if (this.saciedade <= 0) {
            console.log("fail: pet morreu de fome");
            this.alive = false;
            this.saciedade = 0;
        }
    }

    dormir() {
        if(this.energia >= this.energiaMax - 5) {
            console.log("fail: não está com sono");
        } else {
            this.energia = this.energiaMax;
            this.idade += 5;
        }
    }

    testAlive() {
        if(this.alive == false) {
            console.log("fail: pet esta morto"); 
        }
    }

    toString(): string {
        return `E: ${this.energia}/${this.energiaMax}, S: ${this.saciedade}/${this.saciedadeMax}, L: ${this.limpeza}/${this.limpezaMax}, D: ${this.diamante}, I: ${this.idade}`;
    }
}

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
