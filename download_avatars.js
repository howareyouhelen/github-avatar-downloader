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
    var path = `./avatars/${contributor.login}.jpg`;
    //${contributor.login}.jpg = name of the image
    // ./avatars = where we are storing our images
    downloadImageByURL(contributor.avatar_url, path);
  });
});



// getRepoContributors("jquery", "jquery", function(err, result) {
// console.log("Errors:", err);
// console.log("Result:", result);
// });



function downloadImageByURL(url, filePath) {
  var request = require('request');
  var fs = require('fs');
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log(response.statusMessage, response.headers["content-type"]);
    })
    .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")





