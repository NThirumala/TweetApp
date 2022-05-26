export class Tweet {
    // private id : String;
    private email : String;
    private tweetMsg : String;
    private time : String;
    private like : number;
    private tagText : String;
    private replyTweet : Array<Tweet>;

    constructor(
        // id :String,
         email : String,
         tweetMsg : String,
         time : String,
         like : number,
         tagText : String,
         replyTweet : Array<Tweet>,){
            //  this.id = id;
             this.email = email;
             this.tweetMsg = tweetMsg;
             this.time = time;
             this.like = like;
             this.tagText = tagText;
             this.replyTweet = replyTweet;
    }
}