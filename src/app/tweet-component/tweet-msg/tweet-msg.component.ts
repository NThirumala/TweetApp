import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { TweetServiceService } from 'src/app/services/tweet-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EditTweetComponent } from '../edit-tweet/edit-tweet.component';
import { User } from '../home-component/model/User';
@Component({
  selector: 'app-tweet-msg',
  templateUrl: './tweet-msg.component.html',
  styleUrls: ['./tweet-msg.component.scss']
})
export class TweetMsgComponent implements OnInit {
  firstName: String = '';
  msg: String = '';
  @Input() tweet: any;
  // @ViewChild('editModal') editModal: any;

  // private modalReference : any;
  enableEdit: boolean = false;
  // modalRef: any;
  constructor(private userService: UserServiceService,
              private tweetService : TweetServiceService,
              private modalService : NgbModal
              // private modalService : ModalManager
              ) { 
  }
  ngOnInit(): void {
    this.getUserDetails();
    // console.log(this.tweet);
    this.msg = this.tweet.tweetMsg;

  }
  getUserDetails(){
    const email = this.tweet.email !== null ? this.tweet.email : '';
    console.log(email);
    this.userService.getUser(this.tweet.email).subscribe(userData =>{
      const tweetUser = new User ('',userData.firstName, userData.lastname,'','', userData.email,'','');
      this.firstName = tweetUser.firstName;
      if(userData.email === sessionStorage.getItem('username')){
        this.enableEdit = true;
      }
      console.log(userData);
    });
  }
  likeCount(id:string){
    console.log("user liked" + id);
    console.log(this.tweet.id);
    this.tweetService.likeTweet(id).subscribe((data: any) => {
      console.log(data);
      if(data !== null){
        // let count :any;
        const count  = document.getElementById(id)!;
        console.log(count);
        count.innerHTML = data.like;
      }
    });
  }
  editTweetMsg(){
    const modalRef = this.modalService.open(EditTweetComponent,{ariaLabelledBy : 'Tweet edit modal',});
    modalRef.componentInstance.tweetData = this.tweet;
    
  }
  closeModal(){
    this.modalService.dismissAll();
  }
}
