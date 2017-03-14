// import the request module and fs module
let request = require('request');
let fs = require('fs');
require('dotenv').config();

const GITHUB_API_KEY = process.env.GITHUB_API;
const GITHUB_USER = process.env.USER;
const BASE_URL = `https://${GITHUB_USER}:${GITHUB_API_KEY}@api.github.com/`;
const AVATAR_DIR = './avatars/';
const REPO = process.argv[3];
const OWNER = process.argv[2];

// Initial Setup - make sure that we have our avatar dir if it doesn't exist
if (!fs.existsSync(AVATAR_DIR)){
  fs.mkdirSync(AVATAR_DIR);
}

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
  let path = `${AVATAR_DIR}${contributor.login}.jpg`;
  // Call the function
  downloadImageByURL(avatarURL, path);
}

// Get Contributors
// Our main controlling function
function getRepoContributors(repoOwner, repoName, cb) {

  if(!(repoOwner && repoName)) {
    console.log("You need to give us a User and their Repository name");
    return;
  }

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
getRepoContributors(OWNER, REPO, function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  // Loop Over the avatars
  result.forEach(dataGrabber);
});

