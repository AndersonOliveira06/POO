class Cliente {
    id: string;
    telefone: string;

    constructor(id: string, telefone: string) {
        this.id = id;
        this.telefone = telefone;
    }

    toString() {
        return `${this.id}: ${this.telefone}` ;
    }
}

class Sala {
    cadeiras: Array< Cliente | null >;

    constructor(capacidade: number) {
        this.cadeiras = [];
        for(let i = 0; i < capacidade; i++ ) {
            this.cadeiras.push(null);
        }
    }
    
    fazerReserva(id: string, telefone: string, numCadeira: number): boolean {
        if(numCadeira > this.cadeiras.length) {
            console.log("Esse número de cadeira não existe");
            return false;
        }

        for(let i = 0; i < this.cadeiras.length; i++) {
            let cli = this.cadeiras[i];
            if(cli !== null) {
                if(id == cli.id) {
                    console.log("Falha: Cliente já está no Cinema");
                    return false;
                }
            }
        }

        if(this.cadeiras[numCadeira] !== null) {
            console.log("Falha: Cadeira já está Ocupada");
            return false;
        }

        let cliente = new Cliente(id, telefone);
        if(cliente != undefined) {
            this.cadeiras[numCadeira] = cliente;
        }

        return true;
    }

    cancelarReserva(id: string) {

        for (let c = 0; c < this.cadeiras.length; c++) {
            let cli = this.cadeiras[c];
            if(cli == null) {
                console.log("Falha: Não existe reserva nessa cadeira");
                break;
            }
        }

        for (let j = 0; j < this.cadeiras.length; j++) {
            let cli = this.cadeiras[j];
            if(cli !== null && cli.id !== id ) {
                console.log("Falha: Não existe essa pessoa na sala");
                break;
            }
        }

        for (let i = 0; i < this.cadeiras.length; i++) {
            let cliente = this.cadeiras[i];
            if(cliente !== null && id == cliente.id) {
                this.cadeiras[i] = null;
                break;
            }
        }
    }


    toString() {

        if(this.cadeiras.length <= 0) {
            return "[]";
        }

        let str = "[ ";
        for(let i = 0; i < this.cadeiras.length; i++) {
            let cliente = this.cadeiras[i];
            if(cliente !== null) {
                str += cliente.toString();
            } else {
                str += "- " ;
            }
        }

        str += " ]"
    }
    
}

let cinema = new Sala(5);
cinema.fazerReserva("anderson", "86152", 2);
console.log(cinema.toString());