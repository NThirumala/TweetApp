import { Injectable } from '@angular/core';  
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

  @Injectable()  
  export class TokenInterceptor implements HttpInterceptor { 
       constructor(public auth: AuthService) {} 
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
      if(!request.url.endsWith('/user/save')){
        request = request.clone({  
          setHeaders: {  
            Authorization: `Bearer ${this.auth.getToken()}`  
          }  
        }); 
        return next.handle(request);
      }else{
        console.log("in interceptor");
        return next.handle(request);
      }
      
      // if(request.url.endsWith('/user')){
      //   const currentUser = sessionStorage.getItem('username');
      //   const email = currentUser !== null ? currentUser : '';
      //   request = request.clone({  
      //     setHeaders: {  
      //       email: email 
      //     }
      //   });
      // }  
    }  
  }  