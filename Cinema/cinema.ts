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
    

    buscar(id: string): number {
        for(let i = 0; i < this.cadeiras.length; i++) {
            let cli = this.cadeiras[i];
            if(cli !== null && id == cli.id) {  
                
                return i;
            }
        }

        return -1;
    }


    fazerReserva(cliente: Cliente, numCadeira: number): boolean {
        if(numCadeira > this.cadeiras.length) {
            console.log("Esse número de cadeira não existe");
            return false;
        }
        
        if(this.cadeiras[numCadeira] !== null) {
            console.log("Falha: Cadeira já está Ocupada");
            return false;
        }

        if (this.buscar(cliente.id) != -1) {
            console.log("Falha: Cliente já está no Cinema");
            return false;
        }
        
      
        this.cadeiras[numCadeira] = cliente;
        return true;
    }

    cancelarReserva(id: string) {
        let posicao = this.buscar(id);
        if (posicao == -1) {
            this.cadeiras[posicao] = null;
            return true;
        }
        return false;
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
cinema.fazerReserva(new Cliente("Anderson", "65198"), 2);
console.log(cinema.toString());