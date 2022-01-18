class Aluno {
    private nome: string;
    private disciplinas: Map<string, Disciplina>

    constructor(nome: string) {
        this.nome = nome;
        this.disciplinas = new Map<string, Disciplina>();
    }

    public getNome(): string {
        return this.nome;
    }

    public addDisciplina(disciplina: Disciplina): void {
        if(this.disciplinas.has(disciplina.getNome())) {
            return
        } else {
            this.disciplinas.set(disciplina.getNome(), disciplina);
            disciplina.addAluno(this);
        }
    }

    public removerDisciplina(key: string): void {
        let disciplina: undefined | Disciplina = this.disciplinas.get(key);
        if(disciplina !== undefined) {
            this.disciplinas.delete(key);
            disciplina.removerAluno(this.nome);
        }
        
    }

    public getDisciplinas(): string[] {
        return [...this.disciplinas.keys()];
    }

    public toString(): string {
        let keys = this.disciplinas.keys();
        return this.nome + ": (" + [...keys].join(", ") + ")";

    }
}

class Disciplina {
    private nome: string;
    private alunos: Map<string, Aluno>;
    constructor(nome: string) {
        this.nome = nome;
        this.alunos = new Map<string, Aluno>();
    }

    public getNome(): string {
        return this.nome;
    }

    public addAluno (aluno: Aluno): void {
        if(this.alunos.has(aluno.getNome())) {
            return
        } else {
            this.alunos.set(aluno.getNome(), aluno);
            aluno.addDisciplina(this);
        }
    }

    public removerAluno(key: string): void {
        let aluno: undefined | Aluno = this.alunos.get(key);
        if(aluno !== undefined) {
            this.alunos.delete(key);
            aluno.removerDisciplina(this.nome);
        }
    }

    public getAlunos(): string[] {
        return [...this.alunos.keys()];
    }

    public toString(): string {
        let keys = this.alunos.keys();
        return this.nome + ": (" + [...keys].join(", ") + ")";

    }
}

class Universidade {
    private alunos: Map<string, Aluno>;
    private disciplinas: Map<string, Disciplina>;

    constructor() {
        this.alunos = new Map<string, Aluno>();
        this.disciplinas = new Map<string, Disciplina>();
    }

    public addAluno(aluno: Aluno): void {
        let chave = aluno.getNome();
        if(this.alunos.has(chave)) {
            return
        } else {
            this.alunos.set(chave, aluno);
        }
    }

    public addDisciplina(disciplina: Disciplina): void {
        let chave = disciplina.getNome();
        if(this.disciplinas.has(chave)) {
            return 
        } else {
            this.disciplinas.set(chave, disciplina);
        }
    }

    public getAluno(nome: string): Aluno {
        let aluno: undefined | Aluno = this.alunos.get(nome);
        if(aluno === undefined) {
            throw new Error("Aluno não encontrado");
        } else {
            return aluno;
        }
    }

    public getDisciplina(nome: string): Disciplina {
        let disciplina: undefined | Disciplina = this.disciplinas.get(nome);
        if(disciplina === undefined) {
            throw new Error("Disciplina não encontrada");
        } else {
            return disciplina;
        }
    }

    public vincular(nome_aluno: string, nome_disciplina: string): void {
        this.getAluno(nome_aluno).addDisciplina(this.getDisciplina(nome_disciplina));
    }

    public desvincular(nome_aluno: string, nome_disciplina: string): void {
        this.getAluno(nome_aluno).removerDisciplina(nome_disciplina);
    }

    public removerAluno(nome: string): void {
        let aluno = this.getAluno(nome);
        for(let disc of aluno.getDisciplinas()) {
            aluno.removerDisciplina(disc);
        }
        this.alunos.delete(nome);
    }
    
    public removerDisciplina(nome: string): void {
        let disciplina = this.getDisciplina(nome);
        for(let aluno of disciplina.getAlunos()) {
            disciplina.removerAluno(aluno);
        }
        this.disciplinas.delete(nome);
    }

    public toString(): string {
        let alunos = [...this.alunos.values()].map(a => a.toString());
        let disciplina = [...this.disciplinas.values()].map(d => d.toString());
        return "UNIVERSIDADE\n" + "Alunos:\n " + alunos.join("\n") + "\nDisciplinas:\n " + disciplina.join("\n");        
    }
}