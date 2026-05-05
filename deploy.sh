#!/bin/bash
# Build the project
pnpm run build

# Copy dist contents to root (for GitHub Pages)
# Keep README.md and other important files
cp -r dist/* .
touch .nojekyll

echo "Build complete! GitHub Pages will serve from root."
