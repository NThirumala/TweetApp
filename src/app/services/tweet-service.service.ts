import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Retweet } from '../tweet-component/home-component/model/Retweet';
import { Tweet } from '../tweet-component/home-component/model/Tweet';
@Injectable({
  providedIn: 'root'
})
export class TweetServiceService {
 
  headers : any;
  options : any;

  constructor(private http: HttpClient, private router: Router) {
   }
   createOptions(){
     this.headers = new HttpHeaders({
     'Content-Type' : 'application/json',
   });
   this.options = {headers : this.headers}
   }
   postTweetMsg(request:any):Observable<any>{
    this.createOptions();
    return this.http.post<any>(environment.postTweetMsg, request, this.options );
   }
   getAllTweets():Observable<any>{
    this.createOptions();
    const request : any = {};
    return this.http.get<any>(environment.getAllTweets,this.options);
   }
   likeTweet(id:any):Observable<any>{
     console.log(id);
     this.headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'id' : id
    });
    this.options = {headers : this.headers}
     return this.http.get<any>(environment.likeTweetUrl,this.options)
   }
   updateTweetMsg(request: Retweet): Observable<any>{
     this.createOptions();
    return this.http.post<any>(environment.updateTweetUrl, request, this.options);
  }
  deleteTweet(request :Tweet) : Observable<any> {
    // this.createOptions();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: request
  };
    return this.http.delete<any>(environment.deleteTweetUrl, httpOptions);
  }
  replyTweet(request : any) : Observable<any> {
    this.createOptions();
    console.log(request);
    return this.http.post<any>(environment.replyTweetUrl, request, this.options);
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
