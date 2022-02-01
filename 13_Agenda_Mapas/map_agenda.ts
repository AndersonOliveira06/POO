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

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getNumber(): string {
        return this.number;
    }

    public setNumber(number: string): void {
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

    addFone(fone: Fone): void {
        if(fone.isValid() == false ) {
            write("Telefone Inválido!\n");
        } else {
            this.fones.push(fone);
        }
    }

    removerFone(index: number): void {
        if(index > this.fones.length) {
            write("Esse Telefone não existe!\n");
        } else {
            this.fones.splice(index, 1);
        }
    }
    
    public getName(): string {
        return this.nome;
    }

    public setName(nome: string): void {
        this.nome = nome;
    }

    public getFones(): Fone[] {
        return this.fones;
    }

    public setFones(fones: Array<Fone>): void {
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

class Agenda {
    contatos: Map<string, Contato>;

    constructor() {
        this.contatos = new Map<string, Contato>();
    }
/*
    findPosByName(name: string) {
        for(let i = 0; i < this.contatos.length; i++) {
            if(this.contatos[i].getName() === name) {
                return this.contatos[i].getName().indexOf(name);
            }
        }
    }
*/
    findContato(name: string): Contato | null {
        let nome_do_contato = this.contatos.get(name);

        if(nome_do_contato === undefined) {
            return null;
        } else {
            if(this.contatos.has(name)) {
                return nome_do_contato;
            } else {
                return null;
            }
        }
    }

    addContato(contato: Contato): void {
        let nome_do_contato = this.contatos.get(contato.getName());

        if(this.contatos.has(contato.getName())) {
            if(nome_do_contato !== undefined) {
                for(let fone of contato.getFones()) {
                    nome_do_contato.addFone(fone);
                }
            }
        } else {
            this.contatos.set(contato.getName(), contato);
            [...this.contatos.keys()].sort((a, b) => a.localeCompare(b));
        }
    }

    removerContato(name: string) {
        this.contatos.delete(name);
    }

    pesquisar(pattern: string): Contato[] {
        let resultado = new Array<Contato>();
        for(let contato of this.contatos.values()) {
            if(contato.getName().includes(pattern)) {
                resultado.push(contato);
            } 
        }
        return resultado;
    }

    public getContatos(): Map<string, Contato> {
        return this.contatos;
    }

    public toString() {

        
        let saida = "";

        if(this.contatos === undefined) {
            return "erro";
        } 

        if(this.contatos.size <= 0) {
            return `[        ]`
        } else {
            for(let value of this.contatos.values()) {
                saida += value + "\n";
            }
        }
            
        return saida;
    }
        


}

class Interativo {

    create(): Agenda {
        let agenda = new Agenda();
        return agenda;
    }
    
    mostrar_ajuda() {
        write("Comandos:\n");
        write(" show: mostra a agenda\n");
        write(" adicionar <nome> <id> <número>: adiciona um contato na agenda\n");
        write(" remover <nome>: remove o contato pelo nome\n");
        write(" pesquisar <letras>: mostra o(os) contato(s) que tenham as letras pesquisadas\n");
        write(" achar <nome>: mostra o contato com o nome inserido\n");
        write(" sair: sai da agenda\n");
    }

    interacao() {
        let agenda = this.create();   
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
                let nome = words[1];
                let id = words[2];
                let num = words[3];
                let contato = new Contato(nome, []);
                let fone = new Fone (id, num); 
                contato.addFone(fone);
                agenda.addContato(contato);
            } else if (words[0] == "remover") {
                let name = words[1];
                agenda.removerContato(name);
            } else if (words[0] == "show") {
                write(agenda.toString() + "\n");
            } else if (words[0] == "pesquisar") {
                let pattern = words[1];
                write(agenda.pesquisar(pattern) + "\n");
            } else if (words[0] == "achar") {
                let name = words[1];
                write(agenda.findContato(name) + "\n");
            } else {
                console.log("Comando inválido");
            }
        }
    }
}

let agenda = new Interativo();
agenda.interacao();