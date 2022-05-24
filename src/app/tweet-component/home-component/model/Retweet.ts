import { Tweet } from "./Tweet";

export class Retweet {
    tweet : Tweet | undefined;
    parentTweetId : String | undefined;
    
    constructor (tweet : Tweet, parentTweetId : String){
        this.tweet = tweet;
        this.parentTweetId  = parentTweetId;
    }
}