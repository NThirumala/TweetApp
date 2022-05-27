import { Component, OnInit } from '@angular/core';
import { TweetServiceService } from 'src/app/services/tweet-service.service';

@Component({
  selector: 'app-user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.scss']
})
export class UserTweetsComponent implements OnInit {
  tweets: any;
  noTweets: boolean = false;

  constructor(private tweetService : TweetServiceService) { }

  ngOnInit(): void {
    this.noTweets = false;
    console.log("am in user Tweets");
    this.tweets = this.tweetService.userTweetList;
    if(this.tweets.length === 0){
      this.noTweets = true;
    }
  }

}
