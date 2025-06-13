# Video Download Scripts for PitchPro

This directory contains scripts to download all videos from Google Cloud Storage to your local `public/videos` directory for offline use.

## Available Scripts

### 1. Shell Script (Recommended)

**File:** `download-videos.sh`

**Requirements:**

- Google Cloud CLI (`gcloud`) installed
- `gsutil` command available

**Usage:**

```bash
./download-videos.sh
```

**Installation of Google Cloud CLI:**

```bash
# macOS (using Homebrew)
brew install google-cloud-sdk

# Or download from: https://cloud.google.com/sdk/docs/install
```

### 2. Node.js Script (Alternative)

**File:** `download-videos-node.js`

**Requirements:**

- Node.js installed
- `@google-cloud/storage` package (already available in backend)

**Usage:**

```bash
# From project root
node download-videos-node.js

# Or make it executable and run directly
./download-videos-node.js
```

## Configuration

Both scripts are pre-configured with:

- **Credentials:** `/Users/yuma/Documents/project/budosen/pitch-pro/be-pitch-pro/pitch-pro-cloud-7686e19f8f57.json`
- **Bucket:** `assets-pitchpro`
- **Local Directory:** `/Users/yuma/Documents/project/budosen/pitch-pro/pitchpro-fe/public/videos`

## What the Scripts Do

1. **Authenticate** with Google Cloud Storage using the service account credentials
2. **List** all video files in the `assets-pitchpro` bucket
3. **Download** each video file to the local `public/videos` directory
4. **Skip** files that already exist locally
5. **Report** download progress and summary

## Supported Video Formats

- `.mp4`
- `.avi`
- `.mov`
- `.mkv`
- `.webm`

## Features

- ✅ **Smart Skip:** Won't re-download existing files
- ✅ **Progress Tracking:** Shows download progress for each file
- ✅ **Error Handling:** Continues downloading even if some files fail
- ✅ **Summary Report:** Shows total downloads and any errors
- ✅ **Colored Output:** Easy to read console output
- ✅ **File Size Display:** Shows downloaded file sizes

## Troubleshooting

### Shell Script Issues

**Error: `gcloud command not found`**

```bash
# Install Google Cloud CLI
brew install google-cloud-sdk
# Or follow: https://cloud.google.com/sdk/docs/install
```

**Error: `Authentication failed`**

- Verify the credentials file exists at the specified path
- Check that the service account has proper permissions

### Node.js Script Issues

**Error: `@google-cloud/storage package not found`**

```bash
# Install the package
npm install @google-cloud/storage

# Or run from the backend directory where it's already installed
cd be-pitch-pro
node ../download-videos-node.js
```

**Error: `EACCES: permission denied`**

```bash
# Fix permissions
sudo chown -R $(whoami) /Users/yuma/Documents/project/budosen/pitch-pro/pitchpro-fe/public/videos
```

## After Download

Once videos are downloaded:

1. **Restart your frontend application** to ensure the fallback mechanism works
2. **Test offline functionality** by disconnecting from the internet
3. **Videos will automatically fallback** to local files when cloud storage is unavailable

## File Structure After Download

```
pitchpro-fe/public/videos/
├── (1)Pilih belajar(CS).mp4
├── (2.A)Teman(CS).mp4
├── (2.B)Sendiri(CS).mp4
├── (2.A.1)Persuasive(AUDIO).mp4
└── ... (other video files)
```

## Security Note

The credentials file contains sensitive information. Ensure it's:

- ✅ Not committed to version control (already in `.gitignore`)
- ✅ Has proper file permissions (readable only by you)
- ✅ Stored securely

## Integration with PitchPro

The downloaded videos work seamlessly with the enhanced video fallback mechanism implemented in:

- `useSceneMetaData.js` - Handles video URL resolution with fallback
- `LocalVideoPlayer.jsx` - Automatically falls back to local videos on error
- `LoopingVideoPlayer.js` - Supports local video fallback for looping videos

The application will automatically use local videos when:

- Backend server is unavailable
- Google Cloud Storage is unreachable
- Network connectivity issues occur
- Cloud video URLs fail to load
