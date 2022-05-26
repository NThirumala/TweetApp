import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TweetServiceService } from 'src/app/services/tweet-service.service';
import { Retweet } from '../home-component/model/Retweet';
import { Tweet } from '../home-component/model/Tweet';

@Component({
  selector: 'app-reply-tweet',
  templateUrl: './reply-tweet.component.html',
  styleUrls: ['./reply-tweet.component.scss']
})
export class ReplyTweetComponent implements OnInit {

  @Input() firstName : any;
  @Input() parentTweeetId :any;
  replyTweetForm = new FormGroup({
    replyTweetMsg : new FormControl('')
  });
  time : any;

  constructor(private datepipe:DatePipe, private tweetService :TweetServiceService) { }

  ngOnInit(): void {
  }
  postReplyTweetMsg(){
    this.time = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    const currentUser = sessionStorage.getItem('username');
    const email = currentUser !== null ? currentUser : '';
    const tweetMsg = this.replyTweetForm.value.replyTweetMsg;
    this.replyTweetForm.controls['replyTweetMsg'].reset();
    const like = 0;
    const tagText = '';
    const replyTweet: Tweet[] = [];
    const tweet = new Retweet(this.parentTweeetId,email, tweetMsg, this.time, like, tagText, replyTweet);
    console.log(this.parentTweeetId);
    console.log(tweet);
    // const parentTweetId = this.parentTweeetId;
    // const request = new Retweet(tweet ,parentTweetId);
    const request = tweet;
    console.log(request);
    this.tweetService.replyTweet(request).subscribe(data => {
      console.log(data);
    });
  }
}
