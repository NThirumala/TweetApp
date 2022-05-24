import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompUserLoginComponent } from './tweet-component/comp-user-login/comp-user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponentComponent } from './tweet-component/home-component/home-component.component';
import { NavbarComponent } from './tweet-component/navbar/navbar.component';
import { TweetMsgComponent } from './tweet-component/tweet-msg/tweet-msg.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { EditTweetComponent } from './tweet-component/edit-tweet/edit-tweet.component';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngb-modal';
import { CompUserRegisterComponent } from './tweet-component/comp-user-register/comp-user-register.component';
import { ResetPasswordComponent } from './tweet-component/reset-password/reset-password.component';
import { ReplyTweetComponent } from './tweet-component/reply-tweet/reply-tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    CompUserLoginComponent,
    HomeComponentComponent,
    NavbarComponent,
    TweetMsgComponent,
    EditTweetComponent,
    CompUserRegisterComponent,
    ResetPasswordComponent,
    ReplyTweetComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    // NgbModal.forRoot()
    NgbModule,
    ModalModule
  ],
  providers: [DatePipe,
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: TokenInterceptor,  
      multi: true  
    } ],
  bootstrap: [AppComponent],
  entryComponents: [ EditTweetComponent ]
})
export class AppModule { }
