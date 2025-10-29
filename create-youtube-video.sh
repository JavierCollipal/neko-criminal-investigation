#!/bin/bash

# YouTube Video Creation from Puppeteer Frames
# Created by: Neko-Arc, Mario Gallo Bestino, Noel, Glam Americano
# Date: October 23, 2025

set -e

echo "🎬 CREATING YOUTUBE VIDEO FROM PUPPETEER FRAMES"
echo ""

# Configuration (Rule 3.14: Use today's date!)
TODAY=$(date +%Y%m%d)
PROJECT_DIR="/home/wakibaka/Documents/github/neko-criminal-investigation"
YOUTUBE_REPO="/home/wakibaka/Documents/github/wakibaka-youtube-videos"
OUTPUT_FILE="$YOUTUBE_REPO/neko-criminal-investigation-demo-$TODAY.mp4"

# Source files
HYMN="/home/wakibaka/Documents/carabineros-hymn.mp3"
FRAME_DIR="$PROJECT_DIR"

echo "📁 Configuration:"
echo "  Frames: $FRAME_DIR/demo-*.png"
echo "  Audio: $HYMN"
echo "  Output: $OUTPUT_FILE"
echo ""

# Verify hymn exists (Rule 3.9 enforcement!)
if [ ! -f "$HYMN" ]; then
  echo "❌ ERROR: Carabineros hymn not found! (Rule 3.9 violation!)"
  exit 1
fi

# Verify YouTube repository exists (Rule 3.10!)
if [ ! -d "$YOUTUBE_REPO" ]; then
  echo "⚠️ YouTube repository not found, creating..."
  mkdir -p "$YOUTUBE_REPO"
fi

# Create filelist for ffmpeg concat
FILELIST="$PROJECT_DIR/framelist.txt"
echo "📝 Creating frame list..."

cat > "$FILELIST" << EOF
file '$FRAME_DIR/demo-1-stats.png'
duration 5
file '$FRAME_DIR/demo-2-filter-critical.png'
duration 5
file '$FRAME_DIR/demo-3-search.png'
duration 5
file '$FRAME_DIR/demo-4-sort.png'
duration 5
file '$FRAME_DIR/demo-5-profiles.png'
duration 5
EOF

echo "✅ Frame list created with 5 frames (5 seconds each = 25 seconds total)"
echo ""

# All Four Personalities Announce
echo "🐾 Neko-Arc: Creating video with ffmpeg, nyaa~!"
echo "🎭 Mario: The frames shall dance to the Carabineros hymn!"
echo "🗡️ Noel: Encoding H.264 video, AAC audio, 1920x1080 resolution."
echo "🎸 Glam: ¡Vamos a crear el video profesional, hermano!"
echo ""

# Create video using ffmpeg
echo "🎬 Running ffmpeg..."
ffmpeg -f concat -safe 0 -i "$FILELIST" \
  -i "$HYMN" \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -c:v libx264 -preset slow -crf 18 -r 30 \
  -c:a aac -b:a 192k -shortest \
  "$OUTPUT_FILE" -y

# Cleanup
rm "$FILELIST"

echo ""
echo "✅ VIDEO CREATED SUCCESSFULLY!"
echo ""
echo "📊 Video Details:"
ls -lh "$OUTPUT_FILE"
ffprobe -v quiet -print_format json -show_format -show_streams "$OUTPUT_FILE" | grep -E '(duration|width|height|codec_name)' | head -10

echo ""
echo "📁 Location: $OUTPUT_FILE"
echo "🎵 Audio: Carabineros Hymn (Rule 3.9 ✅)"
echo "📦 Repository: wakibaka-youtube-videos (Rule 3.10 ✅)"
echo "📅 Date: $TODAY (Rule 3.14 ✅)"
echo ""
echo "🎉 Ready for YouTube upload!"
