import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    firstname : new FormControl('', Validators.required),
    lastname : new FormControl(''),
    gender : new FormControl('', Validators.required),
    dob : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{2}-[0-9]{4}$')]),
    email : new FormControl('', [Validators.required, Validators.pattern('^(?=[a-zA-Z0-9@._%+-]{6,100}$)[a-zA-Z0-9._%+-]{1,50}@(?:[a-zA-Z0-9-]{1,12}\\.){1,12}[a-zA-Z0-9\\.-]{2,4}$')]),
    password : new FormControl('', Validators.required),
    cpassword : new FormControl('', Validators.required),
    contactnumber : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
  });
  cpassError: boolean = false;
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
          this.cpassError = true;
        }
  }
}
