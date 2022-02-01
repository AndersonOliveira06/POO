
const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x: any) => process.stdout.write("" + x);


class Fone {
    private id: string;
    private number: string;

    constructor(id: string, number: string) {
        this.id = id;
        this.number = number;
    }


    public validate(): boolean {
        let valid = "0123456789()-.";
        for (let i = 0; i < this.number.length; i++) {
            if (valid.indexOf(this.number[i]) == -1) {
                return false;
            }
        }
        return true;
    }


    public isValid(): boolean {
      if (this.validate() == false) {
        return false;
      } else {
        return true;          
      }   
    }

    public getId() {
        return this.id;
    }

    public setId(id: string) {
        this.id = id;
    }

    public getNumber() {
        return this.number;
    }

    public setNumber(number: string) {
        this.number = number;
    }

    public toString() {
        return `${this.id}: ${this.number}`;
    }
}

class Contato {
    private nome: string;
    private fones: Array<Fone>;

    constructor(nome: string, fones: Array<Fone>) {
        this.nome = nome;
        this.fones = [];
        for(let fone of fones) {
            this.addFone(fone);
        }
    }

    addFone(fone: Fone) {
        if(fone.isValid() == false ) {
            write("Telefone Inválido!\n");
        } else {
            this.fones.push(fone);
        }
    }

    removerFone(index: number) {
        if(index > this.fones.length) {
            write("Esse Telefone não existe!\n");
        } else {
            this.fones.splice(index, 1);
        }
    }
    
    public getName() {
        return this.nome;
    }

    public setName(nome: string) {
        this.nome = nome;
    }

    public getFones() {
        return this.fones;
    }

    public setFones(fones: Array<Fone>) {
        this.fones = [];
        for (let fone of fones) {
            this.addFone(fone);
        }
    }

    public toString() {
        let nome = `- ${this.nome}`;

        if(this.fones.length == 0) {
            return nome;
        } else {
            let count = 1;
            for(let i = 0; i < this.fones.length; i++ ) {
            nome += " [" + count * i + ": " + this.fones[i] + "] ";
            }
            return nome;
        }
    }

}

class Interativo {

    create(): Contato {
        write("Digite o nome do contato: ");
        let nome = input();
        let contato = new Contato(nome, []);
        return contato;
    }
    
    mostrar_ajuda() {
        write("Comandos:\n");
        write(" init <nome> : cria um novo contato\n");
        write(" show: mostra o contato\n");
        write(" adicionar <id> <número>: adiciona um telefone ao contato\n");
        write(" remover <índice>: remove o telefone pelo índice\n");
        write(" sair: sai do jogo\n");
    }

    interacao() {
        let contato = this.create();   
        this.mostrar_ajuda();     
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "sair") {
                break;
            } else if (words[0] == "ajuda") {
                this.mostrar_ajuda();
            } else if (words[0] == "adicionar") {
                let id = words[1];
                let num = words[2];
                let fone = new Fone (id, num); 
                contato.addFone(fone);
            } else if (words[0] == "remover") {
                let index = +words[1];
                contato.removerFone(index);
            } else if (words[0] == "show") {
                write("" + contato + "\n");
            } else if (words[0] == "init") {
                let name = words[1];
                contato = new Contato(name, []);
            } else {
                console.log("Comando inválido");
            }
        }
    }
}

let contato = new Interativo();
contato.interacao();

