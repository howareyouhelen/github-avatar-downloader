var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');


var GITHUB_USER = "YOUR USERNAME HERE";
var GITHUB_TOKEN = "YOUR ACCESSTOKEN HERE";


function options(path){
  return {
    url: "https://api.github.com" + path,
    headers: {
      "user-agent": "yogurt"
    },
    qs: {
      access_token: process.env.GITHUB_ACCESS_TOKEN
    }
  };
}


function getRepoContributors(repoOwner, repoName, cb) {
  const path = `/repos/${repoOwner}/${repoName}/contributors`;
  request(options(path), function (err, response, body) {
    console.log(body)
})
}

  getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});