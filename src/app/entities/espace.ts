import { User } from "./user";

export interface Espace 
{
    id?: number ; 
    libelle? : string ; 
    presentation? : string ; 
    objectifs?:string;
   
    user?: User;
    logo?:any;

}

export class Espace 
{
    id?: number ; 
  
    libelle? : string ; 
    presentation? : string ; 
    objectifs?:string;
   
    user?: User;
    logo?:any;


    constructor(
       
        libelle : string,
        presentation:string,
        objectifs:string,
      
        logo:any
        
        ) {
      
        this.libelle = libelle ; 
        this.presentation = presentation ;
        this.objectifs = objectifs ;
       
        this.logo = logo ;
       


      }
    
}