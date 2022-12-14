import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../entities/tache';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(
    private http : HttpClient
  ) { }

  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(API_URL +'/tache',httpOptions);
  }

  addTache(tache : Tache) : Observable<Tache> 
  {
    return this.http.post<Tache>(API_URL+'/tache',tache); 
  }

  getTache(id : number) : Observable<Tache> 
  {
    return this.http.get<Tache>(API_URL+`/tache/${id}`,httpOptions) ;
  }

  public updateTache(tache : Tache) : Observable<Tache> 
  {
    return this.http.put<Tache>(API_URL+'/tache',tache,httpOptions); 
  }

  public deleteTache( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/tache/${id}`); 
  }
}
