import{_ as s,c as a,o as e,ag as p}from"./chunks/framework.CQuhCYrb.js";const d=JSON.parse('{"title":"Proxies","description":"","frontmatter":{"title":"Proxies"},"headers":[],"relativePath":"general/proxies.md","filePath":"general/proxies.md","lastUpdated":null}'),r={name:"general/proxies.md"};function l(i,n,t,o,c,u){return e(),a("div",null,[...n[0]||(n[0]=[p(`<h1 id="proxies" tabindex="-1">Proxies <a class="header-anchor" href="#proxies" aria-label="Permalink to &quot;Proxies&quot;">​</a></h1><h2 id="proxies-serving-using-and-tor" tabindex="-1">Proxies: Serving, Using, and TOR <a class="header-anchor" href="#proxies-serving-using-and-tor" aria-label="Permalink to &quot;Proxies: Serving, Using, and TOR&quot;">​</a></h2><h3 id="context" tabindex="-1">Context <a class="header-anchor" href="#context" aria-label="Permalink to &quot;Context&quot;">​</a></h3><h3 id="outcome" tabindex="-1">Outcome <a class="header-anchor" href="#outcome" aria-label="Permalink to &quot;Outcome&quot;">​</a></h3><p>This guide will help you configure your system to route all network traffic through the Tor network using Privoxy. By the end of this guide, your internet traffic will be anonymized, enhancing your privacy and security.</p><h3 id="benefits" tabindex="-1">Benefits <a class="header-anchor" href="#benefits" aria-label="Permalink to &quot;Benefits&quot;">​</a></h3><p>Routing all traffic through Tor provides several benefits:</p><ul><li><p><strong>Anonymity</strong>: Tor hides your IP address by routing your traffic through multiple nodes.</p></li><li><p><strong>Privacy</strong>: Your internet service provider (ISP) and other third parties cannot easily monitor your online activities.</p></li><li><p><strong>Access to Restricted Content</strong>: You can access content that may be blocked or restricted in your region.</p></li></ul><h3 id="tor-vs-vpn" tabindex="-1">Tor vs. VPN <a class="header-anchor" href="#tor-vs-vpn" aria-label="Permalink to &quot;Tor vs. VPN&quot;">​</a></h3><ul><li><p><strong>Tor</strong>: Tor is a free, decentralized network that anonymizes your traffic by routing it through multiple volunteer-operated nodes. It is particularly effective for high privacy needs but may be slower due to multiple hops.</p></li><li><p><strong>VPN</strong>: A VPN provides encryption and routes your traffic through a server operated by the VPN provider. VPNs can offer faster speeds and are easier to use but require trust in the VPN provider.</p></li></ul><h3 id="proxy-vs-vpn" tabindex="-1">Proxy vs. VPN <a class="header-anchor" href="#proxy-vs-vpn" aria-label="Permalink to &quot;Proxy vs. VPN&quot;">​</a></h3><ul><li><p><strong>Proxy</strong>: A proxy routes your internet traffic through a single server, hiding your IP address but not necessarily encrypting your data. Proxies are useful for accessing geo-restricted content but offer less security than VPNs or Tor.</p></li><li><p><strong>VPN</strong>: A VPN encrypts all your traffic and routes it through a secure server, providing both privacy and security. VPNs are generally faster than Tor but require trust in the VPN provider.</p></li></ul><h3 id="privacy-and-security-considerations" tabindex="-1">Privacy and Security Considerations <a class="header-anchor" href="#privacy-and-security-considerations" aria-label="Permalink to &quot;Privacy and Security Considerations&quot;">​</a></h3><h4 id="serving-a-proxy" tabindex="-1">Serving a Proxy <a class="header-anchor" href="#serving-a-proxy" aria-label="Permalink to &quot;Serving a Proxy&quot;">​</a></h4><p>When setting up a proxy server, consider the following:</p><ul><li><p><strong>Security</strong>: Ensure the server is secured to prevent unauthorized access. Use strong passwords and consider setting up a firewall.</p></li><li><p><strong>Privacy</strong>: Be aware that the server can log all traffic passing through it. If privacy is critical, configure the server to avoid logging or encrypt logs.</p></li></ul><h4 id="using-a-proxy" tabindex="-1">Using a Proxy <a class="header-anchor" href="#using-a-proxy" aria-label="Permalink to &quot;Using a Proxy&quot;">​</a></h4><p>When using a proxy server, consider the following:</p><ul><li><p><strong>Anonymity</strong>: Your traffic is routed through the proxy, masking your IP address but not necessarily encrypting your data.</p></li><li><p><strong>Trust</strong>: Ensure you trust the proxy server you are using, as it can potentially log your traffic and access sensitive information.</p></li></ul><h3 id="routing-all-traffic-through-tor-using-privoxy" tabindex="-1">Routing All Traffic Through Tor Using Privoxy <a class="header-anchor" href="#routing-all-traffic-through-tor-using-privoxy" aria-label="Permalink to &quot;Routing All Traffic Through Tor Using Privoxy&quot;">​</a></h3><h3 id="for-macos" tabindex="-1">For macOS <a class="header-anchor" href="#for-macos" aria-label="Permalink to &quot;For macOS&quot;">​</a></h3><h4 id="step-1-install-tor-and-privoxy" tabindex="-1">Step 1: Install Tor and Privoxy <a class="header-anchor" href="#step-1-install-tor-and-privoxy" aria-label="Permalink to &quot;Step 1: Install Tor and Privoxy&quot;">​</a></h4><p>First, we need to install both Tor and Privoxy using Homebrew.</p><ol><li><strong>Install Homebrew</strong> (if not already installed):</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/bin/bash -c &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol><li><strong>Install Tor</strong>:</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>brew install tor</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol><li><strong>Install Privoxy</strong>:</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>brew install privoxy</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="step-2-configure-privoxy-to-use-tor" tabindex="-1">Step 2: Configure Privoxy to Use Tor <a class="header-anchor" href="#step-2-configure-privoxy-to-use-tor" aria-label="Permalink to &quot;Step 2: Configure Privoxy to Use Tor&quot;">​</a></h4><p>Edit the Privoxy configuration file to route traffic through Tor.</p><ol><li><strong>Open Privoxy’s Configuration File</strong>:</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nano /opt/homebrew/etc/privoxy/config</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol><li><strong>Add Tor Configuration</strong>: Add the following line to the configuration file:</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>forward-socks5t / 127.0.0.1:9050 .</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol><li><strong>Save and Exit</strong>:</li></ol><ul><li><p>Press <code>CTRL + X</code> to exit.</p></li><li><p>Press <code>Y</code> to confirm saving the changes.</p></li><li><p>Press <code>Enter</code> to save the file.</p></li></ul><h4 id="step-3-start-privoxy" tabindex="-1">Step 3: Start Privoxy <a class="header-anchor" href="#step-3-start-privoxy" aria-label="Permalink to &quot;Step 3: Start Privoxy&quot;">​</a></h4><p>Start Privoxy as a background service.</p><ol><li><strong>Start Privoxy</strong>:</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>brew services start privoxy</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="step-4-configure-macos-to-use-privoxy-as-a-system-proxy" tabindex="-1">Step 4: Configure macOS to Use Privoxy as a System Proxy <a class="header-anchor" href="#step-4-configure-macos-to-use-privoxy-as-a-system-proxy" aria-label="Permalink to &quot;Step 4: Configure macOS to Use Privoxy as a System Proxy&quot;">​</a></h4><p>Configure your macOS network settings to use Privoxy.</p><p>= <strong>Open System Preferences</strong>:</p><h2 id="go-to-system-preferences-gt-network" tabindex="-1">Go to <code>System Preferences</code> &gt; <code>Network</code>. <a class="header-anchor" href="#go-to-system-preferences-gt-network" aria-label="Permalink to &quot;Go to \`System Preferences\` &amp;gt; \`Network\`.&quot;">​</a></h2><p>= <strong>Select the Network Interface</strong>:</p><h2 id="select-the-network-interface-you-are-using-e-g-wi-fi-or-ethernet" tabindex="-1">Select the network interface you are using (e.g., Wi-Fi or Ethernet). <a class="header-anchor" href="#select-the-network-interface-you-are-using-e-g-wi-fi-or-ethernet" aria-label="Permalink to &quot;Select the network interface you are using (e.g., Wi-Fi or Ethernet).&quot;">​</a></h2><p>= <strong>Configure Proxies</strong>:</p><h2 id="click-on-advanced" tabindex="-1">Click on <code>Advanced</code>. <a class="header-anchor" href="#click-on-advanced" aria-label="Permalink to &quot;Click on \`Advanced\`.&quot;">​</a></h2><h2 id="go-to-the-proxies-tab" tabindex="-1">Go to the <code>Proxies</code> tab. <a class="header-anchor" href="#go-to-the-proxies-tab" aria-label="Permalink to &quot;Go to the \`Proxies\` tab.&quot;">​</a></h2><h2 id="check-web-proxy-http-and-secure-web-proxy-https" tabindex="-1">Check <code>Web Proxy (HTTP)</code> and <code>Secure Web Proxy (HTTPS)</code>. <a class="header-anchor" href="#check-web-proxy-http-and-secure-web-proxy-https" aria-label="Permalink to &quot;Check \`Web Proxy (HTTP)\` and \`Secure Web Proxy (HTTPS)\`.&quot;">​</a></h2><h2 id="set-both-to-127-0-0-1-and-8118-privoxy-s-default-port" tabindex="-1">Set both to <code>127.0.0.1</code> and <code>8118</code> (Privoxy’s default port). <a class="header-anchor" href="#set-both-to-127-0-0-1-and-8118-privoxy-s-default-port" aria-label="Permalink to &quot;Set both to \`127.0.0.1\` and \`8118\` (Privoxy’s default port).&quot;">​</a></h2><p>= <strong>Apply Changes</strong>:</p><h2 id="click-ok-and-apply" tabindex="-1">Click <code>OK</code> and <code>Apply</code>. <a class="header-anchor" href="#click-ok-and-apply" aria-label="Permalink to &quot;Click \`OK\` and \`Apply\`.&quot;">​</a></h2><h4 id="step-5-verify-the-configuration" tabindex="-1">Step 5: Verify the Configuration <a class="header-anchor" href="#step-5-verify-the-configuration" aria-label="Permalink to &quot;Step 5: Verify the Configuration&quot;">​</a></h4><p>Ensure that your traffic is being routed through Tor.</p><ol><li><p><strong>Check IP Address</strong>: Open a web browser and navigate to <code>http://check.torproject.org</code>. This page should confirm that your traffic is being routed through the Tor network.</p></li><li><p><strong>Test Connection</strong>: Use \`\`\` curl -L --proxy <a href="http://127.0.0.1:8118" target="_blank" rel="noreferrer">http://127.0.0.1:8118</a> <a href="http://check.torproject.org" target="_blank" rel="noreferrer">http://check.torproject.org</a></p></li></ol><div class="language-to vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">to</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Example Privoxy Configuration</span></span>
<span class="line"><span>Here is an example of what your Privoxy configuration might look like after editing:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h1 id="forward-all-traffic-through-tor" tabindex="-1">Forward all traffic through Tor <a class="header-anchor" href="#forward-all-traffic-through-tor" aria-label="Permalink to &quot;Forward all traffic through Tor&quot;">​</a></h1><p>forward-socks5t / 127.0.0.1:9050 .</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>### For Linux</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 1: Install Tor and Privoxy</span></span>
<span class="line"><span>First, we need to install both Tor and Privoxy.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Update Package List**:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>sudo apt update</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. **Install Tor**:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>sudo apt install tor</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. **Install Privoxy**:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>sudo apt install privoxy</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 2: Configure Privoxy to Use Tor</span></span>
<span class="line"><span>Edit the Privoxy configuration file to route traffic through Tor.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Open Privoxy’s Configuration File**:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>sudo nano /etc/privoxy/config</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. **Add Tor Configuration**: Add the following line to the configuration file:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>forward-socks5t / 127.0.0.1:9050 .</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. **Save and Exit**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- Press \`CTRL + X\` to exit.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- Press \`Y\` to confirm saving the changes.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- Press \`Enter\` to save the file.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 3: Start Privoxy</span></span>
<span class="line"><span>Start Privoxy as a background service.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Start Privoxy**:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>sudo systemctl start privoxy sudo systemctl enable privoxy</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 4: Set Up Port Forwarding</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Configure Your Router**: Ensure your router forwards external traffic on port \`8118\` to your Linux machine’s IP address. You can find your IP address using:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>PUBLIC_IP=$(curl -s ifconfig.me) echo $PUBLIC_IP</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 5: Secure Remote Access with SSH Tunneling</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Create SSH Tunnel Script**: Create a script to automate the creation of an SSH tunnel. Replace \`your_linux_username\` with your actual Linux username.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>PUBLIC_IP=$(curl -s ifconfig.me) echo &quot;ssh -L 8118:localhost:8118 $(whoami)@$PUBLIC_IP&quot; &gt; connect_proxy.sh chmod +x connect_proxy.sh</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. **Run the Script on the Remote Machine**: On your remote machine, run the script to create an SSH tunnel:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>./connect_proxy.sh</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. **Configure Remote Device to Use Proxy**: On your remote device, configure your web browser or system settings to use the proxy:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- HTTP Proxy: \`127.0.0.1\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- Port: \`8118\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Connecting to the Proxy from a Remote System</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### For macOS</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 1: Create SSH Tunnel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Run the SSH Tunnel Script**: On your macOS remote machine, run the script created previously to establish an SSH tunnel:</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>./connect_proxy.sh</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 2: Configure macOS to Use the Proxy</span></span>
<span class="line"><span>= **Open System Preferences**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go to \`System Preferences\` &amp;gt; \`Network\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= **Select the Network Interface**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Select the network interface you are using (e.g., Wi-Fi or Ethernet).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= **Configure Proxies**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Click on \`Advanced\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go to the \`Proxies\` tab.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Check \`Web Proxy (HTTP)\` and \`Secure Web Proxy (HTTPS)\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Set both to \`127.0.0.1\` and \`8118\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= **Apply Changes**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Click \`OK\` and \`Apply\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>### For Windows</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 1: Create SSH Tunnel</span></span>
<span class="line"><span>= **Install PuTTY** (if not already installed):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Download and install PuTTY from [here](https://www.putty.org/).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= **Configure SSH Tunnel**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Open PuTTY.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Enter the hostname or IP address of your proxy server.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## In the left-hand menu, go to \`Connection &amp;gt; SSH &amp;gt; Tunnels\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Add a new forwarded port:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Source port: \`8118\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Destination: \`localhost:8118\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Click \`Add\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go back to the \`Session\` category.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Click \`Open\` to start the SSH session.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 2: Configure Windows to Use the Proxy</span></span>
<span class="line"><span>= **Open Internet Options**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go to \`Control Panel\` &amp;gt; \`Internet Options\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= **Configure LAN Settings**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go to the \`Connections\` tab and click on \`LAN settings\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Check \`Use a proxy server for your LAN\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Enter \`127.0.0.1\` for the address and \`8118\` for the port.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Click \`OK\` to apply the changes.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>### For iOS</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 1: Create SSH Tunnel</span></span>
<span class="line"><span>= **Install an SSH Client**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Install an SSH client like Termius from the App Store.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= **Configure SSH Tunnel**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Open Termius.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Add a new host with the IP address of your proxy server.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go to the \`Port Forwarding\` section and add a new rule:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Local port: \`8118\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Remote host: \`localhost\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Remote port: \`8118\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Connect to the host to start the tunnel.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 2: Configure iOS to Use the Proxy</span></span>
<span class="line"><span>= **Configure Wi-Fi Proxy**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go to \`Settings\` &amp;gt; \`Wi-Fi\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Tap the information icon (i) next to your Wi-Fi network.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Scroll down to \`HTTP Proxy\` and select \`Manual\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Enter \`127.0.0.1\` for the Server and \`8118\` for the Port.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Save the settings.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>### For Android</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 1: Create SSH Tunnel</span></span>
<span class="line"><span>= **Install an SSH Client**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Install an SSH client like ConnectBot from the Google Play Store.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>= **Configure SSH Tunnel**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Open ConnectBot.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Add a new host with the IP address of your proxy server.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go to the port forwarding section and add a new rule:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Type: Local</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Source port: \`8118\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Destination: \`localhost:8118\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Connect to the host to start the tunnel.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### Step 2: Configure Android to Use the Proxy</span></span>
<span class="line"><span>= **Configure Wi-Fi Proxy**:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Go to \`Settings\` &amp;gt; \`Network &amp;amp; Internet\` &amp;gt; \`Wi-Fi\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Long-press your connected Wi-Fi network and select \`Modify network\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Scroll down and select \`Advanced options\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Set \`Proxy\` to \`Manual\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Enter \`127.0.0.1\` for the Hostname and \`8118\` for the Port.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Save the settings.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br></div></div>`,81)])])}const h=s(r,[["render",l]]);export{d as __pageData,h as default};
