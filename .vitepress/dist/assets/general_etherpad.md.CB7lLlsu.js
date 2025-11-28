import{_ as n,c as a,o as e,ag as p}from"./chunks/framework.CQuhCYrb.js";const d=JSON.parse('{"title":"Etherpad","description":"","frontmatter":{"title":"Etherpad"},"headers":[],"relativePath":"general/etherpad.md","filePath":"general/etherpad.md","lastUpdated":null}'),l={name:"general/etherpad.md"};function r(t,s,i,o,c,u){return e(),a("div",null,[...s[0]||(s[0]=[p(`<h1 id="etherpad" tabindex="-1">Etherpad <a class="header-anchor" href="#etherpad" aria-label="Permalink to &quot;Etherpad&quot;">​</a></h1><h2 id="why-etherpad" tabindex="-1">Why Etherpad <a class="header-anchor" href="#why-etherpad" aria-label="Permalink to &quot;Why Etherpad&quot;">​</a></h2><p>Return to <a href="/server-guides/">Guides</a></p><p>Etherpad is a highly customizable open-source online editor providing real-time collaborative editing. While it is not end-to-end encrypted, owning the infrastructure provides a great solution for everyday collaboration and is an excellent alternative to common services.</p><p>For a more advanced and secure option, <a href="https://cryptpad.org/" target="_blank" rel="noreferrer">Cryptpad</a> offers additional features and more than just a Wordpad-style service.</p><h3 id="install-code" tabindex="-1">Install Code <a class="header-anchor" href="#install-code" aria-label="Permalink to &quot;Install Code&quot;">​</a></h3><p>The following code sets up Etherpad:</p><h2 id="setting-up-the-environment" tabindex="-1">Setting up the environment <a class="header-anchor" href="#setting-up-the-environment" aria-label="Permalink to &quot;Setting up the environment&quot;">​</a></h2><h2 id="installing-etherpad" tabindex="-1">Installing Etherpad <a class="header-anchor" href="#installing-etherpad" aria-label="Permalink to &quot;Installing Etherpad&quot;">​</a></h2><h2 id="configuring-a-read-database-mariadb-instead-of-the-development-db" tabindex="-1">Configuring a read database (MariaDB) instead of the development db <a class="header-anchor" href="#configuring-a-read-database-mariadb-instead-of-the-development-db" aria-label="Permalink to &quot;Configuring a read database (MariaDB) instead of the development db&quot;">​</a></h2><h2 id="establishing-ssl" tabindex="-1">Establishing SSL <a class="header-anchor" href="#establishing-ssl" aria-label="Permalink to &quot;Establishing SSL&quot;">​</a></h2><ul><li>Read Me**: The script will prompt for the domain, subdomain, and SQL password. For security purposes, the SQL password will not display as you type.</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>1. source: https://hub.docker.com/r/etherpad/etherpad</span></span>
<span class="line"><span>user_prompts(){</span></span>
<span class="line"><span>    echo &quot;domain: &quot;</span></span>
<span class="line"><span>    read -r domain</span></span>
<span class="line"><span>    echo &quot;sub-domain: &quot;</span></span>
<span class="line"><span>    read -r subdomain</span></span>
<span class="line"><span>    echo &quot;SQL Password: &quot;</span></span>
<span class="line"><span>    read -s -r sql_password</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>dependencies=&quot;certbot openssl nano nodejs&quot;</span></span>
<span class="line"><span>etherpad_user_setup(){</span></span>
<span class="line"><span>    #source: https://www.howtoforge.com/how-to-install-the-etherpad-collaborative-web-editor-on-rocky-linux-8/#step-3---install-mariadb</span></span>
<span class="line"><span>    sudo adduser --system --home /opt/etherpad --create-home etherpad</span></span>
<span class="line"><span>    cd /opt/etherpad || exit</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>system_setup(){</span></span>
<span class="line"><span>    apt update</span></span>
<span class="line"><span>    # update system and make sure sudo is installed</span></span>
<span class="line"><span>    apt install -y sudo</span></span>
<span class="line"><span>    sudo apt update</span></span>
<span class="line"><span>    sudo apt upgrade</span></span>
<span class="line"><span>    # loop through all the required dependencies</span></span>
<span class="line"><span>    if [ -n &quot;$dependencies&quot; ];then</span></span>
<span class="line"><span>        for pkg in $dependencies;do</span></span>
<span class="line"><span>            echo &quot;Installing $pkg&quot;</span></span>
<span class="line"><span>            #install but don&#39;t spit out all the noise</span></span>
<span class="line"><span>            sudo apt install -y &quot;$pkg&quot; 2&amp;&gt;/dev/null</span></span>
<span class="line"><span>        done</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    etherpad_user_setup</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>setup_git(){</span></span>
<span class="line"><span>    # assume location is /opt/etherpad</span></span>
<span class="line"><span>    # running install commands as newly created etherpad user</span></span>
<span class="line"><span>    sudo -H -u etherpad bash -c &quot;cd /opt/etherpad || exit&quot;</span></span>
<span class="line"><span>    sudo -H -u etherpad bash -c &quot;curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -&quot;</span></span>
<span class="line"><span>    sudo -H -u etherpad bash -c &quot;git clone --branch master https://github.com/ether/etherpad-lite.git&quot;</span></span>
<span class="line"><span>    sudo -H -u etherpad bash -c &quot;cd etherpad-lite || exit&quot;</span></span>
<span class="line"><span>    sudo -H -u etherpad bash -c &quot;src/bin/run.sh&quot;</span></span>
<span class="line"><span>    # create etherpad as a service</span></span>
<span class="line"><span>    echo &quot;[Description=Etherpad, a collaborative web editor.</span></span>
<span class="line"><span>    After=syslog.target network.target</span></span>
<span class="line"><span>    [Service](Unit])</span></span>
<span class="line"><span>    Type=simple</span></span>
<span class="line"><span>    User=etherpad</span></span>
<span class="line"><span>    Group=etherpad</span></span>
<span class="line"><span>    WorkingDirectory=/opt/etherpad</span></span>
<span class="line"><span>    Environment=NODE_ENV=production</span></span>
<span class="line"><span>    ExecStart=/usr/bin/node --experimental-worker /opt/etherpad/etherpad-lite/node_modules/ep_etherpad-lite/node/server.js</span></span>
<span class="line"><span>    Restart=always</span></span>
<span class="line"><span>    [WantedBy=multi-user.target&quot; | sudo tee -a /etc/systemd/system/etherpad.service</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sudo systemctl daemon-reload</span></span>
<span class="line"><span>    sudo systemctl enable etherpad --now</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>setup-mariadb(){</span></span>
<span class="line"><span>    sql_db_name=&quot;etherpad_lite_db&quot;</span></span>
<span class="line"><span>    sql_user=&quot;etherpaduser&quot;</span></span>
<span class="line"><span>    sudo apt install -y mariadb-server</span></span>
<span class="line"><span>    sudo systemctl enable mariadb --now</span></span>
<span class="line"><span>    sudo mariadb -e &quot;CREATE DATABASE $sql_db_name DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;&quot;</span></span>
<span class="line"><span>    sudo mariadb -e &quot;CREATE USER &#39;$sql_user&#39;@&#39;localhost&#39; identified by &#39;$sql_password&#39;;&quot;</span></span>
<span class="line"><span>    sudo mariadb -e &quot;GRANT ALL PRIVILEGES ON $sql_db_name.* TO &#39;$sql_user&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;$sql_password&#39;;&quot;</span></span>
<span class="line"><span>    ##FIXME: remove dirty db</span></span>
<span class="line"><span>    #sed -i &#39;/&quot;dbType&quot;/i \\/&#39; settings.json</span></span>
<span class="line"><span>    ##FIXME: configure settings</span></span>
<span class="line"><span>    #  &quot;dbType&quot; : &quot;mysql&quot;,</span></span>
<span class="line"><span>    #  &quot;dbSettings&quot; : {</span></span>
<span class="line"><span>    #     &quot;user&quot;:     &quot;etherpaduser&quot;,</span></span>
<span class="line"><span>    #     &quot;host&quot;:     &quot;localhost&quot;,</span></span>
<span class="line"><span>    #     &quot;port&quot;:     3306,</span></span>
<span class="line"><span>    #     &quot;password&quot;: &quot;$sql_password&quot;,</span></span>
<span class="line"><span>    #     &quot;database&quot;: &quot;$sql_db_name&quot;,</span></span>
<span class="line"><span>    #     &quot;charset&quot;:  &quot;utf8mb4&quot;</span></span>
<span class="line"><span>    #  },</span></span>
<span class="line"><span>    #FIXME</span></span>
<span class="line"><span>    #  &quot;trustProxy&quot;: true,</span></span>
<span class="line"><span>    #sed -i &#39;/&quot;trustProxy&quot;/s/false/true&#39; settings.json</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>setup_ssl(){</span></span>
<span class="line"><span>    sudo mkdir -p /var/lib/letsencrypt</span></span>
<span class="line"><span>    sudo certbot certonly --standalone --agree-tos --preferred-challenges http -m ssl@&quot;$domain&quot; -d &quot;$subdomain&quot;.&quot;$domain&quot;</span></span>
<span class="line"><span>    # cert is saved to /etc/letsencrypt/live/$domain</span></span>
<span class="line"><span>    sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048</span></span>
<span class="line"><span>    #create a renew cron</span></span>
<span class="line"><span>    echo &quot;#!/bin/sh</span></span>
<span class="line"><span>certbot renew --cert-name $domain --webroot -w /var/lib/letsencrypt/ --post-hook</span></span>
<span class="line"><span>systemctl reload nginx</span></span>
<span class="line"><span>&quot;| sudo tee -a /etc/cron.daily/certbot-renew</span></span>
<span class="line"><span>    sudo chmod +x /etc/cron.daily/certbot-renew</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>main(){</span></span>
<span class="line"><span>    user_prompts</span></span>
<span class="line"><span>    system_setup</span></span>
<span class="line"><span>    setup_git</span></span>
<span class="line"><span>    setup-mariadb</span></span>
<span class="line"><span>    setup_ssl</span></span>
<span class="line"><span>    #set node to production</span></span>
<span class="line"><span>    export NODE_ENV=production</span></span>
<span class="line"><span>    systemctl start etherpad</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>main</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br></div></div><p>For further information, visit the official <a href="https://etherpad.org/" target="_blank" rel="noreferrer">Etherpad site</a> or <a href="https://hub.docker.com/r/etherpad/etherpad" target="_blank" rel="noreferrer">Docker Hub for Etherpad</a>. [Tools]</p>`,14)])])}const m=n(l,[["render",r]]);export{d as __pageData,m as default};
