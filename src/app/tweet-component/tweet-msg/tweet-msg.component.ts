import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { TweetServiceService } from 'src/app/services/tweet-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EditTweetComponent } from '../edit-tweet/edit-tweet.component';
import { User } from '../home-component/model/User';
import { ReplyTweetComponent } from '../reply-tweet/reply-tweet.component';
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
  enableReply : boolean = false;
  enableDelete : boolean = false;
  postedTime: any;
  // modalRef: any;
  constructor(private userService: UserServiceService,
              private tweetService : TweetServiceService,
              private modalService : NgbModal,
              private router : Router,
              private datePipe :DatePipe
              // private modalService : ModalManager
              ) { 
  }
  ngOnInit(): void {
    this.getUserDetails();
    console.log(this.tweet);
    this.msg = this.tweet.tweetMsg;

    // const currentTime = this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    // console.log("posted Time : "+ this.tweet.time + "Current Time "+ currentTime);
    // this.postedTime = 
    
  }
  getUserDetails(){
    const email = this.tweet.email !== null ? this.tweet.email : '';
    console.log(email);
    this.userService.getUser(this.tweet.email).subscribe(userData =>{
      const tweetUser = new User ('',userData.firstName, userData.lastname,'','', userData.email,'','');
      this.firstName = tweetUser.firstName;
      if(userData.email === sessionStorage.getItem('username')){
        this.enableEdit = true;
        this.enableDelete = true;
      }else{
        this.enableReply = true;
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
  deleteTweetMsg(){
    this.tweetService.deleteTweet(this.tweet).subscribe(() => {
      this.reloadComponent();
    });
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  replyTweet(){
    const modalRef = this.modalService.open(ReplyTweetComponent ,{ariaLabelledBy : 'Reply Tweet modal',});
    const currentUser = sessionStorage.getItem('CurrentUser');
    const user =JSON.parse( currentUser !== null ? currentUser : '');
    const userName = user.firstName;
    modalRef.componentInstance.firstName = userName;
    console.log(this.tweet.id);
    modalRef.componentInstance.parentTweeetId = this.tweet.id;
  }
}
