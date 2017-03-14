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
// GET the URL
function getContributorsJSON(url) {
  request.get(url, (data) => {
    return data;
  })
  .on('response', (res) =>{
    console.log(`Response Code: ${res.statusCode}`)
    });
}
let url = getContributorsURL('nodejs', 'node');
let contributorsList = getContributorsJSON(url);
console.log(contributorsList);
// Parse the returned JSON
// Loop Over the avatars
// // Save each to disk under avatars/ directory

function getRepoContributors(repoOwner, repoName, cb) {
  let url = getContributorsURL(repoOwner, repoName);
}

// Call our function
getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});