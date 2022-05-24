import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): any {
    console.log("Getting token form Session");
    return sessionStorage.getItem('access-Token');
  }

}
