import{_ as s,c as a,o as e,ag as p}from"./chunks/framework.CQuhCYrb.js";const b=JSON.parse('{"title":"Linux Server Storage","description":"","frontmatter":{"title":"Linux Server Storage"},"headers":[],"relativePath":"server-guides/linux-server-storage.md","filePath":"server-guides/linux-server-storage.md","lastUpdated":null}'),l={name:"server-guides/linux-server-storage.md"};function r(i,n,t,o,c,u){return e(),a("div",null,[...n[0]||(n[0]=[p(`<h1 id="linux-server-storage" tabindex="-1">Linux Server Storage <a class="header-anchor" href="#linux-server-storage" aria-label="Permalink to &quot;Linux Server Storage&quot;">​</a></h1><h2 id="persistence-mounted-storage-and-bind-mounts" tabindex="-1">Persistence Mounted Storage and Bind Mounts <a class="header-anchor" href="#persistence-mounted-storage-and-bind-mounts" aria-label="Permalink to &quot;Persistence Mounted Storage and Bind Mounts&quot;">​</a></h2><p>Managing persistent storage is crucial for ensuring data availability and integrity, whether working with physical drives, virtualized environments like Proxmox, or cloud-based services. This guide covers setting up persistent mounted storage, configuring bind mounts for Proxmox containers and VMs, and using rclone to integrate cloud storage services such as Google Drive, ProtonDrive, pCloud, and more.</p><h3 id="persistence-mounted-storage" tabindex="-1">Persistence Mounted Storage <a class="header-anchor" href="#persistence-mounted-storage" aria-label="Permalink to &quot;Persistence Mounted Storage&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. Determine which drive has the size you attached</span></span>
<span class="line"><span>lsblk</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Prompt the user to select the mounted storage drive</span></span>
<span class="line"><span>echo &quot;Which is the mounted Storage? (Look at the Storage Size) such as sda, sdb, sdc: &quot;</span></span>
<span class="line"><span>read DRIVE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Create a directory in the user&#39;s home directory</span></span>
<span class="line"><span>mkdir -p $HOME/datadrive</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Format the drive (sda used here) to use as storage</span></span>
<span class="line"><span>sudo mkfs.ext4 /dev/$DRIVE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Mount storage to the created directory</span></span>
<span class="line"><span>sudo mount /dev/$DRIVE $HOME/datadrive</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Ensure that attached storage is permanently mounted</span></span>
<span class="line"><span>echo &quot;/dev/$DRIVE $HOME/datadrive ext4 defaults 0 0&quot; | sudo tee -a /etc/fstab</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="bind-storage-from-host-proxmox-to-and-from-container-vm" tabindex="-1">Bind Storage from Host Proxmox to and from Container/VM <a class="header-anchor" href="#bind-storage-from-host-proxmox-to-and-from-container-vm" aria-label="Permalink to &quot;Bind Storage from Host Proxmox to and from Container/VM&quot;">​</a></h3><p><strong>Direct Bind Mount</strong>:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. LXC containers support bind mounts directly, allowing you to make the host directory accessible inside the container.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Step 1: Edit the container’s configuration file</span></span>
<span class="line"><span>1. The configuration file is located at:</span></span>
<span class="line"><span>nano /etc/pve/lxc/&lt;VMID&gt;.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Step 2: Add a mount point entry</span></span>
<span class="line"><span>1. Example configuration line:</span></span>
<span class="line"><span>mp0: /datadrive/media/,mp=/media,readonly=0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Explanation:</span></span>
<span class="line"><span>1. - /datadrive/media/ is the source directory on the host.</span></span>
<span class="line"><span>1. - /media is the destination directory inside the container.</span></span>
<span class="line"><span>1. - readonly=0 allows write access. Remove it for read-only access.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Step 3: Restart the container to apply changes</span></span>
<span class="line"><span>pct restart &lt;VMID&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="using-rclone-for-cloud-storage-integration" tabindex="-1">Using rclone for Cloud Storage Integration <a class="header-anchor" href="#using-rclone-for-cloud-storage-integration" aria-label="Permalink to &quot;Using rclone for Cloud Storage Integration&quot;">​</a></h3><p>rclone is a powerful tool for mounting and syncing cloud storage services as local directories. Follow these steps to set up rclone with popular services like Google Drive, ProtonDrive, and pCloud.</p><h3 id="install-rclone" tabindex="-1">Install rclone <a class="header-anchor" href="#install-rclone" aria-label="Permalink to &quot;Install rclone&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. Update package manager and install rclone</span></span>
<span class="line"><span>sudo apt update</span></span>
<span class="line"><span>sudo apt install -y rclone</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="configure-rclone" tabindex="-1">Configure rclone <a class="header-anchor" href="#configure-rclone" aria-label="Permalink to &quot;Configure rclone&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. Run the rclone configuration wizard</span></span>
<span class="line"><span>rclone config</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Follow the prompts to:</span></span>
<span class="line"><span>1. - Create a new remote</span></span>
<span class="line"><span>1. - Select the cloud service (e.g., Google Drive, ProtonDrive, pCloud)</span></span>
<span class="line"><span>1. - Authenticate with your account</span></span>
<span class="line"><span>1. - Save the configuration</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="mount-cloud-storage-locally" tabindex="-1">Mount Cloud Storage Locally <a class="header-anchor" href="#mount-cloud-storage-locally" aria-label="Permalink to &quot;Mount Cloud Storage Locally&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. Create a directory to mount the cloud storage</span></span>
<span class="line"><span>mkdir -p $HOME/cloudstorage</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Use rclone to mount the cloud storage</span></span>
<span class="line"><span>rclone mount &lt;remote_name&gt;: $HOME/cloudstorage --daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Example:</span></span>
<span class="line"><span>1. rclone mount gdrive: $HOME/cloudstorage --daemon</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="automate-rclone-mount-on-boot" tabindex="-1">Automate rclone Mount on Boot <a class="header-anchor" href="#automate-rclone-mount-on-boot" aria-label="Permalink to &quot;Automate rclone Mount on Boot&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>1. Create a systemd service file for rclone</span></span>
<span class="line"><span>sudo nano /etc/systemd/system/rclone.service</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Add the following content, replacing &lt;remote_name&gt; and &lt;mount_point&gt;:</span></span>
<span class="line"><span>[Description=Mount rclone remote at boot</span></span>
<span class="line"><span>After=network-online.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service](Unit])</span></span>
<span class="line"><span>Type=simple</span></span>
<span class="line"><span>ExecStart=/usr/bin/rclone mount &lt;remote_name&gt;: &lt;mount_point&gt; --config=/home/$USER/.config/rclone/rclone.conf --daemon</span></span>
<span class="line"><span>Restart=on-failure</span></span>
<span class="line"><span>User=$USER</span></span>
<span class="line"><span>Group=$USER</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[WantedBy=multi-user.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Save and enable the service</span></span>
<span class="line"><span>sudo systemctl enable rclone.service</span></span>
<span class="line"><span>sudo systemctl start rclone.service</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="supported-cloud-services" tabindex="-1">Supported Cloud Services <a class="header-anchor" href="#supported-cloud-services" aria-label="Permalink to &quot;Supported Cloud Services&quot;">​</a></h3><p>rclone supports a wide range of cloud storage providers. Some popular options include:</p><ul><li><p><strong>Google Drive</strong>: Seamless integration for personal and business accounts.</p></li><li><p><strong>ProtonDrive</strong>: Secure and privacy-focused storage.</p></li><li><p><strong>pCloud</strong>: Affordable and reliable for personal and professional use.</p></li><li><p><strong>Dropbox</strong>: Widely used for personal and collaborative storage.</p></li><li><p><strong>Amazon S3</strong>: Scalable object storage for developers and enterprises.</p></li></ul><h3 id="categories" tabindex="-1">Categories <a class="header-anchor" href="#categories" aria-label="Permalink to &quot;Categories&quot;">​</a></h3><p>[Setup]</p>`,23)])])}const m=s(l,[["render",r]]);export{b as __pageData,m as default};
