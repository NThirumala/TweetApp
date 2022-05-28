import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import {Request} from 'src/app/shared/request.model';
import { User } from '../home-component/model/User';
@Component({
  selector: 'app-comp-user-login',
  templateUrl: './comp-user-login.component.html',
  styleUrls: ['./comp-user-login.component.scss']
})
export class CompUserLoginComponent implements OnInit {
  userNotFound: boolean = false;

  constructor(private userService : UserServiceService, private router: Router) {
    // this.userService = userService;
   }
  loginform = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }
  login(){
    this.userNotFound = false;
    console.log(this.loginform.value);
    this.userService.login(this.loginform.value.username,  this.loginform.value.password).subscribe(data => {
      if(data !== null){
        console.log(data);
        if(data.code === "200"){
          sessionStorage.setItem("access-Token", data.access_token);
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("credentials", JSON.stringify(this.loginform.value));
          const currentUser = sessionStorage.getItem('username');
          const email = currentUser !== null ? currentUser : '';
          this.userService.getUser(email).subscribe(data1 =>{
          sessionStorage.setItem("CurrentUser", JSON.stringify(data1));
          const res = sessionStorage.getItem('CurrentUser')
          console.log(res);

          this.router.navigate(['/home']);
          });
        }
        if(data.code === "404"){
          this.userNotFound = true;
        }
      }
    });
  }
}
