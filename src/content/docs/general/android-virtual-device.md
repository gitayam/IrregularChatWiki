---
title: "Android-virtual-device"
---

# Android-virtual-device

## Android Virtual Emulator
Return to [Environment](/general/virtual-environments) page

The Android Virtual Device (AVD) Emulator, part of Android Studio, is a tool for running and debugging Android applications. It is free, open-source, and does not require an internet connection after installation.

This is a part of the [guide](/general/dfp-guide) and the [section ## Installation 1. Download Android Studio from [https://developer.android.com/studio/install here](/research/). 2. Follow the installation instructions for your operating system.

### Windows - Run the downloaded installer and follow the prompts.

### MacOS - Ensure Homebrew is installed: ``SHELL /bin/bash -c “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)”
- Install using Homebrew:
```

brew install --cask android-studio
```

### Linux - Extract the downloaded tar.gz file. - Run the `studio.sh` script from the extracted directory.

Launch Android Studio and go to “More Actions” &gt; “AVD Manager.”
In the AVD Manager, select “Create Virtual Device.”
Choose a device to emulate.
Select a system image (Android version) to use. (Expect about a 1GB download per image.)
Name your emulator and click “Finish.”


### Installing Applications
'' Download applications as “.apk” files from trusted sources like F-Droid.
'' Store .apk files in a central location for the organization.
'' Drag and drop the .apk file onto the running emulator to install.

**Recommended FOSS App Markets:** - [Aurora Store](https://aurora-store.en.uptodown.com/android) - [F-Droid](https://f-droid.org/)


   1. Migration
To create a backup of your AVD:

1. Locate your AVD folder. Common locations:
#'' Windows: `C:\Users\&lt;YourUserName&gt;\.android\`
#* Linux/Mac: `~/.android`
1. In the `.android` folder, locate the AVD you want to export.
1. Compress the `device.avd` folder and the `device.ini` file (replace ‘device’ with the name of your AVD).
1. Move the compressed files to the new location.
To import the AVD on another machine: 1. Uncompress the files in the appropriate `.android` directory. 2. If moving across OS, adjust the file paths in `device.ini` to match the new system’s format. 3. In AVD Manager, go to “Import,” select the backed-up AVD. If an error occurs, use the “Repair” option.
