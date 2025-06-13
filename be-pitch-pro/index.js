require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const AuthController = require("./controllers/authController");
const PostProgress = require("./controllers/postTestController");
const PreProgress = require("./controllers/preTestController");
const AllScenario = require("./controllers/commonFeature/storiesController");
const ChallengeFeedback = require("./controllers/challengeFeedbackController");
const User = require("./controllers/commonFeature/profileController");
const EndingFeedback = require("./controllers/EndingFeedbackController");
const Badge = require("./controllers/commonFeature/badgeController");
const Video = require("./controllers/videoSceneController");
const port = process.env.PORT;

// List of allowed origins
const allowedOrigins = [
  "http://localhost:3000", // Allow localhost
  "http://20.151.96.151", // Allow specific IP
  // "*", // Add more IPs or domains as needed
];

app.use(
  cors({
    // origin: "*",
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowedOrigins array
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/", AuthController);

app.use("/stories", AllScenario);

app.use("/pre-test", PreProgress);

app.use("/post-test", PostProgress);

app.use("/generate", ChallengeFeedback);

app.use("/user", User);

app.use("/badge", Badge);

app.use("/ending-feedback", EndingFeedback);

app.use("/story", Video); // Route for story/chapter/filename pattern

app.use("/media", Video);

app.use("/videos", Video); // Route for direct video access

// app.listen(port, () => {
//   console.log(`Server menyala pada port ${port}`);
// });

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
