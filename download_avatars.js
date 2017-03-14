// import the request module and fs module
let request = require('request');
let fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

// compile our URL endpoint

// GET the URL
// Parse the returned JSON
// Loop Over the avatars
// // Save each to disk under avatars/ directory

function getRepoContributors(repoOwner, repoName, cb) {

}

// Call our function
getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});