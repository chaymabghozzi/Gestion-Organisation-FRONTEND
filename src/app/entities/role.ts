
export interface Role 
{
    id?: number ; 
    roleName : string ; 
}

export class Role 
{
    id?: number ; 
    roleName : string ; 



    constructor(roleName: string) {
        this.roleName = roleName;       
      }
    
}