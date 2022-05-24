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
    newPassword : new FormControl(),
  })
  constructor(public modalService : NgbModal,public activeModal : NgbActiveModal, public userService : UserServiceService) { }

  ngOnInit(): void {
  }
  resetPassword(){
    console.log(this.passwordForm.value);
    const username = sessionStorage.getItem('username');
    const email = username !== null ? username : '';
    const request = new User('','','','','',email,this.passwordForm.controls.newPassword.value,'');
    this.userService.resetpassword(request).subscribe(data => {
      console.log(data);
      this.closeModal();
    });
  }
  closeModal(){
    this.modalService.dismissAll();
  }
}
