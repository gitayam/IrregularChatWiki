import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// import starlightObsidian from 'starlight-obsidian'; // Disabled - requires Obsidian vault setup
import starlightTags from 'starlight-tags';
import starlightSiteGraph from 'starlight-site-graph';
import starlightScrollToTop from 'starlight-scroll-to-top';
// import starlightChangelogs from 'starlight-changelogs'; // Requires changelogs content collection
import starlightPageActions from 'starlight-page-actions';
import starlightUITweaks from 'starlight-ui-tweaks';
import starlightVideos from 'starlight-videos';
// import starlightKbd from 'starlight-kbd'; // Requires keyboard shortcut definitions

export default defineConfig({
  site: 'https://irregularpedia.org',
  integrations: [
    starlight({
      title: 'Irregularpedia',
      description: 'IrregularChat Knowledge Base - Community-driven resources for security, privacy, research, and technology',
      logo: {
        src: './public/logo.png',
        alt: 'Irregularpedia Logo',
      },
      favicon: '/favicon.ico',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/irregularchat' },
      ],
      editLink: {
        baseUrl: 'https://github.com/irregularchat/wiki/edit/main/',
      },
      lastUpdated: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      plugins: [
        // starlightObsidian({ vault: './src/content/docs' }), // Disabled - requires Obsidian vault config
        starlightTags(),
        starlightSiteGraph(),
        starlightScrollToTop(),
        // starlightChangelogs(), // Requires changelogs content collection
        starlightPageActions(),
        starlightUITweaks(),
        starlightVideos(),
        // starlightKbd(), // Requires keyboard shortcut definitions
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#3eaf7c',
          },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Research & OSINT',
          collapsed: false,
          items: [
            { label: 'Overview', slug: 'research' },
            { label: 'Research Preparation', slug: 'research/research-preparation' },
            { label: 'Research Datasets', slug: 'research/research-datasets' },
            { label: 'Research Tools', slug: 'research/research-tools' },
            { label: 'Research Containers', slug: 'research/research-containers' },
            { label: 'Research Template', slug: 'research/research-template' },
            { label: 'Archival Research', slug: 'research/archival-research' },
            { label: 'Researching for a TAAW', slug: 'research/researching-for-a-taaw' },
          ],
        },
        {
          label: 'AI & Autonomy',
          collapsed: false,
          items: [
            { label: 'Overview', slug: 'ai-ml' },
            { label: 'AI Resources', slug: 'ai-ml/ai-resources' },
            { label: 'AI Prompting', slug: 'ai-ml/ai-prompting' },
            { label: 'AI Ethics', slug: 'ai-ml/ai-ethics' },
            { label: 'AI/ML Learning', slug: 'ai-ml/ai-ml-learning' },
            { label: 'Pi LLM', slug: 'ai-ml/pi-llm' },
            { label: 'HackerGPT', slug: 'ai-ml/hackergpt2' },
            { label: 'Evaluation AI Prompt', slug: 'ai-ml/evaluation-ai-prompt' },
            { label: 'Award Bullet Template', slug: 'ai-ml/award-bullet-ai-prompt-template' },
          ],
        },
        {
          label: 'Information Warfare',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'general/information-warfare' },
            { label: 'TAAW Review', slug: 'general/taaw-review' },
            { label: 'Identify Influencers', slug: 'general/identify-influencers-using-the-taaw' },
            { label: 'COG Analysis', slug: 'general/center-of-gravity-analysis-guide' },
            { label: 'PMESII-PT', slug: 'general/pmesii-pt' },
            { label: 'SATs', slug: 'general/structured-analytic-techniques-sats' },
            { label: 'Behavior Analysis', slug: 'general/behavior-analysis' },
          ],
        },
        {
          label: 'Unmanned Systems',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'general/unmanned-systems' },
            { label: 'sUAS Breakdown', slug: 'general/suas-breakdown' },
            { label: 'FPV sUAS', slug: 'general/fpv-suas' },
            { label: 'Guide to Unmanned Systems', slug: 'general/guide-to-unmanned-systems' },
            { label: 'Counter-UxS', slug: 'general/counter-uxs' },
            { label: '3D Printer Guide', slug: 'hardware/3d-printer-recommendation' },
          ],
        },
        {
          label: 'Certifications & Learning',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'general/certifications-and-learning' },
            { label: 'Certifications', slug: 'general/certifications' },
            { label: 'Learning Resources', slug: 'general/learning' },
            { label: 'Credentialing Assistance', slug: 'military/credentialing-assistance' },
            { label: 'OSCP', slug: 'cybersecurity/oscp' },
            { label: 'GPEN', slug: 'cybersecurity/gpen' },
          ],
        },
        {
          label: 'Military & Career',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'general/military-and-career' },
            { label: 'Leaving Service', slug: 'military/leaving-service' },
            { label: 'SSC Quick Links', slug: 'general/ssc' },
            { label: 'Evaluations', slug: 'military/army-evaluation-resources' },
            { label: 'Awards', slug: 'military/awards' },
            { label: 'Promotion Boards', slug: 'military/promotion-boards' },
          ],
        },
        {
          label: 'RF/SDR/Communications',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'radio' },
            { label: 'Software Defined Radios', slug: 'radio/software-defined-radios-sdrs' },
            { label: 'DragonOS', slug: 'radio/dragonos' },
            { label: 'HAM Radio', slug: 'radio/ham-radio' },
            { label: 'Flipper Zero', slug: 'radio/flipper-zero' },
          ],
        },
        {
          label: 'Cybersecurity',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'cybersecurity' },
            { label: 'CISA Resources', slug: 'cybersecurity/cisa-resources' },
            { label: 'Incident Response', slug: 'cybersecurity/cyber-incident-response-guide-personal' },
            { label: 'Mobile Hardening', slug: 'cybersecurity/mobile-hardening' },
            { label: 'Red Teaming', slug: 'cybersecurity/cyber-red-teaming' },
          ],
        },
        {
          label: 'Server & Infrastructure',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'server-guides' },
            { label: 'Ansible Setup', slug: 'server-guides/ansible-setup' },
            { label: 'Docker', slug: 'server-guides/docker' },
            { label: 'Linux Server Setup', slug: 'server-guides/linux-server-initial-setup' },
            { label: 'Proxmox LXC', slug: 'server-guides/proxmox-linux-container-lxc-setup' },
            { label: 'CryptPad Server', slug: 'server-guides/setting-up-cryptpad-server' },
          ],
        },
        {
          label: 'Matrix / Chat',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'matrix' },
            { label: 'Element Matrix', slug: 'matrix/element-matrix-messenger' },
            { label: 'Ansible Deployment', slug: 'matrix/ansible-for-matrix-deployment' },
            { label: 'Managing Matrix', slug: 'matrix/managing-matrix' },
            { label: 'Matrix Bots', slug: 'matrix/matrix-bots' },
            { label: 'Troubleshooting', slug: 'matrix/matrix-troubleshooting' },
          ],
        },
        {
          label: 'Privacy',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'privacy' },
            { label: 'VPN Recommendation', slug: 'privacy/vpn-recommendation' },
            { label: 'Monero', slug: 'privacy/monero' },
            { label: 'Privacy for Business', slug: 'privacy/privacy-for-business' },
            { label: 'Donation Guide', slug: 'privacy/privacy-preserving-donation-guide' },
          ],
        },
        {
          label: 'Infrastructure',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'infrastructure' },
            { label: 'Cloudflare', slug: 'infrastructure/cloudflare' },
            { label: 'Authentik Installation', slug: 'infrastructure/authentik-installation' },
            { label: 'Cloudflare Tunnels', slug: 'infrastructure/self-host-cloudflare-tunnels' },
          ],
        },
        {
          label: 'Community',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'community' },
            { label: 'Join', slug: 'community/join' },
            { label: '2026 Recommendations', slug: 'community/2026-recommendations' },
            { label: 'General Advice', slug: 'community/general-advice' },
            { label: 'Reading List', slug: 'community/community-reading-list' },
            { label: 'Skills Exchange', slug: 'community/community-skills-exchange' },
            { label: 'Discourse Guidelines', slug: 'community/discourse' },
            { label: 'About This Wiki', slug: 'community/about-this-wiki' },
          ],
        },
        {
          label: 'General Wiki',
          collapsed: true,
          autogenerate: { directory: 'general' },
        },
      ],
      components: {
        Footer: './src/components/Footer.astro',
      },
    }),
  ],
});
