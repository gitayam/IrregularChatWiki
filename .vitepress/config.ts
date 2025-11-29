import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Irregularpedia',
  description: 'Technical Documentation & Knowledge Base',

  srcDir: 'docs',

  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Research', link: '/research/' },
      { text: 'AI & Autonomy', link: '/ai-ml/' },
      { text: 'General', link: '/general/' },
      { text: 'Tags', link: '/tags' },
      { text: 'Forum', link: 'https://forum.irregularchat.com' },
    ],

    sidebar: {
      '/': [
        {
          text: 'Research & OSINT',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/research/' },
            { text: 'Research Preparation', link: '/research/research-preparation' },
            { text: 'Research Datasets', link: '/research/research-datasets' },
            { text: 'Research Tools', link: '/research/research-tools' },
            { text: 'Research Containers', link: '/research/research-containers' },
            { text: 'Research Template', link: '/research/research-template' },
            { text: 'Archival Research', link: '/research/archival-research' },
            { text: 'Researching for a TAAW', link: '/research/researching-for-a-taaw' },
          ]
        },
        {
          text: 'AI & Autonomy',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/ai-ml/' },
            { text: 'AI Resources', link: '/ai-ml/ai-resources' },
            { text: 'AI Prompting', link: '/ai-ml/ai-prompting' },
            { text: 'AI Ethics', link: '/ai-ml/ai-ethics' },
            { text: 'AI/ML Learning', link: '/ai-ml/ai-ml-learning' },
            { text: 'Pi LLM', link: '/ai-ml/pi-llm' },
            { text: 'HackerGPT', link: '/ai-ml/hackergpt2' },
            { text: 'Evaluation AI Prompt', link: '/ai-ml/evaluation-ai-prompt' },
            { text: 'Award Bullet Template', link: '/ai-ml/award-bullet-ai-prompt-template' },
          ]
        },
        {
          text: 'Information Warfare',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/general/information-warfare' },
            { text: 'TAAW Review', link: '/general/taaw-review' },
            { text: 'Identify Influencers', link: '/general/identify-influencers-using-the-taaw' },
            { text: 'COG Analysis', link: '/general/center-of-gravity-analysis-guide' },
            { text: 'PMESII-PT', link: '/general/pmesii-pt' },
            { text: 'SATs', link: '/general/structured-analytic-techniques-sats' },
            { text: 'Behavior Analysis', link: '/general/behavior-analysis' },
          ]
        },
        {
          text: 'Unmanned Systems',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/general/unmanned-systems' },
            { text: 'sUAS Breakdown', link: '/general/suas-breakdown' },
            { text: 'FPV sUAS', link: '/general/fpv-suas' },
            { text: 'Guide to Unmanned Systems', link: '/general/guide-to-unmanned-systems' },
            { text: 'Counter-UxS', link: '/general/counter-uxs' },
            { text: '3D Printer Guide', link: '/general/3d-printer-recommendation' },
          ]
        },
        {
          text: 'Certifications & Learning',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/general/certifications-and-learning' },
            { text: 'Certifications', link: '/general/certifications' },
            { text: 'Learning Resources', link: '/general/learning' },
            { text: 'Credentialing Assistance', link: '/general/credentialing-assistance' },
            { text: 'OSCP', link: '/cybersecurity/oscp' },
            { text: 'GPEN', link: '/cybersecurity/gpen' },
          ]
        },
        {
          text: 'Military & Career',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/general/military-and-career' },
            { text: 'Leaving Service', link: '/general/leaving-service' },
            { text: 'SSC Quick Links', link: '/general/ssc' },
            { text: 'Evaluations', link: '/general/army-evaluation-resources' },
            { text: 'Awards', link: '/general/awards' },
            { text: 'Promotion Boards', link: '/general/promotion-boards' },
          ]
        },
        {
          text: 'RF/SDR/Communications',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/radio/' },
            { text: 'Software Defined Radios', link: '/radio/software-defined-radios-sdrs' },
            { text: 'DragonOS', link: '/radio/dragonos' },
            { text: 'HAM Radio', link: '/radio/ham-radio' },
            { text: 'Flipper Zero', link: '/radio/flipper-zero' },
          ]
        },
        {
          text: 'Cybersecurity',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/cybersecurity/' },
            { text: 'CISA Resources', link: '/cybersecurity/cisa-resources' },
            { text: 'Incident Response', link: '/cybersecurity/cyber-incident-response-guide-personal' },
            { text: 'Mobile Hardening', link: '/cybersecurity/mobile-hardening' },
            { text: 'Red Teaming', link: '/cybersecurity/cyber-red-teaming' },
          ]
        },
        {
          text: 'Server & Infrastructure',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/server-guides/' },
            { text: 'Ansible Setup', link: '/server-guides/ansible-setup' },
            { text: 'Docker', link: '/server-guides/docker' },
            { text: 'Linux Server Setup', link: '/server-guides/linux-server-initial-setup' },
            { text: 'Proxmox LXC', link: '/server-guides/proxmox-linux-container-lxc-setup' },
            { text: 'CryptPad Server', link: '/server-guides/setting-up-cryptpad-server' },
          ]
        },
        {
          text: 'Matrix / Chat',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/matrix/' },
            { text: 'Element Matrix', link: '/matrix/element-matrix-messenger' },
            { text: 'Ansible Deployment', link: '/matrix/ansible-for-matrix-deployment' },
            { text: 'Managing Matrix', link: '/matrix/managing-matrix' },
            { text: 'Matrix Bots', link: '/matrix/matrix-bots' },
            { text: 'Troubleshooting', link: '/matrix/matrix-troubleshooting' },
          ]
        },
        {
          text: 'Privacy',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/privacy/' },
            { text: 'VPN Recommendation', link: '/privacy/vpn-recommendation' },
            { text: 'Monero', link: '/privacy/monero' },
            { text: 'Privacy for Business', link: '/privacy/privacy-for-business' },
            { text: 'Donation Guide', link: '/privacy/privacy-preserving-donation-guide' },
          ]
        },
        {
          text: 'Infrastructure',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/infrastructure/' },
            { text: 'Cloudflare', link: '/infrastructure/cloudflare' },
            { text: 'Authentik Installation', link: '/infrastructure/authentik-installation' },
            { text: 'Cloudflare Tunnels', link: '/infrastructure/self-host-cloudflare-tunnels' },
          ]
        },
        {
          text: 'Community',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/community/' },
            { text: 'Join', link: '/community/join' },
            { text: 'Discourse Guidelines', link: '/community/discourse' },
            { text: 'About This Wiki', link: '/community/about-this-wiki' },
            { text: 'Reading List', link: '/community/community-reading-list' },
            { text: 'Skills Exchange', link: '/community/community-skills-exchange' },
          ]
        },
        {
          text: 'General Wiki',
          collapsed: true,
          link: '/general/'
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/irregularchat' },
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      }
    },

    editLink: {
      pattern: 'https://github.com/irregularchat/wiki/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'IrregularChat Community Wiki',
      copyright: 'Copyright © 2025 IrregularChat Community'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
      }
    },
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },

  vue: {
    template: {
      compilerOptions: {
        // Treat tags matching this pattern as custom elements (not Vue components)
        isCustomElement: (tag) => {
          // Treat placeholder-style tags like <host-ip>, <container>, etc as custom elements
          return /^[a-z]+-[a-z]+$/.test(tag) ||
                 /^[A-Z]+$/.test(tag) ||
                 ['host-ip', 'container', 'service_name', 'user', 'plugin', 'PORT', 'ATTACK', 'VMID', 'YourUserName'].includes(tag);
        }
      }
    }
  },
})
