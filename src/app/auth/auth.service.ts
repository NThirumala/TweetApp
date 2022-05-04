import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): any {
    return sessionStorage.getItem('access-Token');
  }

}
