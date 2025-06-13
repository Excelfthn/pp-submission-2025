require("dotenv").config();
const express = require("express");
const authorizeToken = require("../services/middleAuthorization");
const route = express.Router();
const { videoUrlGCloud } = require("../services/videoSceneService");
const { getUrlVideo } = require("../repository/videoSceneRepository");

// Public route for media files (no auth required)
route.get("/", async (req, res) => {
  try {
    const { filename } = req.query;
    if (!filename) {
      return res.status(400).json({ error: "Filename parameter is required" });
    }

    const bucketName = "assets-pitchpro";
    const options = {
      version: "v4",
      action: "read",
      expires: Date.now() + 24 * 60 * 60 * 1000,
    };

    const videoUrl = await getUrlVideo(bucketName, filename, options);
    res.redirect(videoUrl); // Redirect to the signed URL
  } catch (err) {
    console.error("Error serving video:", err);
    res.status(404).json({ error: "Video not found" });
  }
});

// Apply auth middleware to other routes
route.use(authorizeToken);

route.get("/all", async (req, res) => {
  try {
    const url = await videoUrlGCloud();
    res.status(200).json({
      message: `Getting All URL Video Succesfully`,
      url,
    });
  } catch (err) {
    console.error("Error generating signed URL:", err);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
});

// Route to handle direct filename access (e.g., /videos/filename.mp4)
route.get("/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const bucketName = "assets-pitchpro";
    const options = {
      version: "v4",
      action: "read",
      expires: Date.now() + 24 * 60 * 60 * 1000,
    };

    const videoUrl = await getUrlVideo(bucketName, filename, options);
    res.redirect(videoUrl); // Redirect to the signed URL
  } catch (err) {
    console.error("Error serving video:", err);
    res.status(404).json({ error: "Video not found" });
  }
});

// Route to handle story/chapter/filename pattern
route.get("/:storyId/:chapterId/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const bucketName = "assets-pitchpro";
    const options = {
      version: "v4",
      action: "read",
      expires: Date.now() + 24 * 60 * 60 * 1000,
    };

    const videoUrl = await getUrlVideo(bucketName, filename, options);
    res.redirect(videoUrl); // Redirect to the signed URL
  } catch (err) {
    console.error("Error serving video:", err);
    res.status(404).json({ error: "Video not found" });
  }
});

module.exports = route;
