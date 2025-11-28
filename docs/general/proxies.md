---
title: "Proxies"
---

# Proxies

## Proxies: Serving, Using, and TOR

### Context

### Outcome
This guide will help you configure your system to route all network traffic through the Tor network using Privoxy. By the end of this guide, your internet traffic will be anonymized, enhancing your privacy and security.


### Benefits
Routing all traffic through Tor provides several benefits:

- **Anonymity**: Tor hides your IP address by routing your traffic through multiple nodes.

- **Privacy**: Your internet service provider (ISP) and other third parties cannot easily monitor your online activities.

- **Access to Restricted Content**: You can access content that may be blocked or restricted in your region.


### Tor vs. VPN

- **Tor**: Tor is a free, decentralized network that anonymizes your traffic by routing it through multiple volunteer-operated nodes. It is particularly effective for high privacy needs but may be slower due to multiple hops.

- **VPN**: A VPN provides encryption and routes your traffic through a server operated by the VPN provider. VPNs can offer faster speeds and are easier to use but require trust in the VPN provider.


### Proxy vs. VPN

- **Proxy**: A proxy routes your internet traffic through a single server, hiding your IP address but not necessarily encrypting your data. Proxies are useful for accessing geo-restricted content but offer less security than VPNs or Tor.

- **VPN**: A VPN encrypts all your traffic and routes it through a secure server, providing both privacy and security. VPNs are generally faster than Tor but require trust in the VPN provider.


### Privacy and Security Considerations

#### Serving a Proxy
When setting up a proxy server, consider the following:

- **Security**: Ensure the server is secured to prevent unauthorized access. Use strong passwords and consider setting up a firewall.

- **Privacy**: Be aware that the server can log all traffic passing through it. If privacy is critical, configure the server to avoid logging or encrypt logs.


#### Using a Proxy
When using a proxy server, consider the following:

- **Anonymity**: Your traffic is routed through the proxy, masking your IP address but not necessarily encrypting your data.

- **Trust**: Ensure you trust the proxy server you are using, as it can potentially log your traffic and access sensitive information.

### Routing All Traffic Through Tor Using Privoxy

### For macOS

#### Step 1: Install Tor and Privoxy
First, we need to install both Tor and Privoxy using Homebrew.

1. **Install Homebrew** (if not already installed):
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

1. **Install Tor**:
```
brew install tor
```

1. **Install Privoxy**:
```
brew install privoxy
```


#### Step 2: Configure Privoxy to Use Tor
Edit the Privoxy configuration file to route traffic through Tor.

1. **Open Privoxy’s Configuration File**:
```
nano /opt/homebrew/etc/privoxy/config
```

1. **Add Tor Configuration**: Add the following line to the configuration file:
```
forward-socks5t / 127.0.0.1:9050 .
```

1. **Save and Exit**:

- Press `CTRL + X` to exit.

- Press `Y` to confirm saving the changes.

- Press `Enter` to save the file.


#### Step 3: Start Privoxy
Start Privoxy as a background service.

1. **Start Privoxy**:
```
brew services start privoxy
```


#### Step 4: Configure macOS to Use Privoxy as a System Proxy
Configure your macOS network settings to use Privoxy.

= **Open System Preferences**:

## Go to `System Preferences` &gt; `Network`.

= **Select the Network Interface**:

## Select the network interface you are using (e.g., Wi-Fi or Ethernet).

= **Configure Proxies**:

## Click on `Advanced`.

## Go to the `Proxies` tab.

## Check `Web Proxy (HTTP)` and `Secure Web Proxy (HTTPS)`.

## Set both to `127.0.0.1` and `8118` (Privoxy’s default port).

= **Apply Changes**:

## Click `OK` and `Apply`.


#### Step 5: Verify the Configuration
Ensure that your traffic is being routed through Tor.

1. **Check IP Address**: Open a web browser and navigate to `http://check.torproject.org`. This page should confirm that your traffic is being routed through the Tor network.

1. **Test Connection**: Use ```
curl -L --proxy http://127.0.0.1:8118 http://check.torproject.org
``` to verify the connection.


### Example Privoxy Configuration
Here is an example of what your Privoxy configuration might look like after editing:

```
# Forward all traffic through Tor
forward-socks5t / 127.0.0.1:9050 .
```


### For Linux

#### Step 1: Install Tor and Privoxy
First, we need to install both Tor and Privoxy.

1. **Update Package List**:
```
sudo apt update
```

1. **Install Tor**:
```
sudo apt install tor
```

1. **Install Privoxy**:
```
sudo apt install privoxy
```


#### Step 2: Configure Privoxy to Use Tor
Edit the Privoxy configuration file to route traffic through Tor.

1. **Open Privoxy’s Configuration File**:
```
sudo nano /etc/privoxy/config
```

1. **Add Tor Configuration**: Add the following line to the configuration file:
```
forward-socks5t / 127.0.0.1:9050 .
```

