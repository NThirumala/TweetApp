import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from '../home-component/model/User';

import { CustomValidator } from './CustomValidator';
@Component({
  selector: 'app-comp-user-register',
  templateUrl: './comp-user-register.component.html',
  styleUrls: ['./comp-user-register.component.scss']
})
export class CompUserRegisterComponent implements OnInit {
  usercpassword : String = '';
  userpassword : String = '';
  registrationForm = new FormGroup({
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    gender : new FormControl(''),
    dob : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    cpassword : new FormControl(''),
    contactnumber : new FormControl('')
  },
  // CustomValidator.mustMatch('password', 'confirmPassword')
  )
  constructor(private userService : UserServiceService, private router : Router) { }

  ngOnInit(): void {
  }
  register(){
    this.userpassword = this.registrationForm.controls.password.value;
    this.usercpassword = this.registrationForm.controls.cpassword.value;

    if(this.userpassword.localeCompare(this.usercpassword.toString()) == 0){
    console.log("registering new User" + " "+  this.registrationForm.controls.firstname.value);
    const request = new User('', this.registrationForm.controls.firstname.value,
    this.registrationForm.controls.lastname.value,
    this.registrationForm.controls.gender.value,
    this.registrationForm.controls.dob.value,
    this.registrationForm.controls.email.value,
    this.userpassword,this.usercpassword
    );
    this.userService.adduser(request).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    });
    }
    else {
      console.log("user registration failed");
    }
    
  }
}
