const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x: any) => process.stdout.write("" + x);

class Cliente {
    id: string | null;

    constructor(id: string | null) {
        this.id = id;
    }

    toString() {
        return `${this.id}` ;
    }
}

class Sala {
    cadeiras: Map<number, Cliente>;

    constructor(capacidade: number) {
        this.cadeiras = new Map<number, Cliente>();
        for(let i = 0; i < capacidade; i++ ) {
            this.cadeiras.set(i, new Cliente(null));
        }
    }
    

    buscarNome(id: string | null): number | string {
        for(let value of this.cadeiras.values()) {
            if(value.id !== null && id == value.id) {       
                return value.id;
            }
        } 
        return -1;
    }


    fazerReserva(cliente: Cliente, numCadeira: number): boolean {

        let chave = this.cadeiras.get(numCadeira);

        if(numCadeira > this.cadeiras.size) {
            write("Esse número de cadeira não existe\n");
            return false;
        }

        if(chave !== undefined) {
            for(let key of this.cadeiras.keys()) {
                if(numCadeira === key && chave.id !== null) {
                    write("Falha: Cadeira já está Ocupada\n");
                    return false;
                }
            }
        }
    
        for(let value of this.cadeiras.values()) {
            if (cliente.id == value.id) {
                write("Falha: Cliente já está no Cinema\n");
                return false;
            }
        }
        
        this.cadeiras.set(numCadeira, cliente);
        return true;
    }

    cancelarReserva(numCadeira: number) {
        if(this.cadeiras === undefined) {
            return false;
        } else {
            if(this.cadeiras.has(numCadeira)) {
                this.cadeiras.set(numCadeira, new Cliente(null));
            }
        }
        
        // let posicao = this.cadeiras.get();
        // if (posicao == -1) {
        //     return false;
        // } else {
        //     this.cadeiras[posicao] = null;
        //     return true;
            
        // }
    }


    public toString() {

        let str = "[ ";

        if(this.cadeiras === undefined) {
            return "erro";
        }

        if(this.cadeiras.size <= 0) {
            return "[]";
        } else {
            for(let value of this.cadeiras.values()) {
                if(value.id !== null) {
                    str += value + " | ";
                } else {
                    str += " - " ;
                }
            }
            str += " ]"
        }
        return str;
    }
    
}



class Interativo {

    create(): Sala {
        write("Digite a quantidade de cadeiras da Sala de Cinema: ");
        let quantidade = +input();
        let sala = new Sala(quantidade);
        return sala;
    }
    
    mostrar_ajuda() {
        write("Comandos:\n");
        write(" show: mostra a sala\n");
        write(" cancelar <número da cadeira>: cancela a reserva do cliente\n");
        write(" reservar <nome> <telefone> <número da cadeira>: reserva a cadeira para o cliente\n");
        write(" buscar <nome>: mostra o numero da cadeira que o cliente está\n");
        write(" sair: sai da sala\n");
    }

    interacao() {
        let sala = this.create();   
        this.mostrar_ajuda();     
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "sair") {
                break;
            } else if (words[0] == "ajuda") {
                this.mostrar_ajuda();
            } else if (words[0] == "cancelar") {
                let numCadeira = +words[1];
                sala.cancelarReserva(numCadeira);
            } else if (words[0] == "reservar") {
                let nome = words[1];
                let numCadeira = +words[2];
                sala.fazerReserva(new Cliente(nome), numCadeira);
            } else if (words[0] == "show") {
                write(sala.toString() + "\n");
            } else if (words[0] == "buscar") {
                let nome = words[1];
                write(sala.buscarNome(nome) + "\n");
            } else {
                console.log("Comando inválido\n");
            }
        }
    }
}

let sala = new Interativo();
sala.interacao();

/*
let cinema = new Sala(5);
cinema.fazerReserva(new Cliente("Anderson", "65198"), 0);
console.log("" + cinema);

cinema.cancelarReserva("Anderson");
console.log("" + cinema);
*/