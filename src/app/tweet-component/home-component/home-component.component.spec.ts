import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TweetServiceService } from 'src/app/services/tweet-service.service';

import { HomeComponentComponent } from './home-component.component';
import { allTweets, CurrentUser, postTweetSuccessfullResponse } from './home-component.component.spec.util';

describe('HomeComponentComponent', () => {
  let component: HomeComponentComponent;
  let fixture: ComponentFixture<HomeComponentComponent>;
    let service : TweetServiceService;
    beforeAll(() =>{
        sessionStorage.setItem('CurrentUser', JSON.stringify(CurrentUser));
    })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponentComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponentComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TweetServiceService);
    spyOn<any>(service, 'getAllTweets').and.returnValue(of(allTweets));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have tweets on page load', ()=> {
     expect(component.tweets.length).toBeGreaterThan(0);
  });
  it('should check whether Tweet message is empty', ()=>{
      component.postTweetForm.controls.tweetMsg.setValue("");
      component.postTweetMsg();
      expect(component.emptyTweet).toBe(true);
  });
  it('should check whether length of Tweet message is greater than 144 characters', () =>{
    component.postTweetForm.controls.tweetMsg.setValue("CognizantTechnologySolutionsssCognizantTechnologySolutionsssCognizantTechnologySolutionsssCognizantTechnologySolutionsssCognizantTechnologySolutionsss");
    fixture.detectChanges();
    component.postTweetMsg();
    console.log(component.length);
    expect(component.tweetLengthError).toBe(true);
  });
  it("should call getAllTweets Method on tweet post", () =>{
      spyOn<any>(service, 'postTweetMsg').and.returnValue(of(postTweetSuccessfullResponse));
      const methodSpy = spyOn(component, 'getAllTweets');
      component.postTweetForm.controls.tweetMsg.setValue("Testing");
      fixture.detectChanges();
      component.postTweetMsg();
      expect(methodSpy).toHaveBeenCalledTimes(1);
  })
});
