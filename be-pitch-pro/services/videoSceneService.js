// Repository handles Google Cloud Storage initialization

const { getUrlVideo } = require("../repository/videoSceneRepository");

const videoUrlGCloud = async () => {
  const { Storage } = require("@google-cloud/storage");
  const path = require("path");

  // Use the service account key file directly for listing files
  const keyFilename = path.join(
    __dirname,
    "..",
    "pitch-pro-cloud-7686e19f8f57.json"
  );

  const storage = new Storage({
    keyFilename: keyFilename,
  });

  const bucketName = "assets-pitchpro";
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 24 * 60 * 60 * 1000,
  };

  const [files] = await storage.bucket(bucketName).getFiles();
  const fileNames = files.map((file) => file.name);
  console.log(fileNames);

  const allUrlFiles = [];
  for (const name of fileNames) {
    const videoUrl = await getUrlVideo(bucketName, name, options);
    const data = {
      fileName: name,
      videoUrl,
    };
    allUrlFiles.push(data);
  }

  return allUrlFiles;
};

module.exports = {
  videoUrlGCloud,
};
