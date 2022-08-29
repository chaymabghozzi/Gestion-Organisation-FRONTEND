import { User } from "./user";

export interface Proposition 
{
    id?: number ; 
    name?: string ; 
    description?: string ; 
    user? : User;

}

export class Proposition 
{ 
    id?: number ; 
    name?: string ; 
    description?: string ; 
    user?: User;
    

    constructor(name: string, description:string) {
        this.name = name;
        this.description = description;
       
      }
    
}