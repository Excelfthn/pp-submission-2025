#!/bin/bash

# Video Download Script for PitchPro
# Downloads all videos from Google Cloud Storage to local public/videos directory

set -e  # Exit on any error

# Configuration
CREDENTIALS_FILE="/Users/yuma/Documents/project/budosen/pitch-pro/be-pitch-pro/pitch-pro-cloud-7686e19f8f57.json"
BUCKET_NAME="assets-pitchpro"
LOCAL_VIDEO_DIR="/Users/yuma/Documents/project/budosen/pitch-pro/pitchpro-fe/public/videos"
TEMP_DIR="/tmp/pitchpro-videos"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== PitchPro Video Download Script ===${NC}"
echo -e "${BLUE}Downloading videos from Google Cloud Storage${NC}"
echo ""

# Check if credentials file exists
if [ ! -f "$CREDENTIALS_FILE" ]; then
    echo -e "${RED}Error: Credentials file not found at $CREDENTIALS_FILE${NC}"
    exit 1
fi

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: Google Cloud CLI (gcloud) is not installed${NC}"
    echo -e "${YELLOW}Please install it from: https://cloud.google.com/sdk/docs/install${NC}"
    exit 1
fi

# Check if gsutil is available
if ! command -v gsutil &> /dev/null; then
    echo -e "${RED}Error: gsutil is not available${NC}"
    echo -e "${YELLOW}Please ensure Google Cloud SDK is properly installed${NC}"
    exit 1
fi

echo -e "${BLUE}Setting up authentication...${NC}"
# Authenticate using service account
export GOOGLE_APPLICATION_CREDENTIALS="$CREDENTIALS_FILE"
gcloud auth activate-service-account --key-file="$CREDENTIALS_FILE" --quiet

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to authenticate with Google Cloud${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Authentication successful${NC}"

# Create local video directory if it doesn't exist
echo -e "${BLUE}Creating local video directory...${NC}"
mkdir -p "$LOCAL_VIDEO_DIR"

# Create temporary directory
mkdir -p "$TEMP_DIR"

echo -e "${BLUE}Listing videos in bucket: $BUCKET_NAME${NC}"
# List all files in the bucket
VIDEO_FILES=$(gsutil ls "gs://$BUCKET_NAME/" | grep -E '\.(mp4|avi|mov|mkv|webm)$' || true)

if [ -z "$VIDEO_FILES" ]; then
    echo -e "${YELLOW}No video files found in bucket $BUCKET_NAME${NC}"
    exit 0
fi

echo -e "${GREEN}Found video files:${NC}"
echo "$VIDEO_FILES" | sed 's|gs://[^/]*/||'
echo ""

# Download each video file
echo -e "${BLUE}Starting download...${NC}"
DOWNLOAD_COUNT=0
ERROR_COUNT=0

while IFS= read -r file_url; do
    if [ -n "$file_url" ]; then
        # Extract filename from URL
        filename=$(basename "$file_url")
        local_path="$LOCAL_VIDEO_DIR/$filename"
        
        echo -e "${BLUE}Downloading: $filename${NC}"
        
        # Check if file already exists
        if [ -f "$local_path" ]; then
            echo -e "${YELLOW}  ⚠ File already exists, skipping...${NC}"
            continue
        fi
        
        # Download the file
        if gsutil cp "$file_url" "$local_path"; then
            echo -e "${GREEN}  ✓ Downloaded successfully${NC}"
            ((DOWNLOAD_COUNT++))
        else
            echo -e "${RED}  ✗ Failed to download${NC}"
            ((ERROR_COUNT++))
        fi
        echo ""
    fi
done <<< "$VIDEO_FILES"

# Cleanup
rm -rf "$TEMP_DIR"

# Summary
echo -e "${BLUE}=== Download Summary ===${NC}"
echo -e "${GREEN}Successfully downloaded: $DOWNLOAD_COUNT files${NC}"
if [ $ERROR_COUNT -gt 0 ]; then
    echo -e "${RED}Failed downloads: $ERROR_COUNT files${NC}"
fi
echo -e "${BLUE}Videos saved to: $LOCAL_VIDEO_DIR${NC}"

# List downloaded files
echo -e "\n${BLUE}Downloaded files:${NC}"
ls -la "$LOCAL_VIDEO_DIR" | grep -E '\.(mp4|avi|mov|mkv|webm)$' || echo "No video files found"

echo -e "\n${GREEN}✓ Video download complete!${NC}"

# Optional: Set proper permissions
chmod 644 "$LOCAL_VIDEO_DIR"/*.{mp4,avi,mov,mkv,webm} 2>/dev/null || true

echo -e "${BLUE}You can now use the videos offline in your PitchPro application.${NC}"