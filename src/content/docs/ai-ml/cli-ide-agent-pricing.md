---
title: "CLI + IDE Coding Agents — Plan Pricing vs Usage Limits"
description: "Snapshot comparison (2026-02-14) of leading CLI and IDE AI coding agents, highlighting what each vendor actually publishes about pricing, quotas, and token/context limits."
---

# CLI + IDE Coding Agents — Plan Pricing vs Token/Context & Usage Limits

Snapshot date: **2026-02-14**

Comparing AI coding agents is messy because most vendors do **not publish** token caps per plan, especially for consumer-oriented CLI and IDE add‑ons. This page distills what is actually disclosed, flags what is *not* stated, and links to vendor primary sources so you can cite them in acquisition paperwork or budget briefings. Use it alongside the [Claude Code Guide](/ai-ml/claude-code), [Gemini Code Guide](/ai-ml/gemini-code), [OpenHands Guide](/ai-ml/openhands), and the [Full-Stack Development with AI](/development/full-stack-development-with-ai) workflow for deeper operational context.

---

## How to read this guide

- **Plan allowance unit:** Vendors express limits as tokens, requests, credits, or raw dollars. Pay attention to the unit before comparing plans.
- **Context window vs. quota:** Some vendors publish context window sizes (max tokens in a single prompt) but *not* recurring monthly allowances.
- **“Not published” ≠ unlimited:** When a doc says limits are not published, that only means the vendor hasn’t shared the numbers publicly.
- **Shared pools:** Several tools share quotas between CLI/IDE agents and their main chat apps. If you burn through Claude Code, you also reduce Claude desktop/web usage.

---

## 1) CLI agents

### 1.1 Claude Code (Anthropic)

- **Plan inclusion:** Claude Code ships with **Claude Pro** and **Claude Max** subscriptions and shares usage limits with Claude web/desktop/mobile.  
  Source: [Anthropic Support](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)
