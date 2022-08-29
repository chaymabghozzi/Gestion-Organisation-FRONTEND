import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sondage } from '../entities/sondage';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class SondageService {

  constructor(
    private http : HttpClient
  ) { }

  getSondages(): Observable<Sondage[]> {
    return this.http.get<Sondage[]>(API_URL +'/sondage',httpOptions);
  }

  addSondage(sondage : Sondage) : Observable<Sondage> 
  {
    return this.http.post<Sondage>(API_URL+'/sondage',sondage); 
  }

  getSondage(id : number) : Observable<Sondage> 
  {
    return this.http.get<Sondage>(API_URL+`/sondage/${id}`,httpOptions) ;
  }

  public updateSondage(sondage : Sondage) : Observable<Sondage> 
  {
    return this.http.put<Sondage>(API_URL+'/sondage',sondage,httpOptions); 
  }

  public deleteSondage( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/sondage/${id}`); 
  }
}
