import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from '../home-component/model/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordForm = new FormGroup({
    oldPassword : new FormControl(),
    newPassword : new FormControl(),
    cPassword : new FormControl()
  })
  userpassword: any;
  usercpassword: any;
  passwordMissMatch: boolean = false;
  useroldpassword: any;
  cred: any;
  currentPasswordErr: boolean = false;
  constructor(public modalService : NgbModal,public activeModal : NgbActiveModal, public userService : UserServiceService) { }

  ngOnInit(): void {
  }
  resetPassword(){
    this.currentPasswordErr = false;
    this.passwordMissMatch = false;

    this.userpassword = this.passwordForm.controls.newPassword.value;
    this.usercpassword = this.passwordForm.controls.cPassword.value;
    this.useroldpassword = this.passwordForm.controls.oldPassword.value;
    const cred = sessionStorage.getItem('credentials');
    this.cred = JSON.parse(cred !== null ? cred : '');
    console.log(this.cred);
    if(this.useroldpassword.localeCompare(this.cred.password) === 0) {
      console.log("old and enterd are same");
      if(this.userpassword.localeCompare(this.usercpassword.toString()) == 0){
      console.log("new  and conform are same");

      console.log(this.passwordForm.value);
      const username = sessionStorage.getItem('username');
      const email = username !== null ? username : '';
      const request = new User('','','','',email,this.passwordForm.controls.newPassword.value,'');
      this.userService.resetpassword(request).subscribe(data => {
        console.log(data);
        this.closeModal();
      });
    }else {
      console.log("new  and conform are not same");

      this.passwordMissMatch = true;
    }
    }else{
      console.log("old and enterd are not same");

      this.currentPasswordErr = true;
    }
  }
  closeModal(){
    this.modalService.dismissAll();
  }
}
