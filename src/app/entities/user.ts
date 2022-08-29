import { Role } from "./role";

export interface User 
{
    id?: number ; 
    username : string ; 
    email : string ; 
    password : string ; 
    nom : string ; 
    prenom : string ; 
    numTel : string ; 
    roles?: Role[]
}

export class User 
{
    id?: number ; 
    username : string ;
    email : string ; 
    password : string ; 
    nom : string ; 
    prenom : string ; 
    numTel : string ; 
    roles? : Role[]


    constructor(username: string,email : string ,password : string,nom : string ,prenom : string ,numTel : string
        ) {
        this.username = username;
        this.email = email ; 
        this.password = password ; 
        this.nom = nom;
        this.prenom = prenom;
        this.numTel = numTel;
       
      }
    
}