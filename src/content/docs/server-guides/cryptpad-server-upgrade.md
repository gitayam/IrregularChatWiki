---
title: "Cryptpad-server-upgrade"
---

# Cryptpad-server-upgrade

## Updating CryptPad
This guide provides step-by-step instructions to update CryptPad to the latest version, including fetching the latest release, ensuring dependencies are installed, and restarting the server.

### Finding the Latest Release
CryptPad releases can be found on their official GitHub page: [CryptPad Releases](https://github.com/cryptpad/cryptpad/releases).

Before proceeding, ensure you back up your CryptPad data directory to prevent data loss during the update process.

```

tar -czf cryptpad_backup_$(date +"%Y-%m-%d").tar.gz /path/to/cryptpad/data

```

Replace `/path/to/cryptpad/data` with the actual path to your CryptPad data directory.

### Steps to Update CryptPad

### 1. Fetch Latest Tags
Ensure your local repository is updated with the latest tags:

```

git fetch origin --tags

```

This command synchronizes your local repository with the latest updates from the CryptPad GitHub repository.

### 2. Check Out the Latest Release
Identify and check out the latest release tag. Replace `2024.3.0` with the tag corresponding to the latest release:

```

git checkout 2024.3.0

```

### 3. Install JavaScript Dependencies
Ensure all necessary JavaScript components are installed:

```

npm ci
npm install
npm run install:components

```

- `npm ci`: Installs dependencies as specified in the `package-lock.json` file.

- `npm install`: Installs missing dependencies or updates existing ones.

- `npm run install:components`: Ensures all required components for CryptPad are installed and configured.

### 4. Restart the CryptPad Server
Restart the CryptPad server to apply the updates:

```

systemctl restart cryptpad
systemctl status cryptpad

```

- Use `systemctl status cryptpad` to verify the server is running correctly.

### Additional Notes

### Testing the Update
After the server restarts, navigate to your CryptPad instance in a web browser and ensure all functionalities are working correctly. Common areas to test include:

- Logging in and creating new pads.

- Sharing and collaborating on pads.

- Exporting and importing pads.

### Troubleshooting
If you encounter issues after updating:

## Check the server logs for errors:
   ```

   journalctl -u cryptpad

```

2. Verify file permissions and ownership in the CryptPad directory.

3. Ensure all dependencies are up-to-date by running:
   ```

   npm outdated

```

4. Roll back to your previous working version using the backup created earlier.

### Automating Updates
To simplify future updates, consider creating a script:

```

#!/bin/bash
1. Update CryptPad script

1. Variables
CRYPTPAD_DIR="/path/to/cryptpad"
LATEST_TAG=$(git -C $CRYPTPAD_DIR tag | sort -V | tail -n 1)

1. Navigate to CryptPad directory
cd $CRYPTPAD_DIR

1. Fetch and update
git fetch origin --tags
git checkout $LATEST_TAG

1. Install dependencies
npm ci
npm install
npm run install:components

1. Restart service
systemctl restart cryptpad
systemctl status cryptpad

```

Replace `/path/to/cryptpad` with the path to your CryptPad installation.

### References

- [CryptPad Releases](https://github.com/cryptpad/cryptpad/releases)

- [npm ci Documentation](https://docs.npmjs.com/cli/v7/commands/npm-ci)

- [SYSTEMD Documentation](https://systemd.io)
