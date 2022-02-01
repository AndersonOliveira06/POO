class Paciente {
    private nome: string;
    private doenca: string;
    private medicos: Map<string, Medico>

    constructor(nome: string, doenca: string) {
        this.nome = nome;
        this.doenca = doenca;
        this.medicos = new Map<string, Medico>();
    }

    public getDoenca(): string {
        return this.doenca;
    }

    public getNome(): string {
        return this.nome;
    }

    public addMedico(medico: Medico) {
        if(this.medicos.has(medico.getEspecialidade())) {
            return "Já existe outro medico da especialidade " + medico.getEspecialidade();
            
        } else {
            this.medicos.set(medico.getNome(), medico);
            medico.addPaciente(this);
        }
    }

    public removerMedico(key: string): void {
        let medico: undefined | Medico = this.medicos.get(key);
        if(medico !== undefined) {
            this.medicos.delete(key);
            medico.removerPaciente(this.nome);
        }
        
    }

    public getMedicos(): string[] {
        return [...this.medicos.keys()];
    }

    public toString(): string {
        let values = this.medicos.values();
        return this.nome + " - " + this.doenca +  ": Médicos (" + [...values].join(", ") + ")";

    }
}

class Medico {
    private nome: string;
    private especialidade: string;
    private pacientes: Map<string, Paciente>;

    constructor(nome: string, especialidade: string) {
        this.nome = nome;
        this.especialidade = especialidade;
        this.pacientes = new Map<string, Paciente>();
    }

    public getNome(): string {
        return this.nome;
    }

    public getEspecialidade(): string {
        return this.especialidade;
    }

    public addPaciente (paciente: Paciente): void {
        if(this.pacientes.has(paciente.getNome())) {
            return
        } else {
            this.pacientes.set(paciente.getNome(), paciente);
            paciente.addMedico(this);
        }
    }

    public removerPaciente(key: string): void {
        let paciente: undefined | Paciente = this.pacientes.get(key);
        if(paciente !== undefined) {
            this.pacientes.delete(key);
            paciente.removerMedico(this.nome);
        }
    }

    public getPacientes(): string[] {
        return [...this.pacientes.keys()];
    }

    public toString(): string {
        let values = this.pacientes.values();
        return this.nome + " - " + this.especialidade + ": Pacientes (" + [...values].join(", ") + ")";

    }
}

class Hospital {
    private pacientes: Map<string, Paciente>;
    private medicos: Map<string, Medico>;

    constructor() {
        this.pacientes = new Map<string, Paciente>();
        this.medicos = new Map<string, Medico>();
    }

    public addPaciente(paciente: Paciente): void {
        let chave = paciente.getNome();
        if(this.pacientes.has(chave)) {
            return
        } else {
            this.pacientes.set(chave, paciente);
        }
    }

    public addMedico(medico: Medico): void {
        let chave = medico.getNome();
        if(this.medicos.has(chave)) {
            return 
        } else {
            this.medicos.set(chave, medico);
        }
    }

    public getPaciente(nome: string): Paciente {
        let paciente: undefined | Paciente = this.pacientes.get(nome);
        if(paciente === undefined) {
            throw new Error("Paciente não encontrado");
        } else {
            return paciente;
        }
    }

    public getMedico(nome: string): Medico {
        let medico: undefined | Medico = this.medicos.get(nome);
        if(medico === undefined) {
            throw new Error("Medico não encontrada");
        } else {
            return medico;
        }
    }

    public vincular(nome_paciente: string, nome_medico: string): void {
        this.getPaciente(nome_paciente).addMedico(this.getMedico(nome_medico));
    }

    public desvincular(nome_paciente: string, nome_medico: string): void {
        this.getPaciente(nome_paciente).removerMedico(nome_medico);
    }

    public removerPaciente(nome: string): void {
        let paciente = this.getPaciente(nome);
        for(let med of paciente.getMedicos()) {
            paciente.removerMedico(med);
        }
        this.pacientes.delete(nome);
    }
    
    public removerMedico(nome: string): void {
        let medico = this.getMedico(nome);
        for(let pac of medico.getPacientes()) {
            medico.removerPaciente(pac);
        }
        this.medicos.delete(nome);
    }

    public toString(): string {
        let pacientes = [...this.pacientes.values()].map(a => a.toString());
        let medicos = [...this.medicos.values()].map(d => d.toString());
        return "HOSPITAL\n" + "Pacientes:\n " + pacientes.join("\n") + "\nMedicos:\n " + medicos.join("\n");        
    }
}

console.log("--------------CASE INSERIR--------------");

let hospital = new Hospital();
hospital.addPaciente(new Paciente("Julio", "Gripe"));
hospital.addPaciente(new Paciente("André", "Rinite"));
hospital.addPaciente(new Paciente("João", "Dor de Barriga"));
hospital.addPaciente(new Paciente("Carlos", "Covid"));

hospital.addMedico(new Medico("Dr. Paulo", "Médico Geral"));
hospital.addMedico(new Medico("Dr. Alan", "Cirurgia"));
hospital.addMedico(new Medico("Dr. Pedro", "Alergologia"));
hospital.addMedico(new Medico("Dr. César", "Médico Geral"));

console.log("" + hospital);

console.log("\n");

console.log("--------------CASE VINCULAR--------------");

hospital.vincular("Julio", "Dr. Paulo");
hospital.vincular("Julio", "Dr. Alan");
hospital.vincular("Julio", "Dr. Pedro");
hospital.vincular("Carlos", "Dr. César");
hospital.vincular("Carlos", "Dr. Alan");
hospital.vincular("João", "Dr. Alan");
hospital.vincular("André", "Dr. Pedro");

console.log("" + hospital);