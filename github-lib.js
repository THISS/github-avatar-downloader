// import the request module and fs module
let request = require('request');
let fs = require('fs');

// No Touchy - unless you know what you are doing
const GITHUB_API_KEY = process.env.GITHUB_API;
const GITHUB_USER = process.env.USER;
const API_URL = `https://${GITHUB_USER}:${GITHUB_API_KEY}@api.github.com/`;
const AVATAR_DIR = './avatars/';
const BASE_URL = `https://api.github.com/`;

// Initial Setup - make sure that we have our avatar dir if it doesn't exist
if (!fs.existsSync(AVATAR_DIR)){
  fs.mkdirSync(AVATAR_DIR);
}

// compile our URL endpoint
function getContributorsURL(repoOwner, repoName, useAPI) {
  if(useAPI){
    return `${BASE_URL}repos/${repoOwner}/${repoName}/contributors`;
  }
  return `${BASE_URL}repos/${repoOwner}/${repoName}/contributors`
}

// Helper function to print each contributor Avatar URL to console
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
function getRepoContributors(repoOwner, repoName, useAPI, cb) {

  if(!(repoOwner && repoName)) {
    console.log("You need to give us a User and their Repository name");
    throw new Error("Need to have a user and repository.");
  }

  const url = getContributorsURL(repoOwner, repoName, useAPI);

  const options = {
    url: url,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  //  Main request to GitHub api
  request.get(options, (err, response, body) => {
    if(err) {
      throw err;
    }
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
module.exports = {
  getRepoContributors: getRepoContributors,
  dataGrabber: dataGrabber
};