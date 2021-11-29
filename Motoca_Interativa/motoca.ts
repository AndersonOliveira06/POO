const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x: any) => process.stdout.write("" + x);

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
        if (this.pessoa == null) {
            console.log("Não tem ninguém para comprar tempo");
        } else {
            this.time = time;
        }
    }
    
    
    dirigir(time: number): void | null {
        if (this.pessoa == null) {
            console.log("Não tem ninguém para dirigir");
        } else {
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



class Interativo {

    create(): Motoca {
        write("Digite o power da moto: ");
        let power = +input();
        let moto = new Motoca(power);
        return moto;
    }
    
    mostrar_ajuda() {
        write("Comandos:\n");
        write(" init <power>: cria uma nova motoca\n");
        write(" show: mostra a motoca\n");
        write(" comprar <quantidade>: faz a criança comprar tempo para pilotar\n");
        write(" dirigir <tempo>: faz a criança pilotar\n");
        write(" buzinar: faz a moto buzinar\n");
        write(" subir <nome> <idade>: faz a criança subir na moto\n");
        write(" descer: faz a criança descer da moto\n");
        write(" sair: sai da interação\n");
    }

    interacao() {
        let moto = this.create();   
        this.mostrar_ajuda();     
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "sair") {
                break;
            } else if (words[0] == "ajuda") {
                this.mostrar_ajuda();
            } else if (words[0] == "comprar") {
                let quantidade = +words[1];
                moto.comprarTempo(quantidade);
            } else if (words[0] == "dirigir") {
                let tempo = +words[1];
                moto.dirigir(tempo);
            } else if (words[0] == "buzinar") {
                moto.buzinar();
            } else if (words[0] == "subir") {
                let nome = words[1];
                let idade = +words[2];
                moto.subirNaMoto(new Pessoa(nome, idade));
            } else if (words[0] == "descer") {
                moto.descerDaMoto();
            } else if (words[0] == "show") {
                write("" + moto + "\n");
            } else if (words[0] == "init") {
                let power = +words[1];
                moto = new Motoca(power);
            } else {
                console.log("Comando inválido");
            }
        }
    }
}

let controle = new Interativo();
controle.interacao();

