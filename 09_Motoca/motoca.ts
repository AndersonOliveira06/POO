class Pessoa {
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


class Motoca {
    private pessoa: Pessoa | null;
    power: number;
    time: number;

    constructor(power: number) {
        this.power = power;
        this.time = 0;
        this.pessoa = null;
    }
    
    comprarTempo(time: number): void {
        this.time = time;
    }
    
    
    dirigir(time: number): void | null {
        //verificar se existe tempo
        if (this.time == 0) {
            console.log("É necessário comprar tempo para dirigir");
            return;
        }
        
        //verificar idade
        if(this.pessoa != null) {
            let idade = this.pessoa.idade;
            if (idade > 10) {
                console.log("Muito grande pra andar de motinha, arranje outra coisa pra fazer");
                return;
            }
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
        if(this.pessoa == null) {
            console.log("Não possui ninguém na moto para buzinar");
            return;
        }

        let res: string = "p";
        for (let i = 0; i < this.power; i++) {
            res += "e";
        }
        //return res + "m";
        console.log(res + "m");       
    }
    
    subirNaMoto(pessoa: Pessoa): boolean {
        if (this.pessoa != null) {
            console.log("Já tem gente na moto, não pode subir agora");
            return false;
        }
        this.pessoa = pessoa;
        return true;
    }
    
    descerDaMoto(): Pessoa | null {
        if (this.pessoa == null) {
            console.log("Não tem ninguém em cima da moto");
            return null;            
        }

        this.time = 0;
        let pessoa = this.pessoa;
        this.pessoa = null;
        return pessoa;
    }

    toString(): string {
        return `Potência: ${this.power}, minutos: ${this.time}, pessoa: ${this.pessoa}`;
    }
}


//subindo e buzinando
console.log("//Case - Subindo e buzinando");

let motoca1 = new Motoca(4);
console.log("" + motoca1);

motoca1.buzinar();

motoca1.subirNaMoto(new Pessoa("Neymar", 5));
console.log("" + motoca1);

motoca1.buzinar();

motoca1.subirNaMoto(new Pessoa("Gabriel Jesus", 7));
console.log("" + motoca1);

console.log("//// ----- \\\\");



//subindo e buzinando - 02
console.log("//Case - Subindo e buzinando - 02");

let motoca2 = new Motoca(5);
console.log("" + motoca2);

motoca2.subirNaMoto(new Pessoa("Gabigol", 9));
console.log("" + motoca2);

motoca2.buzinar();

console.log("//// ----- \\\\");



//subindo e trocando
console.log("//Case - Subindo e trocando");

let motoca3 = new Motoca(7);
motoca3.subirNaMoto(new Pessoa("Lucas Paquetá", 3));
console.log("" + motoca3);

motoca3.descerDaMoto();
motoca3.descerDaMoto();

motoca3.subirNaMoto(new Pessoa("Casemiro", 5));
console.log("" + motoca3);

console.log("//// ----- \\\\");



//dirigindo
console.log("//Case - Dirigindo");

let motoca4 = new Motoca(9);
motoca4.subirNaMoto(new Pessoa("Marquinhos", 9));

motoca4.dirigir(10);

motoca4.comprarTempo(40);
console.log("" + motoca4);

motoca4.dirigir(20);
console.log("" + motoca4);

console.log("//// ----- \\\\");



//idade inadequada
console.log("//Case - Idade inadequada");

let motoca5 = new Motoca(3);
motoca5.comprarTempo(20);
motoca5.subirNaMoto(new Pessoa("Thiago Silva", 25));

motoca5.dirigir(15);
console.log("" + motoca5);

console.log("//// ----- \\\\");



//acabou o tempo
console.log("//Case - Acabou o tempo");

let motoca6 = new Motoca(9); 
motoca6.comprarTempo(20);
motoca6.subirNaMoto(new Pessoa("Vinicius Júnior", 7));

motoca6.dirigir(15);
console.log("" + motoca6);

motoca6.dirigir(10);

console.log("//// ----- \\\\");



