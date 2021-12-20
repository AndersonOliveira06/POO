abstract class Veiculo {
    estado: boolean = false;
    tipo: string;
    gasolina: number;
    power: number;

    constructor(tipo: string, gasolina: number, power: number) {
        this.tipo = tipo;
        this.gasolina = gasolina;
        this.power = power;
    }


    ligarVeiculo(): void {
        if(this.estado == true) {
            console.log(this.tipo + " já está ligado");
        } else if(this.gasolina == 0) {
            console.log("Pra ligar precisa botar gasolina em!");
        } else {
            this.estado = true;
            console.log(this.tipo + " ligou");
        }
    }

    desligarVeiculo(): void {
        if(this.estado == false) {
            console.log(this.tipo + " já está desligado");
        } else {
            this.estado = false;
            console.log(this.tipo + " desligou");
        }
    }

    public abstract qntdPneu(): number;

    public abstract buzinar(): void;


    public toString() {
        return this.tipo + ": " + (this.estado ? "Ligado" : "Desligado"); 
    }
}

class Carro extends Veiculo {
    nome: string;
    qntdPortas: number;

    constructor(nome: string, qntdPortas: number, gasolina: number, power: number) {
        super("Carro", gasolina, power);
        this.nome = nome;
        this.qntdPortas = qntdPortas;
    }

    dirigir(distancia_Km: number): void {
        if(this.estado == false) {
            console.log("Não dá pra dirigir sem ligar o " + this.tipo + ", garotinho(a)");
        } else if(this.gasolina == 0) {
            console.log("Bora botar gasolina em!");
        } else {
            console.log(this.tipo + " dirigindo");
            this.gasolina -= distancia_Km/this.power;    
            console.log("O " + this.tipo + " percorreu: " + distancia_Km + " Km");
        }

    }

    buzinar(): void {
        if(super.estado) {
            console.log("Carro só buzina ligado");
        } else {
            let res: string = "p";
            for (let i = 0; i < this.power; i++) {
                res += "e";
            }
            console.log(res + "m");  
        }
    }

    qntdPneu(): number {
        return 4;        
    }

    public toString() {
        return this.nome + " | " + this.gasolina + " litros | Power: " + this.power + " | " + this.qntdPortas + " portas - " + super.toString();
    }
}


class Moto extends Veiculo {
    private nome: string;

    constructor(nome: string, gasolina: number, power: number) {
        super("Moto", gasolina, power);
        this.nome = nome;
    }

    dirigir(distancia_Km: number): void {
        if(this.estado == false) {
            console.log("Não dá pra dirigir sem ligar a " + this.tipo + ", garotinho(a)");
        } else if(this.gasolina == 0) {
            console.log("Bora botar gasolina em!");
        } else {
            console.log(this.tipo + " dirigindo");
            this.gasolina -= distancia_Km/this.power;    
            console.log("A " + this.tipo + " percorreu: " + distancia_Km + " Km");
        }

    }

    qntdPneu(): number {
        return 2;     
    }

    buzinar(): void {
        if(super.estado) {
            console.log("Moto só buzina ligado");
        } else {
            let res: string = "b";
            for (let i = 0; i < this.power; i++) {
                res += "i";
            }
            console.log(res);  
        }
    }
    
    public toString() {
        return this.nome + " | " + this.gasolina + " litros | Power: " + this.power + " - " + super.toString();
    }

}

console.log("---------------  MOTO  ---------------");
let ducati = new Moto("Ducati", 50, 20);
console.log("" + ducati);

console.log("\n");

ducati.ligarVeiculo();

console.log("\n");

ducati.buzinar();

console.log("\n");

ducati.dirigir(10);
console.log("" + ducati);

console.log("\n");


console.log("---------------  MOTO  ---------------");
let volvo = new Carro("Volvo", 4, 70, 10);
console.log("" + volvo);

console.log("\n");

volvo.ligarVeiculo();

console.log("\n");

volvo.buzinar();

console.log("\n");

volvo.dirigir(7);
console.log("" + volvo);


