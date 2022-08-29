import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getOne(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http : HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL +'/utilisateur',httpOptions);
  }

  getUser(id : number) : Observable<User> 
  {
    return this.http.get<User>(API_URL+`/utilisateur/${id}`,httpOptions) ;
  }

  public updateUser(user : User) : Observable<User> 
  {
    return this.http.put<User>(API_URL+'/utilisateur',user); 
  }

  public deleteUser( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/utilisateur/${id}`); 

  }

  public addUser(user : User) : Observable<User> 
  {
    return this.http.post<User>(API_URL+'/utilisateur',user); 
  }
}
