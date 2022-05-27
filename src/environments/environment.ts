// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl : 'http://localhost:8081/login',
  postTweetMsg : 'http://localhost:8081/tweet/add',
  getAllTweets: 'http://localhost:8081/tweet/all',
  getUser: 'http://localhost:8081/user',
  likeTweetUrl : 'http://localhost:8081/tweet/like',
  updateTweetUrl : 'http://localhost:8081/tweet/update',
  adduser : 'http://localhost:8081/user/save',
  resetPasswordUrl : 'http://localhost:8081/user/forgotPassword',
  deleteTweetUrl : 'http://localhost:8081/tweet/delete',
  replyTweetUrl : 'http://localhost:8081/tweet/reply',
  userTweetsUrl : 'http://localhost:8081/tweet/user'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
