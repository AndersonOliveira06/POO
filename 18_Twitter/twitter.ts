class Controle {
    users: Map<string, User>;

    constructor() {
        this.users = new Map<string, User>();
    }
    
    public getUser(username: string): User {
        let user: undefined | User = this.users.get(username);
        if(user === undefined) {
            throw new Error("Usuário não encontrado");
        } else {
            return user;
        }
    }

    addUser(username: string) {
        if(!this.users.has(username))  {
            this.users.set(username, new User(username));
        } else {
            return "Já existe um usuário com esse UserName";
        }     
    }

    toString() {
        let values = this.users.values();
        return [...values].join("\n");
    }
}

class User {
    username: string;
    seguidores: Map<string, User>
    seguindo: Map<string, User>
    
    constructor(username: string) {
        this.username = username;
        this.seguidores = new Map<string, User>();
        this.seguindo = new Map<string, User>();
    }

    public getUserName(): string {
        return this.username;
    }

    public getSeguidores(): string[] {
        return [...this.seguidores.keys()];
    }

    public getSeguindo(): string[] {
        return [...this.seguindo.keys()];
    }

    follow(other: User) {
        if(other.username === this.username) {
            return "Um usuário não pode seguir ele mesmo"
        } else if (!this.seguindo.has(other.username)) {
            this.seguindo.set(other.username, other);
            other.seguidores.set(this.username, this);
        } else {
            return "Já está seguindo";
        }
    }


    toString() {
        let followers = this.seguidores.keys();
        let following = this.seguindo.keys();
        return "@" + this.username + "\n" + "   Seguidores: [" + [...followers].join(", ") + "]" + "\n" + "   Seguindo:   [" + [...following].join(",") + "]";
    }
}


console.log("-------- CASE CADASTRAR --------");

let twitter = new Controle();
twitter.addUser("goku");
twitter.addUser("sara");
twitter.addUser("tina");
console.log("" + twitter);

console.log("-------- || --------");


console.log("-------- CASE SEGUIR --------");

twitter.getUser("goku").follow(twitter.getUser("sara"));
twitter.getUser("goku").follow(twitter.getUser("tina"));
twitter.getUser("sara").follow(twitter.getUser("tina"));
console.log("" + twitter);

console.log("-------- || --------");

console.log("-------- CASE TWITTAR --------");




console.log("-------- || --------");