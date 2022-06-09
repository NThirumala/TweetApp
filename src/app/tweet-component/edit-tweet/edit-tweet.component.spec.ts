import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { TweetServiceService } from 'src/app/services/tweet-service.service';

import { EditTweetComponent } from './edit-tweet.component';
import { tweetData, updateTweetMSgSuccessfully } from './edit-tweet.component.spec.util';

describe('EditTweetComponent', () => {
  let component: EditTweetComponent;
  let fixture: ComponentFixture<EditTweetComponent>;
  let service: TweetServiceService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTweetComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[NgbActiveModal, DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTweetComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TweetServiceService);
    component.tweetData = tweetData;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check whether length of Tweet message is greater than 144 characters', () =>{
    component.updateTweetForm.controls.tweetText.setValue("CognizantTechnologySolutionsssCognizantTechnologySolutionsssCognizantTechnologySolutionsssCognizantTechnologySolutionsssCognizantTechnologySolutionsss");
    fixture.detectChanges();
    component.updateTweetMsg();
    console.log(component.length);
    expect(component.tweetLengthError).toBe(true);
  });
  it('should check whether tweet Message length is 0', () =>{
    component.updateTweetForm.controls.tweetText.setValue("");
    fixture.detectChanges();
    component.updateTweetMsg();
    console.log(component.length);
    expect(component.emptyTweet).toBe(true);
  });
  it('should reload the same URL when edit and udate tweet message successfully', () =>{
    const navigateSpy = spyOn(router, 'navigate');
    spyOn<any>(service, 'updateTweetMsg').and.returnValue(of(updateTweetMSgSuccessfully));
    fixture.detectChanges();
    component.updateTweetMsg();
    expect(navigateSpy).toHaveBeenCalled();
  })
});
