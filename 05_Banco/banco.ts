class Pessoa {
    nome: string;
    constructor(nome: string) {
        this.nome = nome;
    }
    public toString() {
        return this.nome;
    }
}

class Banco {
    caixas: Array<Pessoa | null>;
    espera: Array<Pessoa>;

    constructor(qtdCaixas: number) {
        this.caixas = []; //length 0
        for (let i = 0; i < qtdCaixas; i++) {
            this.caixas.push(null);
        }
        this.espera = [];
    }

    //coloca a pessoa na fila de espera
    chegarPessoa(pessoa: Pessoa): void {
        this.espera.push(pessoa);
    }

    //se o caixa estiver vazio, pega a primeira pessoa da fila de espera
    chamarNoCaixa(indice: number): boolean {
        if(this.caixas[indice] !== null) {
            console.log("Existe uma pessoa nesse caixa");
            return false;
        }

        if(indice > this.caixas.length) {
            console.log("Esse caixa não existe");
            return false;
        }

        if(this.espera.length <= 0) {
            console.log("Não tem nínguem na fila de espera");
            return false;
        }
        
        let esperando = this.espera.shift();
        if (esperando != undefined) {
            this.caixas[indice] = esperando;
        }
        return true;
    /*    
        if (this.caixas[indice] == null) {
            if (indice <= this.caixas.length) {
                if (this.espera.length > 0) {
    
                    this.caixas[indice] = this.espera.shift();
                    return true;
                }
            }
        } else {
            return false;
        }
    */    
    }

    //se o caixa estiver ocupado, retira a pessoa do caixa
    finalizarAtendimento(indice: number): boolean {

        if(this.caixas[indice] == null) {
            console.log("Atendimento já foi finalizado!");
            return false;
        }

        if(indice > this.caixas.length) {
            console.log("Esse caixa não existe");
            return false;
        }

        this.caixas[indice] = null;
        return true;
        /*
        if (this.caixas[indice] !== null) {
            if (indice <= this.caixas.length) {

                this.caixas[indice] = null;
                return true;
            }
        } else {
            return false;
        }
        */
    }

    toString() {
        let str = "caixas: | ";
        for (let i = 0; i < this.caixas.length; i++) {
            let pessoa = this.caixas[i];
            str += i + ": ";
            //str += pessoa !== null ? pessoa.toString : "----";
            if (pessoa == null) {
                str += "vazio";
            } else {
                str += pessoa.toString();
            }
            str += " |";
        }
        str += "\nespera: ";
        for (let pessoa of this.espera) {
            str += pessoa.toString() + " ";
        }
        return str;
    }
}

let banco = new Banco(3);
console.log("" + banco);

let pessoa1 = new Pessoa("Anderson");
let pessoa2 = new Pessoa("Alice");
let pessoa3 = new Pessoa("Fátima");
let pessoa4 = new Pessoa("Robson");

console.log("-----------");

banco.chegarPessoa(pessoa1);
banco.chegarPessoa(pessoa2);
banco.chegarPessoa(pessoa3);
banco.chegarPessoa(pessoa4);

console.log("" + banco);

console.log("-----------");

banco.chamarNoCaixa(2);
banco.chamarNoCaixa(0);
banco.chamarNoCaixa(1);
console.log("" + banco);

console.log("-----------");

banco.finalizarAtendimento(2);
console.log("" + banco);

console.log("-----------");

banco.finalizarAtendimento(2);
console.log("" + banco);

console.log("-----------");

banco.chamarNoCaixa(2);
console.log("" + banco);