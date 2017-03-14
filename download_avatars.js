require('dotenv').config();
// Initial Setup - Make Sure Process.env has our two keys from our .env file
if(!((process.env.GITHUB_API && process.env.GITHUB_API.length > 0) && (process.env.USER && process.env.USER.length > 0))) {
  throw(new Error("Need to configure a .env file in: " + __dirname));
}


const REPO = process.argv[3];
const OWNER = process.argv[2];

try {
  if(process.argv.length > 4) {
    console.log("Please only provide a username and a repository in the form <USER> <REPOSITORY>");
    throw(new Error("Too Many Words"));
  }

  // Initial Setup - make sure that we have our avatar dir if it doesn't exist
  if (!fs.existsSync(AVATAR_DIR)){
    fs.mkdirSync(AVATAR_DIR);
  }

  console.log('Welcome to the GitHub Avatar Downloader!');

  // Call our function
  getRepoContributors(OWNER, REPO, function(err, result) {
    console.log("Errors:", err);
    // console.log("Result:", result);
    // Loop Over the avatars
    result.forEach(dataGrabber);
  });
}catch(e) {
  console.log(`An Error Occurred: ${e.name} - "${e.message}");
}

