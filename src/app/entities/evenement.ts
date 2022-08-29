import { User } from "./user";

export interface Evenement 
{
    id?: number ; 
    name? : string ; 
    description? : string ; 
    dateDebut?: string;
    dateFin?:string;
    isCompleted?:string;
    uploadDir?:string;
    lieu?:string;
   
 
    user?: User[];

}

export class Evenement 
{
    id?: number ; 
    name? : string ; 
   
    dateDebut?: string;
    dateFin?:string;
    lieu?:string;
    uploadDir?:string;
   
    user?: User[];


    constructor(
        name : string,
       
        dateDebut : string,

        dateFin: string ,
       
        lieu:string,
        uploadDir?:string


        ) {
        this.name = name ; 
        
        this.dateDebut = dateDebut ;  
        this.dateFin = dateFin ;
        

        this.lieu = lieu ;  
        this.uploadDir = uploadDir ; 
       
      

      }
    
}