import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

  enableEdit: boolean = false;
  enableReply : boolean = false;
  enableDelete : boolean = false;
  // postedTime: any;
  enableReplySection: boolean = false;
  diff: { day: number; hour: number; minute: number; second: number; } | undefined;
  tTime: number = 0;
  tMeasure: string = '';
  time: number =0;
  measure: string = '';
  currentTime: string = '';
  comments: any[] =[];
  constructor(private userService: UserServiceService,
              private tweetService : TweetServiceService,
              private modalService : NgbModal,
              private router : Router,
              private datePipe :DatePipe
              ) { 
  }
  ngOnInit(): void {
    const email = this.tweet.email !== null ? this.tweet.email : '';
    this.getUserDetails(email);
    // console.log(this.tweet);
    this.msg = this.tweet.tweetMsg;
    if(this.tweet.replyTweet.length !== 0){
      this.enableReplySection = true;
    }
    const tm = this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.currentTime = tm !== null ? tm : '';

    this.diff = this.getDataDiff(new Date(this.tweet.time), new Date(this.currentTime));
    console.log(this.diff);
    this.getTweetTime(this.diff);
    // console.log(this.tweet.replyTweet);

    this.tweet.replyTweet.forEach((ele: { time: string | number | Date; id: any; email:String }) => {
     console.log(ele);
    //  this.getUserDetails(ele.email, ele.id, true);
     const diff = this.getDataDiff(new Date(ele.time), new Date(this.currentTime));
     console.log(diff);
     this.getTweetTime(diff, true, ele.id);
   });
  }
  getTweetTime(t: { day: any; hour: number; minute: number; second: number; }, retweet?:boolean, retweetId?:any){
    this.time = 0;
    console.log(t);
    if(t.day > 0){
      this.time = t.day;
      if(this.time > 1){
        this.measure = "days ago";
      }else{
        this.measure = "day ago";
      }
    }else if(t.hour > 0){
    //   return t.hour;
    this.time = t.hour;
    if(this.time > 1){
      this.measure = "hours ago";
    }else{
      this.measure = "hour ago";
    }
    }else if(t.minute > 0){
      // return t.minute;
      this.time = t.minute;
      if(this.time > 1){
        this.measure = "minutes ago";
      }else{
        this.measure = "minute ago";
      }
    }else if(t.second > 0){
      // return t.second;
      this.time = t.second;
      if(this.time > 1){
        this.measure = "seconds ago";
      }else{
        this.measure = "second ago";
      }
    }else {
      this.measure = "Just now";
    }
    console.log(this.time+ " "+ this.measure+ " "+ retweetId);
    if(retweet){
      console.log(this.time+ " "+ this.measure+ " "+ retweetId);
      this.tweet.replyTweet.forEach((temp: {email:String; time: string | number | Date; id: any; }) => {
        if(temp.id === retweetId){
          if(this.time >0){
          temp.time = this.time+ " "+ this.measure;
          }else{
            temp.time = this.measure;
          }
        console.log(temp);
        this.getUserDetails(temp.email, temp.id, true);
        // this.comments.push(temp);
        }
      });
    }else{
      this.tTime = this.time;
      this.tMeasure = this.measure;
      this.time = 0;
      this.measure = '';
    }
  }
  getDataDiff(startDate: { getTime: () => number; }, endDate: { getTime: () => number; }) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }
  getUserDetails(email: String, id?:any, reply?:boolean){
    // console.log(email);
    this.userService.getUser(email).subscribe(userData =>{
      const tweetUser = new User ('',userData.firstName, userData.lastname,'','', userData.email,'','');
      if(reply){
        this.tweet.replyTweet.forEach((no: { id: any; email: any; tweetMsg: any; time: any; like: any; }) => {
          if(no.id === id){
            this.comments.push({'id': no.id, 'email':no.email, 'tweetMsg':no.tweetMsg,
             'time': no.time,'like':no.like, 'name':tweetUser.firstName})
          }
        });
        console.log(id);
        console.log(this.comments);
      }else{
        this.firstName = tweetUser.firstName;
        if(userData.email === sessionStorage.getItem('username')){
          this.enableEdit = true;
          this.enableDelete = true;
        }else{
          this.enableReply = true;
        }
      }
    });
  }
  likeCount(id:string){
    console.log("user liked" + id);
    console.log(this.tweet.id);
    this.tweetService.likeTweet(id).subscribe((data: any) => {
      console.log(data);
      if(data !== null){
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
      this.tweetService.reloadComponent();
    });
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
