// Adding .env key vals to environment
require('dotenv').config();
// Get Our GitHub Library
const gitLib = require('./github-lib');

function main() {
  // Initial Setup - Make Sure Process.env has our two keys from our .env file
  let useAPI = true;
  if(!((process.env.GITHUB_API && process.env.GITHUB_API.length > 0) && (process.env.USER && process.env.USER.length > 0))) {
    // throw(new Error("Need to configure a .env file in: " + __dirname));
    console.log(".env file does not have credentials in it yet")
    useAPI = false;
  }

  // Makes sure we are only receiving two words as input
  if(!(process.argv.length < 5 && process.argv[3])) {
    console.log("Please only provide a username and a repository in the form <USER> <REPOSITORY>");
    throw(new Error("Please Enter two words - no more - no less"));
  }

  // Get the User Input
  const REPO = process.argv[3];
  const OWNER = process.argv[2];

  console.log('Welcome to the GitHub Avatar Downloader!');

  // Call our function
  gitLib.getRepoContributors(OWNER, REPO, useAPI, function(err, result) {
    if(err){
      console.log(`An Error Occurred: ${err}`);
      return err;
    }
    if(result && result.length > 0){
      // Loop Over the avatars and download them
      result.forEach(gitLib.dataGrabber);
    }
  });
}

main();


