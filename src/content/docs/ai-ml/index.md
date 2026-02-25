---
title: "AI & Autonomy"
---

import { Tabs, TabItem, Card, CardGrid, LinkCard } from '@astrojs/starlight/components';

# AI & Autonomy 

Artificial intelligence, machine learning, large language models, and autonomous systems resources for defense and research applications.

## Getting Started

New to AI/ML? Start with these community guides:

<CardGrid>
  <LinkCard title="AI/ML Learning Guide" href="/ai-ml/ai-ml-learning" description="Comprehensive introduction to AI and ML concepts." />
  <LinkCard title="AI Prompting Guide" href="/ai-ml/ai-prompting" description="Best practices for prompt engineering." />
  <LinkCard title="AI Ethics" href="/ai-ml/ai-ethics" description="Ethical considerations in AI deployment." />
</CardGrid>

---

## Large Language Models (LLMs)

<Tabs>
  <TabItem label="Government & Military" icon="shieldCheck">
    | Platform | Access | Notes |
    |----------|--------|-------|
    | [NIPRGPT](https://niprgpt.mil/) | NIPR | DoD-approved LLM for unclassified use |
    | [AskSAGE](https://chat.asksage.ai/) | NIPR | AI assistant for government users |
    | Higher Enclaves | Intellipedia | Search "AI on Government Systems" |
  </TabItem>
  <TabItem label="Local (Self-Hosted)" icon="laptop">
    - [LM Studio](https://lmstudio.ai/) - Desktop app for MacOS/Windows/Linux.
    - [Ollama](https://ollama.com) - CLI LLM runner. See [Ollama Guide](/general/ollama).
    - [Pi LLM Guide](/ai-ml/pi-llm) - Running LLMs on Raspberry Pi.
    - [Continue AI](https://continue.dev/) - VS Code extension for AI-assisted coding.
  </TabItem>
  <TabItem label="Commercial" icon="external">
    | Service | Link | Notes |
    |---------|------|-------|
    | ChatGPT | [chatgpt.com](https://chatgpt.com) | OpenAI's GPT models |
    | Gemini | [gemini.google.com](https://gemini.google.com) | Google's LLM |
    | Claude | [claude.ai](https://claude.ai) | Anthropic's AI assistant |
    | Perplexity | [perplexity.ai](https://perplexity.ai) | AI search with citations |
  </TabItem>
</Tabs>

---

## AI Tools & Applications

### Agentic AI & Coding Assistants

<CardGrid>
  <LinkCard title="Claude Code Guide" href="/ai-ml/claude-code" description="Anthropic's CLI for agentic coding." />
  <LinkCard title="Gemini Code Guide" href="/ai-ml/gemini-code" description="Google's terminal agent for high-context tasks." />
  <LinkCard title="Codex CLI Rules" href="/ai-ml/codex-project-rules" description="SOP for running OpenAI Codex." />
  <LinkCard title="Agent Pricing" href="/ai-ml/cli-ide-agent-pricing" description="Comparison of Claude, Gemini, Cursor, and Copilot limits." />
</CardGrid>

### Specialized Tools

- [HackerGPT](/ai-ml/hackergpt2) - Security-focused AI assistant.
- [Award Bullet AI Prompt](/ai-ml/award-bullet-ai-prompt-template) - Generate military award bullets.
- [Evaluation AI Prompt](/ai-ml/evaluation-ai-prompt) - AI assistance for evaluations.

---

## Autonomous Systems

For unmanned and autonomous systems, see the dedicated section:

<CardGrid>
  <LinkCard title="Unmanned Systems" href="/general/unmanned-systems" icon="setting" />
  <LinkCard title="Counter-UAS Guide" href="/general/guide-to-countering-unmanned-systems" icon="target" />
  <LinkCard title="FPV sUAS" href="/general/fpv-suas" icon="rocket" />
</CardGrid>

---

## Intelligence Types & Concepts

<Tabs>
  <TabItem label="Intelligence Types">
    | Term | Definition |
    |------|------------|
    | Artificial Intelligence (AI) | Non-biological intelligence |
    | Narrow Intelligence | Ability to accomplish a narrow set of goals |
    | General Intelligence | Ability to accomplish virtually any goal |
    | Superintelligence | General intelligence far beyond human level |
  </TabItem>
  <TabItem label="Life Stages (Life 3.0)">
    | Term | Definition |
    |------|------------|
    | Life 1.0 | Biological - evolves hardware and software |
    | Life 2.0 | Cultural - evolves hardware, designs software |
    | Life 3.0 | Technological - designs both hardware and software |
  </TabItem>
</Tabs>

*Reference: Tegmark, M. (2017). Life 3.0: Being Human in the Age of Artificial Intelligence.*
