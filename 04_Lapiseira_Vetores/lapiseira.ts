class Grafite {
    calibre: number;
    dureza: string;
    tamanho: number;
    constructor(calibre: number, dureza: string, tamanho: number) {
        this.calibre = calibre;
        this.dureza = dureza;
        this.tamanho = tamanho;
    }

    gastoPorFolha(): number {
        if (this.dureza === 'HB')
            return 1;
        if (this.dureza === '2B')
            return 2;
        if (this.dureza === '4B')
            return 4;
        if (this.dureza === '6B')
            return 6;
        return 0;
    }

    toString(): string {
        //return "Grafite: " + this.calibre + ":" + this.dureza + ":" + this.tamanho;
        return `Grafite ${this.calibre}:${this.dureza}:${this.tamanho}`;
    }
}

//agregação
class Lapiseira {
    calibre: number;
    grafites: Grafite[];
    capacidade: number;

    constructor(calibre: number, capacidade: number) { //é a lapiseira que cria o grafite?
        this.calibre = calibre;
        this.grafites = [];
        this.capacidade = capacidade;
    }

    setGrafite(grafite: Grafite): boolean {
        if (this.grafites.length == this.capacidade) {
            console.log("A lapiseira está cheia");
            return false;
        }
        if (grafite.calibre != this.calibre) {
            console.log("O grafite não é compatível com a lapiseira");
            return false;
        }
        this.grafites.push(grafite);
        return true;
    }

    removerGrafite(): Grafite | null {
        if (this.grafites.length == 0) {
            console.log("A lapiseira não possui um grafite");
            return null;
        }
        let grafite = this.grafites.shift();
        if (grafite === undefined) {
            return null;
        }
        //this.grafites = null;
        return grafite;
    }

    escrever(folhas: number): any {
        //verificar se existe grafite
        if (this.grafites == []) {
            console.log("A lapiseira não possui um grafite");
            return null;
        }
        let gasto = this.grafites[0].gastoPorFolha() * folhas;
        if (gasto <= this.grafites[0].tamanho) {
            console.log("Escrita concluida");
            this.grafites[0].tamanho -= gasto;
        } else {
            let realizado = this.grafites[0].tamanho / this.grafites[0].gastoPorFolha()
            console.log("Escrita parcial: " + realizado + " folhas");
            this.grafites[0].tamanho = 0;
        }
        /*
        let graf = this.grafites.shift();
        if (graf === undefined) {
            return null;
        }
        */
        if (this.grafites[0].tamanho === 0) 
            return this.removerGrafite();
           
      


    }

    
    toString(): string {
        if (this.grafites.length == 0) {
            return "Lapiseira Vazia"
        }
        let saida = `(${this.grafites[0].calibre}, ${this.grafites[0].dureza}, ${this.grafites[0].tamanho}) [ `;
        for(let i = 1; i < this.grafites.length; i++) {
            saida += `(${this.grafites[i].calibre}, ${this.grafites[i].dureza}, ${this.grafites[i].tamanho}) `;
        }

        return saida + "]";
        //return `Potência: ${this.power}, minutos: ${this.time}, pessoa: ${this.pessoa}`;
    }
    
}

let pentel = new Lapiseira(0.5, 4);
pentel.setGrafite(new Grafite(0.5, "HB", 40));
pentel.setGrafite(new Grafite(0.5, "2B", 30));
pentel.setGrafite(new Grafite(0.5, "4B", 20));
pentel.setGrafite(new Grafite(0.5, "6B", 10));
console.log(pentel.toString());

pentel.escrever(20);
console.log(pentel.toString());

pentel.escrever(30);
console.log(pentel.toString());

pentel.removerGrafite();
console.log(pentel.toString());

