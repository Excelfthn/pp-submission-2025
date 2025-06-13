const { Storage } = require("@google-cloud/storage");
const path = require("path");

// Use the service account key file directly
const keyFilename = path.join(
  __dirname,
  "..",
  "pitch-pro-cloud-7686e19f8f57.json"
);

const storage = new Storage({
  keyFilename: keyFilename,
});

const getUrlVideo = async (bucketName, fileName, options) => {
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);
  return url;
};
module.exports = {
  getUrlVideo,
};
