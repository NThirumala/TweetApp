import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private userService : UserServiceService, private router: Router) {
    // this.userService = userService;
   }
  loginform = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });

  ngOnInit(): void {
  }
  login(){
    console.log(this.loginform.value);
    this.userService.login(this.loginform.value.username,  this.loginform.value.password).subscribe(data => {
      if(data !== null){
        console.log(data);
        sessionStorage.setItem("access-Token", data.access_token);
        sessionStorage.setItem("username", data.username);
        if(data.code === "200"){
          const currentUser = sessionStorage.getItem('username');
          const email = currentUser !== null ? currentUser : '';
          this.userService.getUser(email).subscribe(data1 =>{
          sessionStorage.setItem("CurrentUser", JSON.stringify(data1));
          const res = sessionStorage.getItem('CurrentUser')
          console.log(res);
          this.router.navigate(['/home']);
          });
        }
      }else{
        console.log("Login unsucessful");
      }
    })
  }
}
