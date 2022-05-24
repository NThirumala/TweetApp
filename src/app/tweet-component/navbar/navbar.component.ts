import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private modalService : NgbModal, public router: Router
  ) { }
  accountList :any= ['Account', 'Resetpassword', 'Logout'];
  ngOnInit(): void {
    this.accountForm.controls['account'].setValue(this.accountList, {onlySelf: true});
  }
  accountForm = new FormGroup({
    account : new FormControl()
  });
  reset(e: any){
    console.log(e.target.value);
    if(e.target.value === 'Resetpassword'){
      const modalRef = this.modalService.open(ResetPasswordComponent,{ariaLabelledBy : 'rest password',});
    }
    else if(e.target.value === 'Logout'){
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }

}
