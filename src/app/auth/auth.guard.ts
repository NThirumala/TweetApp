import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TweetServiceService } from '../services/tweet-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private tweetService: TweetServiceService) {
        console.log("constructor Auth Guard");
     }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("inside Auth Guard" + state.url);
       if(state.url === '/userTweets'&& this.tweetService.userTweetList.length === 0 && this.tweetService.listNotFound){
           console.log("accessing direct URl for userTweetspage");
           this.router.navigate(['/home']);
           return true;
       }else if (sessionStorage.getItem('username')) {
            // logged in so return true
        console.log("inside Auth Guard returning TRUE");

            return true;
          }else {
            sessionStorage.clear();
            this.router.navigate(['/login']);
    
            return false;
        }
    }
}