import { Injectable } from '@angular/core';  
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

  @Injectable()  
  export class TokenInterceptor implements HttpInterceptor { 
       constructor(public auth: AuthService) {} 
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        
      request = request.clone({  
        setHeaders: {  
          Authorization: `Bearer ${this.auth.getToken()}`  
        }  
      }); 
      // if(request.url.endsWith('/user')){
      //   const currentUser = sessionStorage.getItem('username');
      //   const email = currentUser !== null ? currentUser : '';
      //   request = request.clone({  
      //     setHeaders: {  
      //       email: email 
      //     }
      //   });
      // }
       return next.handle(request);  
    }  
  }  