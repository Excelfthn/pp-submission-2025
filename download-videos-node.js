#!/usr/bin/env node

/**
 * Video Download Script for PitchPro (Node.js version)
 * Downloads all videos from Google Cloud Storage to local public/videos directory
 * Uses the same Google Cloud Storage setup as the backend
 */

const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Configuration
const CREDENTIALS_FILE =
  "/Users/yuma/Documents/project/budosen/pitch-pro/be-pitch-pro/pitch-pro-cloud-7686e19f8f57.json";
const BUCKET_NAME = "assets-pitchpro";
const LOCAL_VIDEO_DIR =
  "/Users/yuma/Documents/project/budosen/pitch-pro/pitchpro-fe/public/videos";

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https:") ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`)
          );
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });

        file.on("error", (err) => {
          fs.unlink(filepath, () => {}); // Delete partial file
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function main() {
  log("=== PitchPro Video Download Script (Node.js) ===", "blue");
  log("Downloading videos from Google Cloud Storage", "blue");
  console.log("");

  try {
    // Check if credentials file exists
    if (!fs.existsSync(CREDENTIALS_FILE)) {
      log(`Error: Credentials file not found at ${CREDENTIALS_FILE}`, "red");
      process.exit(1);
    }

    // Create local video directory if it doesn't exist
    log("Creating local video directory...", "blue");
    if (!fs.existsSync(LOCAL_VIDEO_DIR)) {
      fs.mkdirSync(LOCAL_VIDEO_DIR, { recursive: true });
    }

    // Initialize Google Cloud Storage
    log("Initializing Google Cloud Storage...", "blue");
    const storage = new Storage({
      keyFilename: CREDENTIALS_FILE,
    });

    const bucket = storage.bucket(BUCKET_NAME);

    // List all files in the bucket
    log(`Listing videos in bucket: ${BUCKET_NAME}`, "blue");
    const [files] = await bucket.getFiles();

    // Filter video files
    const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".webm"];
    const videoFiles = files.filter((file) => {
      const ext = path.extname(file.name).toLowerCase();
      return videoExtensions.includes(ext);
    });

    if (videoFiles.length === 0) {
      log(`No video files found in bucket ${BUCKET_NAME}`, "yellow");
      return;
    }

    log("Found video files:", "green");
    videoFiles.forEach((file) => {
      console.log(`  ${file.name}`);
    });
    console.log("");

    // Download each video file
    log("Starting download...", "blue");
    let downloadCount = 0;
    let errorCount = 0;

    for (const file of videoFiles) {
      const filename = file.name;
      const localPath = path.join(LOCAL_VIDEO_DIR, filename);

      log(`Downloading: ${filename}`, "blue");

      // Check if file already exists
      if (fs.existsSync(localPath)) {
        log("  ⚠ File already exists, skipping...", "yellow");
        continue;
      }

      try {
        // Generate signed URL
        const options = {
          version: "v4",
          action: "read",
          expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        };

        const [signedUrl] = await file.getSignedUrl(options);

        // Download the file
        await downloadFile(signedUrl, localPath);

        log("  ✓ Downloaded successfully", "green");
        downloadCount++;
      } catch (error) {
        log(`  ✗ Failed to download: ${error.message}`, "red");
        errorCount++;
      }

      console.log("");
    }

    // Summary
    log("=== Download Summary ===", "blue");
    log(`Successfully downloaded: ${downloadCount} files`, "green");
    if (errorCount > 0) {
      log(`Failed downloads: ${errorCount} files`, "red");
    }
    log(`Videos saved to: ${LOCAL_VIDEO_DIR}`, "blue");

    // List downloaded files
    console.log("");
    log("Downloaded files:", "blue");
    const localFiles = fs.readdirSync(LOCAL_VIDEO_DIR).filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return videoExtensions.includes(ext);
    });

    if (localFiles.length > 0) {
      localFiles.forEach((file) => {
        const stats = fs.statSync(path.join(LOCAL_VIDEO_DIR, file));
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`  ${file} (${sizeInMB} MB)`);
      });
    } else {
      console.log("  No video files found");
    }

    console.log("");
    log("✓ Video download complete!", "green");
    log(
      "You can now use the videos offline in your PitchPro application.",
      "blue"
    );
  } catch (error) {
    log(`Error: ${error.message}`, "red");
    console.error(error);
    process.exit(1);
  }
}

// Check if @google-cloud/storage is available
try {
  require("@google-cloud/storage");
  main();
} catch (error) {
  log("Error: @google-cloud/storage package not found", "red");
  log("Please run: npm install @google-cloud/storage", "yellow");
  log("Or use the shell script version: ./download-videos.sh", "blue");
  process.exit(1);
}
