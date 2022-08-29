import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposition } from '../entities/proposition';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class PropositionService {

  constructor(
    private http : HttpClient
  ) { }

  getPropositions(): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(API_URL +'/proposition',httpOptions);
  }

  addProposition(proposition : Proposition) : Observable<Proposition> 
  {
    return this.http.post<Proposition>(API_URL+'/proposition',proposition); 
  }

  getProposition(id : number) : Observable<Proposition> 
  {
    return this.http.get<Proposition>(API_URL+`/proposition/${id}`,httpOptions) ;
  }

  public updateProposition(proposition : Proposition) : Observable<Proposition> 
  {
    return this.http.put<Proposition>(API_URL+'/proposition',proposition); 
  }

  public deleteProposition( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/proposition/${id}`); 
  }

}