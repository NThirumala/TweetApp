import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TweetServiceService } from 'src/app/services/tweet-service.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  length: number = 0;
  emptyValue: boolean = false;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private tweetService: TweetServiceService,
    private activatedRoute: ActivatedRoute
  ) { }
  accountList: any = ['Account', 'Resetpassword', 'Logout', 'register'];
  ngOnInit(): void {
    this.accountForm.controls['account'].setValue(this.accountList, { onlySelf: true });
  }
  accountForm = new FormGroup({
    account: new FormControl()
  });
  userForm = new FormGroup({
    user: new FormControl()
  });
  reset(e: any) {
    // console.log(e.target.value);
    if (e.target.value === 'Resetpassword') {
      const modalRef = this.modalService.open(ResetPasswordComponent, { ariaLabelledBy: 'rest password', });
    }
    else if (e.target.value === 'Logout') {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    } else if (e.target.value === 'register') {
      sessionStorage.clear();
      this.router.navigate(['/register']);
    }
  }
  userSearch(self?: boolean) {
    let email;
    if (self) {
      email = sessionStorage.getItem('username') !== null ? sessionStorage.getItem('username') : '';
    } else {
      email = this.userForm.controls.user.value;
    }

    if (email !== null) {
      this.tweetService.getUserTweets(email).subscribe(data => {
        console.log(data);
       if(data.length !== 0){ 
         this.tweetService.userTweetList = data;
        console.log(this.activatedRoute);
        if (this.tweetService.userTweetList !== undefined) {
          if (this.activatedRoute.snapshot.routeConfig!.path === "home") {
            this.router.navigateByUrl('/userTweets');
          } else {
            this.tweetService.reloadComponent();
          }
        }
      }else{
        this.tweetService.listNotFound = true;
        this.router.navigateByUrl('/userTweets');

        console.log(this.tweetService.listNotFound)
      }
      });
    } else {

    }
  }
  // this.length = this.userForm.controls.user.value.length;
  // if(this.length === 0) {
  //   this.emptyValue = true;
  // }
}
