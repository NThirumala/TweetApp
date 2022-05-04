import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  headers : any;
  options : any;

  constructor(private http: HttpClient) {
    
   }
   createLoginOptions(){
     this.headers = new HttpHeaders({
      //  'Content-Type' : 'application/json',
       'Content-Type': 'application/x-www-form-urlencoded'
     });
     this.options = {headers : this.headers}
   }
   createOptions(){
    this.headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    this.options = {headers : this.headers}
  }
   login(username : string, password: string):Observable<any>{
    this.createLoginOptions();
    let params = new HttpParams({
      fromObject: { email: username, password: password },
    });
    return this.http.post<any>(environment.loginUrl, params.toString(), this.options);
   }
   getUser(email:any):Observable<any>{
    this.headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'email' : email
    });
    this.options = {headers : this.headers}
     return this.http.get<any>(environment.getUser, this.options);
   }
}
