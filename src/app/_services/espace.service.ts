import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Espace } from '../entities/espace';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class EspaceService {
  getEspaceeById(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http : HttpClient
  ) { }

  getEspaces(): Observable<Espace[]> {
    return this.http.get<Espace[]>(API_URL +'/espace',httpOptions);
  }

  getEspace(id : number) : Observable<Espace> 
  {
    return this.http.get<Espace>(API_URL+`/espace/${id}`,httpOptions) ;
  }

  public updateEspace(espace : Espace) : Observable<Espace> 
  {
    return this.http.put<Espace>(API_URL+'/espace',espace); 
  }

  public deleteEspace( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/espace/${id}`); 

  }

   addEspace(espace : Espace) : Observable<Espace> 
  {
    return this.http.post<Espace>(API_URL+'/espace',espace); 
  }
}
