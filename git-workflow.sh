#!/bin/bash

# Check if a commit message is provided
if [ -z "$1" ]; then
    echo "Error: Commit message is required."
    echo "Usage: ./git-workflow.sh 'Your commit message here'"
    exit 1
fi

# Run the Git workflow
git add .
git commit -m "$1"
git checkout main
git pull origin main
git merge dev-okto
git push origin main
git push origin dev-okto
git checkout dev-okto
git pull origin main