- **Token behavior:** Anthropic confirms Claude Code consumes tokens and offers cost guidance, but **does not publish** a consumer-facing token cap table.  
  Source: [Claude Code – Costs](https://code.claude.com/docs/en/costs)
- **Context window (consumer):** Anthropic describes automatic context management for paid Claude plans but does **not** state a fixed window size in the help article.  
  Source: [How large is the context window on paid Claude plans?](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans)
- **Enterprise/API note:** The Claude API exposes beta **1,000,000 token** windows on Opus 4.6 and Sonnet 4.x for certain org tiers, but this is separate from consumer Claude Code limits.  
  Source: [Build with Claude – Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- **Pricing:** Consumer pricing lives at [claude.com/pricing](https://claude.com/pricing); team/enterprise pricing details are in the [Claude Code Funding](/ai-ml/claude-code-funding) guide.

**Wiki-ready takeaways**

- ✅ Included with Pro/Max and shares limits with the main Claude app
- ⚠️ No published “X tokens/day” number for consumer CLI usage
- ✅ API/org tiers offer 1M-token beta windows (separate channel)

### 1.2 Codex CLI (OpenAI)

- **Plan inclusion:** Codex CLI runs locally and can authenticate via ChatGPT Plus/Pro/Business/Edu/Enterprise or by API key.  
  Source: [Codex CLI docs](https://developers.openai.com/codex/cli)
- **Pricing:** OpenAI explains that some Codex modes track against ChatGPT plan entitlements, while API-key access is pay-per-token using standard GPT pricing.  
  Source: [Codex pricing](https://developers.openai.com/codex/pricing/)
- **Model guidance:** OpenAI recommends `gpt-5.3-codex` for most CLI work; Codex-tuned models appear in the API catalog.  
  Source: [Codex models](https://developers.openai.com/codex/models) and [Prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide)
- **Context window publication:** OpenAI does **not** publish a CLI-specific context window number. Published limits instead focus on workspace model sizes (e.g., GPT-5.1 Thinking at 196K tokens in ChatGPT Enterprise/Edu).  
  Source: [ChatGPT Enterprise and Edu models & limits](https://help.openai.com/en/articles/11165333-chatgpt-enterprise-and-edu-models-limits)
- **Usage caps:** ChatGPT help center articles reference weekly message allocations and higher context limits for GPT-5 Thinking, but no table maps those caps directly to Codex CLI.  
  Source: [ChatGPT usage limits](https://help.openai.com/en/articles/6825453-chatgpt-usage-limits)

**Wiki-ready takeaways**

- ✅ Codex CLI is bundled across the ChatGPT paid family or can run on an API key
- ⚠️ Numeric CLI context window caps are not stated publicly
- ✅ Enterprise/Edu workspaces document GPT model context windows (128K / 196K) but that data must be cited carefully because it is not branded as “Codex CLI limits”

### 1.3 Gemini CLI (Google Gemini Code Assist)

- **Context window:** Google Cloud’s Gemini Code Assist docs state **1,000,000 token** context window for “local codebase awareness.”  
  Source: [Gemini quotas](https://docs.cloud.google.com/gemini/docs/quotas)
- **Quota pool:** Gemini CLI and “agent mode” share the same quota pool; a single CLI prompt may call multiple backend requests.  
  Source: [Gemini quotas](https://docs.cloud.google.com/gemini/docs/quotas)
- **Requests per user:**  
  - Standard edition: 120 requests/user/minute, 1,500 requests/user/day  
  - Enterprise edition: 120 requests/user/minute, 2,000 requests/user/day  
  Source: [Gemini quotas](https://docs.cloud.google.com/gemini/docs/quotas)
- **Broader API rate limits:** Google’s AI for Developers docs expand on RPM/TPM/RPD tiers for Gemini APIs.  
  Source: [Gemini API rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- **Pricing context:** Public pricing is fragmented across consumer “Gemini Advanced/AI Pro” bundles and Google Cloud Standard vs Enterprise editions. For CLI/agent comparisons, the Cloud quota doc is the authoritative table.

**Wiki-ready takeaways**

- ✅ 1M token local context is explicitly documented
- ✅ Requests/day and requests/minute caps are public
- ✅ CLI + agent mode use the same quota pool, so workflows must budget for both

---

## 2) IDE agents (Editor-integrated)

### 2.1 Cursor

- **Context windows:** Cursor typically runs at **200K token** context windows. “Max Mode” expands to each model’s maximum (including 1M-token Gemini 3 Pro).  
  Sources: [Max Mode docs](https://cursor.com/docs/context/max-mode) and [Cursor models](https://cursor.com/docs/models)
- **Usage allowance:** Cursor Pro bundles **$20/month** of “frontier model usage” priced at API rates; you can top up at cost.  
  Source: [June 2025 pricing update](https://cursor.com/blog/june-2025-pricing)
- **Higher tier:** Cursor Ultra costs **$200/month** and offers “20× more usage than Pro,” again denominated in dollar-equivalent usage pools rather than tokens.  
  Source: [New tier announcement](https://cursor.com/blog/new-tier)
- **Token disclosure:** Cursor has not published a per-plan “N tokens/month” chart; usage depends on which model you route through Max Mode.

### 2.2 Windsurf

- **Credits, not tokens:** Windsurf plans grant monthly prompt credits: Free 25, Pro 500, Teams 500/user, Enterprise 1,000/user (and higher upon request).  
  Source: [Windsurf pricing](https://windsurf.com/pricing)
- **Consumption model:** Credits are deducted per agent interaction, with multipliers based on the chosen model.  
  Source: [Windsurf usage docs](https://docs.windsurf.com/plugins/accounts/usage)
- **Context window disclosure:** Windsurf’s “Fast Context” feature explains retrieval behavior but does not publish a numeric token window per plan.  
  Source: [Fast Context](https://docs.windsurf.com/context-awareness/fast-context)

### 2.3 GitHub Copilot (Coding agent features)

- **Agent availability:** GitHub’s coding agent capabilities are available on Copilot Pro, Pro+, Business, and Enterprise (depending on rollout).  
  Source: [About the coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
- **Billing unit:** Copilot tracks **requests** and **premium requests**, not raw tokens. Organizations can allocate premium request budgets per seat.  
  Sources: [Copilot premium requests](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests) and [Request definition](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)
- **Token context:** GitHub does not publish token window sizes. Practical planning is based on how many premium agent requests are in your monthly allocation.

---

## 3) Comparison table

| Product | Agent Type | Plan allowance unit | Published allowance | Published context window tokens | Notes |
|--------|------------|---------------------|---------------------|---------------------------------|-------|
| Claude Code | CLI | Shared usage limits (Claude app + CLI) | Included with Claude Pro / Max | Consumer CLI: not published; API beta 1M tokens on Opus/Sonnet tiers | Keep team/enterprise purchasing nuances in [Claude Code Funding](/ai-ml/claude-code-funding) |
| Codex CLI | CLI | ChatGPT plan entitlements or API pay-per-token | Included with ChatGPT Plus/Pro/Business/Edu/Enterprise; API billed per token | Not publicly published for the CLI | Workspace docs cite GPT-5.x context sizes (128K / 196K) but not branded as Codex CLI |
| Gemini CLI (Code Assist) | CLI | Requests per user (shared with agent mode) | Standard: 1,500 req/day & 120 req/min; Enterprise: 2,000 req/day & 120 req/min | 1,000,000 tokens (local codebase awareness) | Quotas documented in Google Cloud Gemini guide |
| Cursor | IDE | Dollar-equivalent usage pool | Pro: $20/mo included; Ultra: 20× Pro | Default 200K; Max Mode up to model max (1M+) | Token allowance varies with chosen model cost |
| Windsurf | IDE | Credits per month | Free 25; Pro 500; Teams 500/user; Enterprise 1,000/user | Not published (model-dependent) | Credits deducted per agent call with multipliers |
| GitHub Copilot | IDE/Agent | Requests / premium requests | Premium request budgets per org plan | Not published | Limits measured in request budgets, not tokens |

---

## 4) Community plan tracker

*Source: Maintained by the IrregularChat community. Submit PRs (or sheet updates) when vendors change pricing or limits.*

| Product | Plan / Price (USD) | Allowance metric | Published context window | Notes | Source |
|---------|--------------------|------------------|--------------------------|-------|--------|
| Claude Code | Pro **$20/mo**, Max **$35/mo** (consumer) | Shared Claude usage pool across web/desktop/CLI | Consumer CLI: **Not published**; API beta **1M tokens** on Opus/Sonnet tiers | Included with Pro/Max; auto context management | [Claude pricing](https://claude.com/pricing) · [Context window FAQ](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans) |
| Codex CLI | ChatGPT Plus **$20/mo**, ChatGPT Pro **$50/mo**, Business/Edu/Enterprise = contract | ChatGPT plan entitlements or API pay-per-token | CLI-specific cap **not published**; workspace docs cite GPT-5.1 (128K) / GPT-5.1 Thinking (196K) | Runs locally with ChatGPT auth or API key | [Codex pricing](https://developers.openai.com/codex/pricing/) · [Enterprise limits](https://help.openai.com/en/articles/11165333-chatgpt-enterprise-and-edu-models-limits) |
| Gemini CLI (Code Assist) | Standard & Enterprise seats billed via Google Cloud | Standard: 1,500 req/day + 120 rpm; Enterprise: 2,000 req/day + 120 rpm (shared with agent mode) | **1,000,000 tokens** local codebase awareness | Requests are pooled between CLI + agent workflows | [Gemini quotas](https://docs.cloud.google.com/gemini/docs/quotas) |
| Cursor | Pro **$20/mo** (includes $20 API usage), Ultra **$200/mo** (20× usage) | Dollar-based pool spent at API pricing; top-ups sold at cost | Default **200K**; Max Mode up to each model max (1M+ when supported) | Usage varies with chosen model mix | [June 2025 pricing](https://cursor.com/blog/june-2025-pricing) · [New tier](https://cursor.com/blog/new-tier) |
| Windsurf | Free, Pro, Teams, Enterprise (see pricing page for current USD rates) | Monthly credits: 25 / 500 / 500 user / 1,000 user | Not published (model-dependent via Fast Context) | Credits burn faster on larger models | [Windsurf pricing](https://windsurf.com/pricing) · [Usage docs](https://docs.windsurf.com/plugins/accounts/usage) |
| GitHub Copilot | Pro/Pro+/Business/Enterprise (per-seat, listed on GitHub pricing) | Requests & premium requests per seat/org budget | Not published | Coding agent availability depends on tier; request budgets throttle heavy workflows | [Copilot agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) · [Premium requests](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests) |

---

## Implementation tips for teams

1. **Budget translation:** Convert each vendor’s allowance (credits, requests, dollar pools) into the workload you care about (e.g., “How many full repo refactors per month?”). Capture those assumptions in your SOP so new operators know the tradeoffs.
2. **Pair with workflow guides:** Use this page as a factual reference, then hand teammates to the [Full-Stack Development with AI](/development/full-stack-development-with-ai) playbook for end-to-end harness design.
3. **Document floor vs. ceiling:** Vendors reserve the right to throttle during abuse spikes. Keep the authoritative links above handy when leadership needs proof of the published numbers.
4. **Cross-check quarterly:** Pricing and quota disclosures change frequently. Set a reminder to refresh these notes when revisiting procurement or renewing subscriptions.

---

## Sources

- Claude Code plan inclusion and usage limits: [Anthropic Support](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)
- Claude Code context guidance: [Anthropic Support](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans)
- Claude Code cost guidance: [Claude Code docs](https://code.claude.com/docs/en/costs)
- Claude API context: [Build with Claude](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- Claude pricing: [claude.com/pricing](https://claude.com/pricing)
- Codex CLI docs: [OpenAI Codex CLI](https://developers.openai.com/codex/cli)
- Codex pricing and models: [OpenAI Codex pricing](https://developers.openai.com/codex/pricing/) · [Codex models](https://developers.openai.com/codex/models)
- Codex prompting: [OpenAI cookbook](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide)
- ChatGPT workspace limits: [OpenAI Help Center](https://help.openai.com/en/articles/11165333-chatgpt-enterprise-and-edu-models-limits)
- ChatGPT usage limits: [OpenAI Help Center](https://help.openai.com/en/articles/6825453-chatgpt-usage-limits)
- Gemini quotas and limits: [Google Cloud Gemini docs](https://docs.cloud.google.com/gemini/docs/quotas)
- Gemini API rate limits: [ai.google.dev](https://ai.google.dev/gemini-api/docs/rate-limits)
- Cursor context and pricing: [Cursor Max Mode](https://cursor.com/docs/context/max-mode) · [Cursor models](https://cursor.com/docs/models) · [June 2025 pricing](https://cursor.com/blog/june-2025-pricing) · [New tier](https://cursor.com/blog/new-tier)
- Windsurf pricing & usage: [Windsurf pricing](https://windsurf.com/pricing) · [Usage documentation](https://docs.windsurf.com/plugins/accounts/usage) · [Fast Context](https://docs.windsurf.com/context-awareness/fast-context)
- GitHub Copilot agent and billing: [About the coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) · [Premium requests](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests) · [Request types](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)

*Need more pricing nuance (especially for Anthropic enterprise seats)? See the [Claude Code Funding & Subscriptions guide](/ai-ml/claude-code-funding).*
