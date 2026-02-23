---
title: "Full-Stack Development with AI"
---

# Full-Stack Development with AI

This guide explores how to leverage AI, particularly large language models (LLMs), in a full-stack development workflow. From self-hosting models to agentic coding and AI-powered project management, we cover the tools and techniques to build a powerful, private, and efficient development environment.

## The Rise of Agentic AI in Development

While large, cloud-based models like Claude and Gemini are incredibly powerful, there's a growing movement towards using smaller, self-hosted models for day-to-day development tasks. The core idea is that for well-defined, smaller tasks, these models are "good enough" and offer significant advantages in terms of cost, privacy, and control.

Instead of "one-shotting" a large codebase, which can be difficult to review and debug, the agentic approach breaks down development into smaller, manageable tasks that are assigned to AI agents. For small, well-defined tasks, the difference in output between self-hosted and cloud models may not be significant, making self-hosted options more practical. Keeping context concise remains a key factor for optimal performance across all models.

## Core Components of an AI-Powered Workflow

A typical full-stack AI development workflow consists of several key components:

### 1. Self-Hosted Language Models

Self-hosting your own LLMs gives you complete control over your data and eliminates reliance on third-party APIs.

*   **Models:** `Devstral-Small` is a popular choice, as it's specifically trained for agentic coding tasks. Other models from Mistral and Qwen are also effective.
*   **Hardware:** Self-hosting requires significant GPU resources. A setup with dual NVIDIA 3090s (providing around 48GB of VRAM) is a good starting point for models like `Devstral-Small`.
*   **Serving Models:** [vLLM](https://github.com/vllm-project/vllm) is a high-throughput and memory-efficient inference and serving engine for LLMs. It can be deployed using Docker.

### 2. Agentic Coding Harnesses & AI-Enhanced Shells

An agentic harness is a tool that provides an LLM with the capabilities to interact with your development environment (e.g., file system, shell, web browser). AI-enhanced shells further streamline terminal interactions.

*   **[OpenHands](https://github.com/All-Hands-AI/OpenHands):** An open-source agent that can execute complex tasks and is designed to work with a variety of models. It can be deployed via Docker and connected to your self-hosted LLM.
*   **[cline.bot](https://github.com/Aider-Chat/cline.bot):** A command-line tool that lets you code with AI agents in your terminal.
*   **Warp:** An AI-enhanced terminal that offers advanced features like intelligent tab completion, AI-corrected prompts, and controlled "yolo" execution (auto-acceptance of commands). It allows for "warp-izing" shells over SSH, enabling context to follow across different shell sessions and remote servers. Warp can identify and help maintain context, suggesting modifications when context becomes "muddied."

These tools can be used to automate tasks like writing code, fixing bugs, and even submitting merge requests based on issues in your project management system.

> **Plan selection tip:** Need to justify which commercial agent to fund? Use the [CLI + IDE agent pricing snapshot](/ai-ml/cli-ide-agent-pricing) to compare Claude Code, Codex CLI, Gemini Code Assist, Cursor, Windsurf, and GitHub Copilot limits before locking in subscriptions.

### 3. AI-Powered Project Management

AI can be integrated into your project management workflow to automate tedious tasks.

*   **Task Evaluation:** A larger, more powerful model can be used to analyze the complexity of new tasks, assign labels, and manage backlogs.
*   **Integration with Gitlab/GitHub:** By using the APIs of platforms like Gitlab/GitHub, you can create agents that automatically create issues, assign tasks, and manage merge requests. AI agents can directly interact with these platforms, sending commits and managing project activities.
*   **Structured Projects:** A well-structured project with a clear "vision" document, phases, milestones, and sprints makes it easier for AI agents to understand the context and contribute effectively.
*   **Advanced Workflows:** Complex workflows can involve using multiple AI agents in parallel, for example, running several Claude instances within `tmux` sessions to concurrently work on different `git worktrees` or resolve GitHub issues.

## Advanced Concepts

### Agent-to-Agent (A2A) Communication

As you build more complex systems, you'll likely need multiple specialized agents to collaborate.

*   **[A2A Protocol](https://a2a-protocol.org/latest/):** An open standard for enabling communication between different AI agents.
*   **Agno Library:** A library for orchestrating and coordinating interactions between multiple agents.

### "Hivemind" with Redis

A shared knowledge base or "hivemind" can be created using a key-value store like Redis.

*   **[Upstash](https://upstash.com/):** A serverless Redis provider that offers a generous free tier, making it easy to get started.
*   **Coordination:** Agents can connect to the Redis instance to share information, coordinate tasks, and maintain a consistent state, forming a "hivemind" for distributed agents. HuggingFace spaces can be used to spin up infrastructure for these agents.

### Code Execution with MCP (Model Context Protocol)

A more efficient way to expose tools to an LLM is to use the "Code Mode" approach with MCP.

*   **The Concept:** Instead of giving the LLM a list of tools, you provide it with a TypeScript API definition. The LLM then writes code to call that API.
*   **Benefits:** This can significantly reduce the number of tokens required for tool use, making your agents faster and more cost-effective.

## Mobile Development with AI

*   **Claude Code on the Web:** Offers capabilities for coding directly on mobile devices, providing a "game changer" experience for on-the-go development.

## Recommended Tools and Technologies

*   **Models:** Devstral-Small, Mistral, Qwen, Claude, Gemini
*   **Model Serving:** vLLM, Docker
*   **Agentic Harnesses:** OpenHands, cline.bot, **Gemini CLI (with Jules)**
*   **AI-Enhanced Shells:** Warp
*   **Project Management:** Gitlab, GitHub
*   **A2A Communication:** A2A Protocol, Agno
*   **Shared State:** Redis (Upstash)
*   **Frontend (Lightweight):** [HTMX](https://htmx.org/)
*   **IDE:** VSCode, JupyterLab
*   **Mobile Development:** Claude Code on the Web
*   **Plan benchmarking:** [CLI + IDE Agents — Plan Pricing vs Usage Limits](/ai-ml/cli-ide-agent-pricing)

## Military-Focused Development Resources

### CAC Authentication for Web Applications

For military and government applications, integrating **Common Access Card (CAC)** authentication is often a critical requirement. CAC enables strong two-factor authentication using the DoD PKI infrastructure.

#### [cac-auth - DoD CAC Authentication for Cloudflare Workers](https://github.com/nkuntz1934/cac-auth)

This repository provides a reference implementation for enabling CAC authentication using Cloudflare Workers with mTLS (mutual TLS) and BYOCA (Bring Your Own CA).

**Key concepts covered:**

- **mTLS (Mutual TLS):** Two-way certificate authentication where both server and client validate each other's certificates
- **BYOCA:** Bringing your own Certificate Authority (DoD Root CA 6 + intermediate CAs) to Cloudflare
- **Certificate Chain:** Proper handling of DoD ID CAs (70, 71, 72, 73, 78, 79)
- **Cloudflare Workers:** Edge-based authentication without managing traditional server infrastructure

**Why this matters for military units:**

- Build internal tools that require CAC authentication without complex server-side PKI setups
- Serverless architecture reduces maintenance burden for small teams
- Can be integrated with existing Cloudflare infrastructure
- Provides a foundation for building CAC-protected APIs and web applications

**Requirements:**

- Cloudflare Enterprise account (required for BYOCA/mTLS)
- DoD CA certificates from [public.cyber.mil](https://public.cyber.mil/pki-pke/)
- Wrangler CLI for deployment

:::note[Enterprise Requirement]
CAC authentication via BYOCA requires a Cloudflare Enterprise account. For unit-level applications, coordinate with your organization's Cloudflare administrator or explore alternative hosting options if Enterprise access is not available.
:::

**Example use cases:**

- Internal unit dashboards accessible only to CAC holders
- API endpoints requiring certificate-based authentication
- Self-service tools for personnel management
- Training management systems with verified identity

## See Also

*   [Claude Code Guide](/ai-ml/claude-code) - Comprehensive guide to using Claude Code for AI-assisted development
*   [Gemini Code Guide](/ai-ml/gemini-code) - Advanced guide to Gemini CLI and subagents
*   [Software Engineering](/development/software-engineering)
*   [OpenHands Guide](/ai-ml/openhands)
*   [DoD PKI Certificate Repository](https://public.cyber.mil/pki-pke/)
