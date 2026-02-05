#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Get the current branch name
CURRENT_BRANCH=$(git branch --show-current)

echo "Starting deployment from branch: $CURRENT_BRANCH"

echo "----------------------------------------"
echo "Pushing to IrregularChat Git (origin)..."
git push origin "$CURRENT_BRANCH"

echo "----------------------------------------"
echo "Pushing to GitHub (github)..."
git push github "$CURRENT_BRANCH"

echo "----------------------------------------"
echo "Deployment to both repositories complete!"
