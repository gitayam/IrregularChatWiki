---
title: "Protonmail Bridge on Linux"
---

# Protonmail Bridge on Linux

## Installing Proton Mail Bridge
Proton Mail Bridge is a tool that allows you to integrate your Proton Mail account with standard email clients. This page outlines the steps for downloading, installing, and configuring Proton Mail Bridge on Linux.

### Download Proton Mail Bridge
To begin, download the `.deb` file from the official Proton Mail website:

[Mail Bridge Download Page](https://proton.me/mail/bridge|Proton)

```

wget https://proton.me/download/bridge/protonmail-bridge_3.9.1-1_amd64.deb

```

### Prepare the Environment
Before installing Proton Mail Bridge, ensure your system is equipped with the necessary dependencies. Run the following command:

```

sudo apt-get install build-essential libgl1-mesa-dev

```

### Install Proton Bridge
Once the environment is prepared, proceed with the installation of Proton Mail Bridge:

```

sudo apt install ./protonmail-bridge_*_amd64.deb

```

### Configuring Proton Bridge
After installation, you need to configure Proton Mail Bridge. Use the following command to start the configuration process:

```

protonmail-bridge --cli

```

You will be prompted to:

1. **Login**: Enter your main Proton Mail credentials.

1. **Change Mode**: Use the command `change mode` to enable "Split mode," allowing you to split your inbox to use multiple identities.

### Additional Configuration Options
After enabling Split mode, you can configure additional settings as follows:

- **Identity Management**: Add or remove identities as needed.

- **Email Client Integration**: Follow the instructions to connect Proton Mail Bridge with your preferred email client (e.g., Thunderbird, Outlook).

- **Synchronization Settings**: Adjust synchronization settings to control how frequently your email client checks for new messages.

### Troubleshooting
If you encounter issues during installation or configuration, consider the following steps:

- **Check Dependencies**: Ensure all required packages are installed.

- **Review Logs**: Examine the logs for any error messages that can provide insight into the problem.

- **Community Support**: Visit the Proton Mail support forum or community for assistance from other users.

### Conclusion
By following these steps, you can successfully install and configure Proton Mail Bridge, allowing you to use your Proton Mail account with standard email clients seamlessly.
