---
title: "MediaWiki for Communities of Interest"
---

# MediaWiki for Communities of Interest

## About

### Is MediaWiki the Right Choice

### Considerations Before You Start

- Consider whether your community has permanent file storage when determining whether to allow PDFs and other file types and increasing the file size on the media wiki.

- You'll likely want to customize the wiki name and logo. You should also consider customizing terms and privacy agreements.

### Configuring MediaWiki

### Customizing the MediaWiki
You'll likely want to customize the wiki name and logo. You should also consider customizing terms and privacy agreements.

### File Uploads
When determining whether to allow PDFs and other file types and increasing the file size on the media wiki, consider whether your community has permanent file storage.

### Extensions to Consider

### API Integration

### Enabling Identity Management

### Enabling 3D Model Uploads
This page provides instructions on enabling the upload and display of 3D model files (STL format) on this MediaWiki instance using the **3D** and **3d2png** extensions. It includes setting up the necessary extensions and configurations for handling and rendering 3D files.

### Prerequisites
Before uploading 3D model files, ensure the following extensions are installed:

- **3D Extension** (For STL file upload)

- **3d2png** (For thumbnail rendering of 3D models)

- **VisualEditor** (Optional but recommended for an enhanced editing experience)

### Installation and Configuration

#### 1. Allow 3D File Uploads
Add the following lines to your `LocalSettings.php` file to enable STL file uploads:

```

$wgTrustedMediaFormats[= 'application/sla';
$wgFileExtensions[](]) = 'stl';

```

#### 2. Install the 3D Extension
Download and install the 3D extension by cloning the repository:

```

cd /var/www/html/extensions
git clone -b REL1_42 https://gerrit.wikimedia.org/r/mediawiki/extensions/3D

```

After that, load the extension by adding this to the `LocalSettings.php` file:

```

wfLoadExtension('3D');

```

#### 3. Install the 3d2png Extension (for thumbnail rendering)
Clone the 3d2png repository, install dependencies, and configure:

```

git clone -b REL1_42 https://gerrit.wikimedia.org/r/3d2png
cd 3d2png
npm install

```

Update `LocalSettings.php` to tell the 3D extension how to call the thumbnail generator:

##### Troubleshooting
If you encounter issues during the setup, ensure the following:

- Ensure **xvfb** and other X11 dependencies are installed using the following command:

```

apt-get install libx11-dev libxi-dev libxext-dev xvfb libgl1-mesa-dev libglu1-mesa-dev freeglut3-dev mesa-common-dev

```

- Check for missing dependencies or errors in the JavaScript libraries during `npm install`.

- If NPM install doesn't work this may fix it. Make sure that the version of these repos cloned matches with the version of media wiki you are running.
  - git clone -b REL1_42 for mediawiki 1.42.*

##### Configuring
```

$wg3dProcessor = [
    '/usr/bin/xvfb-run',
    '-a',
    '-s',
    '-ac -screen 0 1280x1024x24',
    '/var/www/html/extensions/3d2png/3d2png.js'
];

```

#### 4. Optional: Install MultimediaViewer Extension
For better interaction with 3D models (move, pan, zoom), install the **MultimediaViewer** extension and add the following configuration to `LocalSettings.php`:

```

$wgMediaViewerExtensions[= 'mmv.3d';

```

### Usage Instructions
Once the extensions are installed and configured:

#### 1. Upload 3D Model Files
Navigate to the [Special:Upload](Special:Upload) page and upload your `.stl` files.

#### 2. View 3D Models
Uploaded 3D models will be displayed interactively on their file pages. Thumbnails will be automatically generated using the `3d2png` service.