1. **Save and Exit**:

- Press `CTRL + X` to exit.

- Press `Y` to confirm saving the changes.

- Press `Enter` to save the file.


#### Step 3: Start Privoxy
Start Privoxy as a background service.

1. **Start Privoxy**:
```
sudo systemctl start privoxy
sudo systemctl enable privoxy
```


#### Step 4: Set Up Port Forwarding

1. **Configure Your Router**: Ensure your router forwards external traffic on port `8118` to your Linux machine’s IP address. You can find your IP address using:
```
PUBLIC_IP=$(curl -s ifconfig.me)
echo $PUBLIC_IP
```


#### Step 5: Secure Remote Access with SSH Tunneling

1. **Create SSH Tunnel Script**: Create a script to automate the creation of an SSH tunnel. Replace `your_linux_username` with your actual Linux username.
```
PUBLIC_IP=$(curl -s ifconfig.me)
echo "ssh -L 8118:localhost:8118 $(whoami)@$PUBLIC_IP" > connect_proxy.sh
chmod +x connect_proxy.sh
```

1. **Run the Script on the Remote Machine**: On your remote machine, run the script to create an SSH tunnel:
```
./connect_proxy.sh
```

1. **Configure Remote Device to Use Proxy**: On your remote device, configure your web browser or system settings to use the proxy:

- HTTP Proxy: `127.0.0.1`

- Port: `8118`

### Connecting to the Proxy from a Remote System

### For macOS

#### Step 1: Create SSH Tunnel

1. **Run the SSH Tunnel Script**: On your macOS remote machine, run the script created previously to establish an SSH tunnel:
```
./connect_proxy.sh
```


#### Step 2: Configure macOS to Use the Proxy
= **Open System Preferences**:

## Go to `System Preferences` &gt; `Network`.

= **Select the Network Interface**:

## Select the network interface you are using (e.g., Wi-Fi or Ethernet).

= **Configure Proxies**:

## Click on `Advanced`.

## Go to the `Proxies` tab.

## Check `Web Proxy (HTTP)` and `Secure Web Proxy (HTTPS)`.

## Set both to `127.0.0.1` and `8118`.

= **Apply Changes**:

## Click `OK` and `Apply`.


### For Windows

#### Step 1: Create SSH Tunnel
= **Install PuTTY** (if not already installed):

## Download and install PuTTY from [here](https://www.putty.org/).

= **Configure SSH Tunnel**:

## Open PuTTY.

## Enter the hostname or IP address of your proxy server.

## In the left-hand menu, go to `Connection &gt; SSH &gt; Tunnels`.

## Add a new forwarded port:

1. **Source port: `8118`

1. **Destination: `localhost:8118`

## Click `Add`.

## Go back to the `Session` category.

## Click `Open` to start the SSH session.


#### Step 2: Configure Windows to Use the Proxy
= **Open Internet Options**:

## Go to `Control Panel` &gt; `Internet Options`.

= **Configure LAN Settings**:

## Go to the `Connections` tab and click on `LAN settings`.

## Check `Use a proxy server for your LAN`.

## Enter `127.0.0.1` for the address and `8118` for the port.

## Click `OK` to apply the changes.


### For iOS

#### Step 1: Create SSH Tunnel
= **Install an SSH Client**:

## Install an SSH client like Termius from the App Store.

= **Configure SSH Tunnel**:

## Open Termius.

## Add a new host with the IP address of your proxy server.

## Go to the `Port Forwarding` section and add a new rule:

1. **Local port: `8118`

1. **Remote host: `localhost`

1. **Remote port: `8118`

## Connect to the host to start the tunnel.


#### Step 2: Configure iOS to Use the Proxy
= **Configure Wi-Fi Proxy**:

## Go to `Settings` &gt; `Wi-Fi`.

## Tap the information icon (i) next to your Wi-Fi network.

## Scroll down to `HTTP Proxy` and select `Manual`.

## Enter `127.0.0.1` for the Server and `8118` for the Port.

## Save the settings.


### For Android

#### Step 1: Create SSH Tunnel
= **Install an SSH Client**:

## Install an SSH client like ConnectBot from the Google Play Store.

= **Configure SSH Tunnel**:

## Open ConnectBot.

## Add a new host with the IP address of your proxy server.

## Go to the port forwarding section and add a new rule:

1. **Type: Local

1. **Source port: `8118`

1. **Destination: `localhost:8118`

## Connect to the host to start the tunnel.


#### Step 2: Configure Android to Use the Proxy
= **Configure Wi-Fi Proxy**:

## Go to `Settings` &gt; `Network &amp; Internet` &gt; `Wi-Fi`.

## Long-press your connected Wi-Fi network and select `Modify network`.

## Scroll down and select `Advanced options`.

## Set `Proxy` to `Manual`.

## Enter `127.0.0.1` for the Hostname and `8118` for the Port.

## Save the settings.
