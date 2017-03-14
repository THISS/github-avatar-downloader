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

// save file to disk
function downloadImageByURL(url, filePath) {
  request(url)
    .pipe(fs.createWriteStream(filePath))
    .on('finish', () => {
      console.log(`File Downloaded To ${filePath}`);
    })
    .on('error', (err) => {
      throw err;
    });
}

// This is my helper function that will take a contributor and use downloadImageByURL
// passing in the 2 arguments it requires in its signature
function dataGrabber(contributor) {
  let avatarURL = contributor.avatar_url;
  let path = `avatars/${contributor.login}.jpg`;
  // Call the function
  downloadImageByURL(avatarURL, path);
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
  })
  .on('error', (err) => {
    cb(err);
  })
  .on('response', (res) =>{
    if(res.statusCode > 399) {
      cb(res.statusMessage);
    }
    // console.log(`Response Code: ${res.statusCode}`);
    // console.log(`Response Message: ${res.statusMessage}`);
  });
}


// Call our function
getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  // Loop Over the avatars
  result.forEach(dataGrabber);
});

