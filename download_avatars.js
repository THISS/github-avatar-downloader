// import the request module and fs module
let request = require('request');
let fs = require('fs');

const GITHUB_API_KEY = '153e7349fec2a30b41621ded8138bacc9d3e6372';
const GITHUB_USER = 'THISS';
const BASE_URL = `https://${GITHUB_USER}:${GITHUB_API_KEY}@api.github.com/`;

console.log('Welcome to the GitHub Avatar Downloader!');

// compile our URL endpoint
function getContributorsURL(repoOwner, repoName) {
  return `${BASE_URL}repos/${repoOwner}/${repoName}/contributors`;
}

// Helper function to print each contributor Avatar to console
function printAvatarURL(contributor) {
  console.log(contributor.avatar_url);
}

// Get Contributors
// Our main controlling function
function getRepoContributors(repoOwner, repoName, cb) {
  let url = getContributorsURL(repoOwner, repoName);

  let options = {
    url: url,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  //  Main request to GitHub api
  request.get(options, (err, response, body) => {
    // Parse the returned JSON and pass it to our callback
    cb(null, JSON.parse(body));
  });
  // .on('response', (res) =>{
  //   console.log(`Response Code: ${res.statusCode}`);
  //   console.log(`Response Message: ${res.statusMessage}`);
  // });
}


// Call our function
getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  // Loop Over the avatars
  result.forEach(printAvatarURL);
});


// // Save each to disk under avatars/ directory