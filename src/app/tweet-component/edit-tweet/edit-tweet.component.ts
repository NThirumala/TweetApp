import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ModalComponent } from 'ngb-modal';
import { DatePipe } from '@angular/common';
import { Tweet } from '../home-component/model/Tweet';
import { TweetServiceService } from 'src/app/services/tweet-service.service';
import { Router } from '@angular/router';
import { Retweet } from '../home-component/model/Retweet';

@Component({
  selector: 'app-edit-tweet',
  templateUrl: './edit-tweet.component.html',
  styleUrls: ['./edit-tweet.component.scss']
})
export class EditTweetComponent implements OnInit {

  // @ViewChild(ModalComponent) ModalComponent: any;
  @Input() tweetData: any;
  updateTweetForm = new FormGroup(
    {
      tweetText : new FormControl('')
    }
  )
  time: any;
  tweets: any;
  constructor(public activeModal : NgbActiveModal, private tweetService : TweetServiceService,
    private router : Router,private datepipe:DatePipe) { }

  ngOnInit(): void {
    console.log("editing Tweet ");
    this.updateTweetForm.controls.tweetText.setValue(this.tweetData.tweetMsg);
    console.log(this.tweetData);
  }
  updateTweetMsg(){
    this.time = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    const currentUser = sessionStorage.getItem('username');
    const email = currentUser !== null ? currentUser : '';
    const tweetMsg = this.updateTweetForm.value.tweetText;
    this.updateTweetForm.controls['tweetText'].reset();
    const like = 0;
    const replyTweet: Tweet[] = [];
    // const request = new Tweet(this.tweetData.id ,email, tweetMsg, this.time, like, '', replyTweet);
    const editRequest = new Retweet(this.tweetData.id ,email, tweetMsg, this.time, like, '', replyTweet);
    console.log(editRequest);
    this.tweetService.updateTweetMsg(editRequest).subscribe((data: any) =>{
      console.log(data);
      // this. getAllTweets();
      // this.router.navigate(['/home']);
      this.tweetService.reloadComponent();
      console.log(this.router.url);
      this.activeModal.dismiss();
    });
  }
  // getAllTweets(){
  //   this.tweetService.getAllTweets().subscribe(data =>{
  //   console.log(data);
  //   this.tweets = data;
  //   });
  // }
}
