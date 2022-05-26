import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TweetServiceService } from 'src/app/services/tweet-service.service';
import { Tweet } from './model/Tweet';
import { User } from './model/User';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {
  time : any;
  user : any;
  userName : any = '';
  tweets: any = [];
  constructor(private datepipe:DatePipe, private tweetService: TweetServiceService) {
    const loggedInUser = sessionStorage.getItem('CurrentUser');
    console.log(loggedInUser);
    this.user =JSON.parse( loggedInUser !== null ? loggedInUser : '');
    this.userName = this.user.firstName;
    console.log(this.user);
    console.log(this.userName);
  }
  getAllTweets(){
    this.tweetService.getAllTweets().subscribe(data =>{
    console.log(data);
    this.tweets = data;
    });
  }
  ngOnInit(): void {
    
    this.getAllTweets();
  }
  postTweetForm = new FormGroup({
    tweetMsg : new FormControl('')
  });
 
  postTweetMsg(){
    this.time = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    const currentUser = sessionStorage.getItem('username');
    const email = currentUser !== null ? currentUser : '';
    const tweetMsg = this.postTweetForm.value.tweetMsg;
    this.postTweetForm.controls['tweetMsg'].reset();
    const like = 0;
    const tagText = '';
    const replyTweet: Tweet[] = [];
    const request = new Tweet(email, tweetMsg, this.time, like, tagText, replyTweet);
    console.log(request);
    this.tweetService.postTweetMsg(request).subscribe(data =>{
      console.log(data);
     this. getAllTweets();
    });
  }
}
