import { User } from "./user";

export interface Sondage 
{
    id?: number ; 
    name? : string ; 
    dateSondage?: string;
    isCompleted?:string;
    user?: User[];

}

export class Sondage 
{
    id?: number ; 
    name? : string ; 
    dateSondage?: string;
    isCompleted?:string;
    user?: User[];


    constructor(
      name: string , dateSondage:string, isCompleted:string
        ) {

        this.name = name ; 
        this.dateSondage = dateSondage ; 
        this.isCompleted = isCompleted ; 


      }
    
}