class Kid {
    idade: number;
    name: string;

    constructor(name: string, idade: number) {
        this.name = name;
        this.idade = idade;
    }

    toString(): string {
        return `[${this.name}: ${this.idade} anos]`;
    }
}


class Trem {
    pessoas: Kid[];
    power: number;
    time: number;
    lotacao: number;

    constructor(power: number, lotacao: number) {
        this.power = power;
        this.time = 0;
        this.pessoas = [];
        this.lotacao = lotacao
    }
    
    comprarTempo(time: number): void {
        this.time = time;
    }
    
    
    dirigir(time: number): void {
        //verificar se existe ou não alguém
        if (this.pessoas.length == 0) {
            console.log("Trem Vazio");
            return;
        }

        //verificar se existe tempo
        if (this.time == 0) {
            console.log("É necessário comprar tempo para dirigir");
            return;
        }
        
        //verificar idade
        let idade = this.pessoas[0].idade;
        if (idade < 5) {
            console.log("Criança muito pequena para dirigir o Trem");
            return;
        }

        
        if(this.time >= time) {
            console.log("Corrida concluída");
            this.time -= time;
        } else {
            console.log("Andou " + this.time + " minutos e acabou o tempo");
            this.time = 0;
        }

    }
    
    buzinar(): void {
        if(this.pessoas.length == 0) {
            console.log("Não possui ninguém no Trem para buzinar");
            return;
        }

        let saida: string = "p";
        for (let i = 0; i < this.power; i++) {
            saida += "e";
        }
        //return saida + "m";
        console.log(saida + "m");       
    }
    
    subirNoTrem(pessoa: Kid): boolean {
        if (this.pessoas.length == this.lotacao) {
            console.log("Trem lotado, não pode mais entrar");
            return false;
        }
        this.pessoas.push(pessoa);
        return true;
    }
    
    descerDaMoto(): Kid | null {
        if (this.pessoas.length == 0) {
            console.log("Não tem ninguém no Trem");
            return null;            
        }

        this.time = 0;
        let kid = this.pessoas.shift();

        if (kid === undefined) {
            return null;
        }
        return kid;
    }

    toString(): string {
        if (this.pessoas.length == 0) {
            return "Trem Vazio"
        }
        let saida = `(${this.pessoas[0].name}) [ `;
        for(let i = 1; i < this.pessoas.length; i++) {
            saida += `(${this.pessoas[i].name}) `;
        }

        return saida + "]";
        //return `Potência: ${this.power}, minutos: ${this.time}, pessoa: ${this.pessoa}`;
    }
}


let trem1 = new Trem(5, 4);
trem1.subirNoTrem(new Kid("Neymar", 5));
trem1.subirNoTrem(new Kid("Gabigol", 4));
trem1.subirNoTrem(new Kid("Paquetá", 3));
trem1.subirNoTrem(new Kid("Vini Jr.", 2));
trem1.subirNoTrem(new Kid("Casemiro", 1));

console.log(trem1.toString());
