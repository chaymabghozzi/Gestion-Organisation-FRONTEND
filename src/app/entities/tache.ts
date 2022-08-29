import { User } from "./user";

export interface Tache 
{
    id?: number ; 
    name? : string ; 
    dateTache?: string;
    isCompleted?:string;
    user?: User[];

}

export class Tache 
{
    id?: number ; 
    name? : string ; 
    dateTache?: string;
    isCompleted?:string;
    user?: User[];


    constructor(
         name:string, dateTache:string, isCompleted:string, 
        ) {
    
        this.name = name ;
        this.dateTache = dateTache ;
        this.isCompleted = isCompleted ;

      }
    
}