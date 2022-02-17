const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x: any) => process.stdout.write("" + x);

class Cliente {
    private contas: Conta[];
    private id: string; 

    constructor(clienteId: string) {
        this.id = clienteId;
        this.contas = [];
    }

    addConta(conta: Conta) {
        for(let i = 0; i < this.contas.length; i++) {
            if(this.contas[i].getId() === conta.getId()){
                write("Essa conta já existe");
            } else {
                this.contas.push(conta);
            }
        }
    }

    public getClientId(): string {
        return this.id;
    }
    public setClientId(clienteId: string): void {
        this.id = clienteId;
    }

    public getContas(): number[] {
    let idContas: number[] = []

    for(let idConta of this.contas){
        idContas.push(idConta.getId())
    }

    return idContas
    }

    public setContas(contas: Array<Conta>): void {
        this.contas = contas;
    }

    public toString() {
        return `- ${this.id} [ ${this.getContas()} ]`;
        /*
        let start = `-  ${this.clienteId}  [`;
        for(let conta of this.contas) {
            start += `${conta.getId()}, `;
        }

        return start + "]";
        */
    }

}

abstract class Conta {
    protected saldo: number = 0.00;
    protected clientId: string;
    protected id: number;
    protected tipo: string;

    constructor(id: number, clienteId: string, tipo: string) {
        this.id = id;
        this.clientId = clienteId;
        this.saldo;
        this.tipo = tipo;
    }

    public abstract updateMensal(): void;
    
    public depositar(valor: number) { 
        this.saldo += valor;
    }

    public transfer(destino: Conta, valor: number) {
        if(this.saldo >= valor) {
            destino.saldo += valor;
            this.saldo -= valor;
        } else {
            write("TRANSFERENCIA NEGADA - SALDO INSUFICIENTE");
        }
    }

    public sacar(valor: number) {
        if(this.saldo >= valor) {
            this.saldo -= valor;
        } else {
            write("SAQUE NEGADO - SALDO INSUFICIENTE");
        }
    }
    
    public getSaldo(): number {
        return this.saldo;
    }

    public getClientId(): string {
        return this.clientId;
    }

    public getId(): number {
        return this.id;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public toString() {
        return this.id + " - " + this.clientId + ": R$" + this.saldo + " | " + this.tipo;
    }
}

class ContaCorrente extends Conta {

    constructor(id: number, idClient: string) {
        super(id, idClient, "CC");
    }

    public updateMensal(): void {
        this.saldo -= 20; 
    }

}

class ContaPoupanca extends Conta {
    constructor(id: number, idClient: string) {
        super(id, idClient, "CP");
    }

    public updateMensal(): void {
        this.saldo += this.saldo * 0.01;
    }

}


class AgenciaBancaria {
    private contas: Map<number, Conta>;
    private clientes: Map<string, Cliente>;
    private nextContaId: number = 0;

    getConta(id: number): Conta {
        let conta: undefined | Conta = this.contas.get(id);
        if(conta === undefined) {
            throw new Error("A conta não existe");
        } else {
            return conta;
        }
    }

    constructor() {
        this.contas = new Map<number, Conta>();
        this.clientes = new Map<string, Cliente>();
    }

    public addCliente(clienteId: string) {

        if(this.clientes.has(clienteId)) {
            write("Cliente já existe");
        } else {
            let cliente = new Cliente(clienteId);
            
            let CC = new ContaCorrente(this.nextContaId, clienteId);
            this.nextContaId += 1;

            let CP = new ContaPoupanca(this.nextContaId, clienteId);
            this.nextContaId += 1;
            
            cliente.addConta(CC);
            cliente.addConta(CP);

            this.clientes.set(clienteId, cliente);
            
            this.contas.set(CC.getId(), CC);
            this.contas.set(CP.getId(), CP);
            
        }
    }

    public depositar(idConta: number, valor: number) {
        let conta: undefined | Conta = this.contas.get(idConta);
        if(conta === undefined) {
            throw new Error("CONTA NÃO EXISTENTE");
        } else {
            conta.depositar(valor);
        }
    }

    public updateMensal() {
        for(let conta of this.contas.values()) {
            conta.updateMensal();
        }
    }

    public transferir(contaDe: number, contaPara: number, valor: number) {
        let contaInicial: undefined | Conta = this.contas.get(contaDe);
        let contaFinal: undefined | Conta = this.contas.get(contaPara);
        if(contaInicial === undefined || contaFinal === undefined) {
            throw new Error("OPERAÇÃO CANCELADA - UMA DAS CONTAS NÃO EXISTE");
        } else {
            contaInicial.transfer(contaFinal, valor);
        }
    }

    public sacar(idConta: number, valor: number) {
        let conta: undefined | Conta = this.contas.get(idConta);
        if(conta === undefined) {
            throw new Error("CONTA NÃO EXISTENTE");
        } else {
            conta.sacar(valor);
        }
    }

    public toString() {
        let clientes = [...this.clientes.values()].map(a => a.toString());
        let contas = [...this.contas.values()].map(d => d.toString());
        return "Clientes:\n" + clientes.join("\n") + "\nContas:\n" + contas.join("\n");
    }
}


class Menu {

    create(): AgenciaBancaria {
        let agencia = new AgenciaBancaria();
        return agencia;
    }
    
    mostrar_ajuda() {
        write("Comandos:\n");
        write(" adicionarcli <nome do cliente>: adiciona um novo cliente\n");
        write(" depositar <id da conta> <valor>: deposita o valor na conta indicada\n");
        write(" sacar <id da conta> <valor>: saca o valor da conta indicada\n");
        write(" updade: atualiza o valor das contas de acordo com o tipo || CC: -R$20,00 / CP: +1%\n");
        write(" transferir <id da conta remetente> <id da conta de destino> <valor>: transfere o valor de uma conta para outra\n");
        write(" show: mostra a agência\n");
        write(" sair: sai da interação\n");
    }

    interacao() {
        let agencia = this.create();   
        this.mostrar_ajuda();     
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "sair") {
                break;
            } else if (words[0] == "ajuda") {
                this.mostrar_ajuda();
            } else if (words[0] == "adicionarcli") {
                let idCli = words[1];
                agencia.addCliente(idCli);
            } else if (words[0] == "depositar") {
                let idConta = +words[1];
                let valor = +words[2];
                agencia.depositar(idConta, valor);
            } else if (words[0] == "sacar") {
                let idConta = +words[1];
                let valor = +words[2];
                agencia.sacar(idConta, valor);
            } else if (words[0] == "update") {
                agencia.updateMensal();
            } else if (words[0] == "transferir") {
                let contaInicial = +words[1];
                let contaFinal = +words[2];
                let valor = +words[3];
                agencia.transferir(contaInicial, contaFinal, valor);
            } else if (words[0] == "show") {
                write(agencia.toString() + "\n");
            } else {
                console.log("Comando inválido");
            }
        }
    }
}

let bancoNext = new Menu();
bancoNext.interacao();