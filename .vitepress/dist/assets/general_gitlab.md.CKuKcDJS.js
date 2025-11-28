import{_ as n,c as a,o as p,ag as l}from"./chunks/framework.CQuhCYrb.js";const u=JSON.parse('{"title":"Gitlab","description":"","frontmatter":{"title":"Gitlab"},"headers":[],"relativePath":"general/gitlab.md","filePath":"general/gitlab.md","lastUpdated":null}'),e={name:"general/gitlab.md"};function r(i,s,c,b,_,T){return p(),a("div",null,[...s[0]||(s[0]=[l(`<h1 id="gitlab" tabindex="-1">Gitlab <a class="header-anchor" href="#gitlab" aria-label="Permalink to &quot;Gitlab&quot;">​</a></h1><h3 id="docker-compose" tabindex="-1">Docker Compose <a class="header-anchor" href="#docker-compose" aria-label="Permalink to &quot;Docker Compose&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>version: &#39;3&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    image: redis:latest</span></span>
<span class="line"><span>    command:</span></span>
<span class="line"><span>      - --loglevel warning</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - redis-data:/data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  postgresql:</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    image: sameersbn/postgresql:latest</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - postgresql-data:/var/lib/postgresql</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - DB_USER=\${DB_USER}</span></span>
<span class="line"><span>      - DB_PASS=\${DB_PASS}</span></span>
<span class="line"><span>      - DB_NAME=\${DB_NAME}</span></span>
<span class="line"><span>      - DB_EXTENSION=\${DB_EXTENSION}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  gitlab:</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    image: sameersbn/gitlab:latest</span></span>
<span class="line"><span>    depends_on:</span></span>
<span class="line"><span>      - redis</span></span>
<span class="line"><span>      - postgresql</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &amp;quot;480:80&amp;quot;</span></span>
<span class="line"><span>      - &amp;quot;22:22&amp;quot;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - gitlab-data:/home/gitlab/data</span></span>
<span class="line"><span>    healthcheck:</span></span>
<span class="line"><span>      test: [&amp;quot;/usr/local/sbin/healthcheck&amp;quot;](&amp;quot;CMD&amp;quot;,)</span></span>
<span class="line"><span>      interval: 5m</span></span>
<span class="line"><span>      timeout: 10s</span></span>
<span class="line"><span>      retries: 3</span></span>
<span class="line"><span>      start_period: 5m</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - DEBUG=\${DEBUG}</span></span>
<span class="line"><span>      - DB_ADAPTER=\${DB_ADAPTER}</span></span>
<span class="line"><span>      - DB_HOST=\${DB_HOST}</span></span>
<span class="line"><span>      - DB_PORT=\${DB_PORT}</span></span>
<span class="line"><span>      - DB_USER=\${DB_USER}</span></span>
<span class="line"><span>      - DB_PASS=\${DB_PASS}</span></span>
<span class="line"><span>      - DB_NAME=\${DB_NAME}</span></span>
<span class="line"><span>      - REDIS_HOST=\${REDIS_HOST}</span></span>
<span class="line"><span>      - REDIS_PORT=\${REDIS_PORT}</span></span>
<span class="line"><span>      - TZ=\${TZ}</span></span>
<span class="line"><span>      - GITLAB_TIMEZONE=\${GITLAB_TIMEZONE}</span></span>
<span class="line"><span>      - GITLAB_HTTPS=\${GITLAB_HTTPS}</span></span>
<span class="line"><span>      - SSL_SELF_SIGNED=\${SSL_SELF_SIGNED}</span></span>
<span class="line"><span>      - GITLAB_HOST=\${GITLAB_HOST}</span></span>
<span class="line"><span>      - GITLAB_PORT=\${GITLAB_PORT}</span></span>
<span class="line"><span>      - GITLAB_SSH_PORT=\${GITLAB_SSH_PORT}</span></span>
<span class="line"><span>      - GITLAB_RELATIVE_URL_ROOT=\${GITLAB_RELATIVE_URL_ROOT}</span></span>
<span class="line"><span>      - GITLAB_SECRETS_DB_KEY_BASE=\${GITLAB_SECRETS_DB_KEY_BASE}</span></span>
<span class="line"><span>      - GITLAB_SECRETS_SECRET_KEY_BASE=\${GITLAB_SECRETS_SECRET_KEY_BASE}</span></span>
<span class="line"><span>      - GITLAB_SECRETS_OTP_KEY_BASE=\${GITLAB_SECRETS_OTP_KEY_BASE}</span></span>
<span class="line"><span>      - GITLAB_ROOT_PASSWORD=\${GITLAB_ROOT_PASSWORD}</span></span>
<span class="line"><span>      - GITLAB_ROOT_EMAIL=\${GITLAB_ROOT_EMAIL}</span></span>
<span class="line"><span>      - GITLAB_NOTIFY_ON_BROKEN_BUILDS=\${GITLAB_NOTIFY_ON_BROKEN_BUILDS}</span></span>
<span class="line"><span>      - GITLAB_NOTIFY_PUSHER=\${GITLAB_NOTIFY_PUSHER}</span></span>
<span class="line"><span>      - GITLAB_EMAIL=\${GITLAB_EMAIL}</span></span>
<span class="line"><span>      - GITLAB_EMAIL_REPLY_TO=\${GITLAB_EMAIL_REPLY_TO}</span></span>
<span class="line"><span>      - GITLAB_INCOMING_EMAIL_ADDRESS=\${GITLAB_INCOMING_EMAIL_ADDRESS}</span></span>
<span class="line"><span>      - GITLAB_BACKUP_SCHEDULE=\${GITLAB_BACKUP_SCHEDULE}</span></span>
<span class="line"><span>      - GITLAB_BACKUP_TIME=\${GITLAB_BACKUP_TIME}</span></span>
<span class="line"><span>      - SMTP_ENABLED=\${SMTP_ENABLED}</span></span>
<span class="line"><span>      - SMTP_HOST=\${SMTP_HOST}</span></span>
<span class="line"><span>      - SMTP_PORT=\${SMTP_PORT}</span></span>
<span class="line"><span>      - SMTP_USER=\${SMTP_USER}</span></span>
<span class="line"><span>      - SMTP_PASS=\${SMTP_PASS}</span></span>
<span class="line"><span>      - SMTP_STARTTLS=\${SMTP_STARTTLS}</span></span>
<span class="line"><span>      - SMTP_AUTHENTICATION=\${SMTP_AUTHENTICATION}</span></span>
<span class="line"><span>      - IMAP_ENABLED=\${IMAP_ENABLED}</span></span>
<span class="line"><span>      - IMAP_HOST=\${IMAP_HOST}</span></span>
<span class="line"><span>      - IMAP_PORT=\${IMAP_PORT}</span></span>
<span class="line"><span>      - IMAP_USER=\${IMAP_USER}</span></span>
<span class="line"><span>      - IMAP_PASS=\${IMAP_PASS}</span></span>
<span class="line"><span>      - IMAP_SSL=\${IMAP_SSL}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br></div></div><h3 id="env-file" tabindex="-1">.env file <a class="header-anchor" href="#env-file" aria-label="Permalink to &quot;.env file&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># PostgreSQL</span></span>
<span class="line"><span>DB_USER=gitlab</span></span>
<span class="line"><span>DB_PASS=SECRET_HERE</span></span>
<span class="line"><span>DB_NAME=gitlabhq_production</span></span>
<span class="line"><span>DB_EXTENSION=pg_trgm,btree_gist</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## GitLab</span></span>
<span class="line"><span>DEBUG=false</span></span>
<span class="line"><span>DB_ADAPTER=postgresql</span></span>
<span class="line"><span>DB_HOST=postgresql</span></span>
<span class="line"><span>DB_PORT=5432</span></span>
<span class="line"><span>REDIS_HOST=redis</span></span>
<span class="line"><span>REDIS_PORT=6379</span></span>
<span class="line"><span>TZ=America/New_York</span></span>
<span class="line"><span>GITLAB_TIMEZONE=America/New_York</span></span>
<span class="line"><span>GITLAB_HTTPS=false</span></span>
<span class="line"><span>SSL_SELF_SIGNED=false</span></span>
<span class="line"><span>GITLAB_HOST=localhost</span></span>
<span class="line"><span>GITLAB_PORT=10080</span></span>
<span class="line"><span>GITLAB_SSH_PORT=10022</span></span>
<span class="line"><span>GITLAB_RELATIVE_URL_ROOT=gitlab.irregularchat.com</span></span>
<span class="line"><span>GITLAB_SECRETS_DB_KEY_BASE=SECRET_HERE</span></span>
<span class="line"><span>GITLAB_SECRETS_SECRET_KEY_BASE=SECRET_HERE</span></span>
<span class="line"><span>GITLAB_SECRETS_OTP_KEY_BASE=SECRET_HERE</span></span>
<span class="line"><span>GITLAB_ROOT_PASSWORD=SECRET_HERE</span></span>
<span class="line"><span>GITLAB_ROOT_EMAIL=rootsac@irregularchat.com</span></span>
<span class="line"><span>GITLAB_NOTIFY_ON_BROKEN_BUILDS=true</span></span>
<span class="line"><span>GITLAB_NOTIFY_PUSHER=false</span></span>
<span class="line"><span>GITLAB_EMAIL=notifications@example.com</span></span>
<span class="line"><span>GITLAB_EMAIL_REPLY_TO=noreply@example.com</span></span>
<span class="line"><span>GITLAB_INCOMING_EMAIL_ADDRESS=reply@example.com</span></span>
<span class="line"><span>GITLAB_BACKUP_SCHEDULE=daily</span></span>
<span class="line"><span>GITLAB_BACKUP_TIME=01:00</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## SMTP</span></span>
<span class="line"><span>SMTP_ENABLED=true</span></span>
<span class="line"><span>SMTP_HOST=mail.riseup.net</span></span>
<span class="line"><span>SMTP_PORT=465</span></span>
<span class="line"><span>SMTP_USER=irregularchat@riseup.net</span></span>
<span class="line"><span>SMTP_PASS=SECRET_HERE</span></span>
<span class="line"><span>SMTP_STARTTLS=true</span></span>
<span class="line"><span>SMTP_AUTHENTICATION=login</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## IMAP</span></span>
<span class="line"><span>IMAP_ENABLED=false</span></span>
<span class="line"><span>IMAP_HOST=imap.gmail.com</span></span>
<span class="line"><span>IMAP_PORT=993</span></span>
<span class="line"><span>IMAP_USER=mailer@example.com</span></span>
<span class="line"><span>IMAP_PASS=password</span></span>
<span class="line"><span>IMAP_SSL=true</span></span>
<span class="line"><span>IMAP_STARTTLS=false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## OAuth</span></span>
<span class="line"><span>OAUTH_ENABLED=true</span></span>
<span class="line"><span>OAUTH_AUTO_SIGN_IN_WITH_PROVIDER=&amp;quot;IrregularChat Login&amp;quot;</span></span>
<span class="line"><span>OAUTH_ALLOW_SSO=true</span></span>
<span class="line"><span>OAUTH_BLOCK_AUTO_CREATED_USERS=true</span></span>
<span class="line"><span>OAUTH_AUTO_LINK_LDAP_USER=false</span></span>
<span class="line"><span>OAUTH_AUTO_LINK_SAML_USER=false</span></span>
<span class="line"><span>OAUTH_EXTERNAL_PROVIDERS=</span></span>
<span class="line"><span>OAUTH_CAS3_LABEL=cas3</span></span>
<span class="line"><span>OAUTH_CAS3_SERVER=</span></span>
<span class="line"><span>OAUTH_CAS3_DISABLE_SSL_VERIFICATION=false</span></span>
<span class="line"><span>OAUTH_CAS3_LOGIN_URL=/cas/login</span></span>
<span class="line"><span>OAUTH_CAS3_VALIDATE_URL=/cas/p3/serviceValidate</span></span>
<span class="line"><span>OAUTH_CAS3_LOGOUT_URL=/cas/logout</span></span>
<span class="line"><span>OAUTH_AUTH0_CLIENT_ID=SECRET_HERE</span></span>
<span class="line"><span>OAUTH_AUTH0_CLIENT_SECRET=SECRET_HERE</span></span>
<span class="line"><span>OAUTH_AUTH0_DOMAIN=https://sso.irregularchat.com/application/o/authorize/</span></span>
<span class="line"><span>OAUTH_AUTH0_SCOPE=</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div>`,5)])])}const S=n(e,[["render",r]]);export{u as __pageData,S as default};
