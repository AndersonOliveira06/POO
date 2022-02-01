class Kid {
    nome: string;
    idade: number;

    constructor (nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    toString() {
        return `${this.nome}: ${this.idade} `;
    }
}

class Trampolim {
    espera: Array<Kid>;
    brinquedo: Array<Kid>;
    capacidade: number;

    constructor(capacidade: number) {
        this.espera = [];
        this.brinquedo = [];
        this.capacidade = capacidade
       
    }


    colocarNaEspera(criança: Kid): boolean {

        this.espera.push(criança);
        return true;

    }

    colocarNoPulaPula(): boolean {
        if(this.espera.length <= 0) {
            console.log("Não tem criança para pular");
            return false;
        }

        if(this.brinquedo.length > this.capacidade) {
            console.log("Pula-Pula cheio");
            return false;
        }

        let esperado = this.espera.pop();
        if (esperado != undefined) {
            this.brinquedo.push(esperado);
        }
        return true;
    }

    tirarDoPulaPula(): boolean {
        if(this.brinquedo.length <= 0) {
            console.log("Não tem nínguem para sair do Pula Pula");
            return false;
        }
        let esperado = this.brinquedo.shift();
        if (esperado != undefined) {
            this.espera.unshift(esperado);
        }
        return true;
    }

    removerKid(name: string){

        if (this.espera.length <= 0) {
            console.log("Não existe criança na fila");
       
        }

        
        if (this.brinquedo.length <= 0) {
            console.log("Não existe criança na Pula Pula");
   
        }

        for (let i = 0; i < this.espera.length; i++) {
            if (name == this.espera[i].nome) {
                this.espera.splice(i, 1);
                break;
            }
        }

        for (let c = 0; c < this.brinquedo.length; c++) {
            if (name == this.brinquedo[c].nome) {
                this.brinquedo.splice(c, 1);
                break;
            }
        }

    }

    toString(): string {

        
        let str = "espera: ";

        if(this.espera.length <= 0) {
            str += " ---- ";
        } else {

            for(let i = 0; i < this.espera.length; i++) {
                let kid = this.espera[i];
    
                str += kid.toString() + " ";  
            }
        }

        str += "-> ";

        if(this.brinquedo.length <= 0) {
            str += " [ ---- ]";
        } else {
            str += "[ ";
            for(let kid of this.brinquedo) {

                str += kid.toString() + " ";
            }
            str += "]"
        }
     
            /*
            for(let c = 0; c < this.brinquedo.length; c++) {
                let brinquedo = this.brinquedo[c];
    
                str += " [ ";

                str += brinquedo.toString();
           
                str += " ]";
            }
            */

        return str;
        
    }
}

let pula = new Trampolim(5);
console.log(" " + pula);

console.log("-------------------------------");

let kid1 = new Kid("Anderson", 7);
let kid2 = new Kid("Fátima", 6);
let kid3 = new Kid("Neymar", 10);
let kid4 = new Kid("Gabigol", 9);

pula.colocarNaEspera(kid1);
pula.colocarNaEspera(kid2);
pula.colocarNaEspera(kid3);
pula.colocarNaEspera(kid4);

console.log(" " + pula);

console.log("-------------------------------");

pula.colocarNoPulaPula();
pula.colocarNoPulaPula();
pula.colocarNoPulaPula();

console.log(" " + pula);

console.log("-------------------------------");

pula.tirarDoPulaPula();
pula.tirarDoPulaPula();

console.log(" " + pula);

console.log("-------------------------------");

pula.removerKid("Fátima");
console.log(" " + pula);