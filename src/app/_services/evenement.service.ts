import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from '../entities/evenement';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(
    private http : HttpClient
  ) { }

  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(API_URL +'/evenement',httpOptions);
  }

  addEvenement(evenement : Evenement) : Observable<Evenement> 
  {
    return this.http.post<Evenement>(API_URL+'/evenement',evenement); 
  }

  getEvenement(id : number) : Observable<Evenement> 
  {
    return this.http.get<Evenement>(API_URL+`/evenement/${id}`,httpOptions) ;
  }

  public updateEvenement(evenement : Evenement) : Observable<Evenement> 
  {
    return this.http.put<Evenement>(API_URL+'/evenement',evenement,httpOptions); 
  }

  public deleteEvenement( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/evenement/${id}`); 
  }
}
