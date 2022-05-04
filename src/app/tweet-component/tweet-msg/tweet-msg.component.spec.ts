import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetMsgComponent } from './tweet-msg.component';

describe('TweetMsgComponent', () => {
  let component: TweetMsgComponent;
  let fixture: ComponentFixture<TweetMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
