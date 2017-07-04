var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function options(path){
  return {
    url: "https://api.github.com" + path,
    headers: {
      'User-Agent': 'yogurt'
    },
    qs: {
      access_token: process.env.GITHUB_ACCESS_TOKEN
    }
  };
}


function getRepoContributors(repoOwner, repoName, cb) {
  const path = `/repos/${repoOwner}/${repoName}/contributors`;

  request(options(path), function (err, response, body) {
    try {
      cb(JSON.parse(body));

    } catch (err) {
      console.log(err);
      console.log("Failed to parse content body");
    }
})
}

getRepoContributors("jquery", "jquery", (data) => {

  data.forEach((contributor) => {
    console.log(contributor.avatar_url);
  });
});



// getRepoContributors("jquery", "jquery", function(err, result) {
// console.log("Errors:", err);
// console.log("Result:", result);
// });


