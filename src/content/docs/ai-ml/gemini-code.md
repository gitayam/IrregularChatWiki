---
title: "Gemini Code"
description: "Advanced guide to Gemini CLI - subagents, the Jules extension, multi-model orchestration, and military/government application workflows"
tags: ["ai", "coding", "gemini", "google", "development", "agents"]
---

# Gemini Code

Gemini CLI is Google's high-performance terminal interface for interacting with Gemini models. It provides a robust platform for agentic coding, specialized subagents, and advanced tool use, making it a powerful companion to [Claude Code](/ai-ml/claude-code).

:::tip[Quick Navigation]
**Jump to:** [What is Gemini CLI?](#what-is-gemini-cli) | [Subagents](#gemini-subagents) | [Jules Extension](#jules-asynchronous-agent) | [Orchestration Strategy](#multi-model-orchestration) | [Setup & Config](#setup--experimental-configuration)
:::

## What is Gemini CLI?

Gemini CLI (often referred to as `gemini`) allows you to interact with Google's most capable models directly from your shell. Its primary strengths lie in:

- **Massive Context Window**: Native support for Gemini 1.5 Pro's 2M+ token context window.
- **Multimodal Native**: Better at handling image and video inputs for UI/UX analysis.
- **Agentic Infrastructure**: Built-in support for specialized "Subagents" that can execute tasks in parallel or in isolation.
- **System Integration**: Seamless access to your local filesystem and terminal environment.

## Gemini Subagents

Subagents are specialized "specialists" with their own system prompts, personas, and toolsets. They are designed to handle complex tasks without polluting the main conversation's context.

### Custom Subagent Definitions

In our community workflow, we use specific subagents to maintain brand consistency and quality standards. These are defined in `.gemini/agents/`:

| Agent | Purpose | Primary Workflow |
|-------|---------|------------------|
| **@ui-builder** | Component implementation | Builds UI components adhering to brand rules and design tokens. |
| **@a11y-reviewer** | Accessibility audits | Performs audits using a WCAG checklist to ensure compliance. |
| **@visual-qa** | Viewport testing | Uses Playwright to test components across 375px, 768px, and 1024px viewports. |

### How to Use Subagents

From the Gemini CLI, you can delegate specific tasks to these agents:

```bash
# Example commands:
@ui-builder Build the StoreStatusBadge component per FRICTIONLESS_PLAN.md section 3.1
@a11y-reviewer Review src/components/homepage/StoreStatusBadge.tsx for accessibility
@visual-qa Test the homepage across mobile, tablet, and desktop viewports
```

## Jules: The Asynchronous Agent

The **Jules extension** is a game-changer for long-running tasks. Unlike standard agents that wait for your input, Jules operates asynchronously in a dedicated environment.

### Key Capabilities
- **Asynchronous Execution**: Delegate a task (like "Fix all linting errors in the `lib` folder") and continue working on other things.
- **Sandboxed VM**: Jules clones your code, installs dependencies, and runs tests inside its own virtual machine.
- **GitHub Integration**: Automatically pulls GitHub issues and submits PRs upon completion.
- **Parallel Processing**: Can handle multiple issues or tasks simultaneously.

### Installation
```bash
gemini extensions install https://github.com/gemini-cli-extensions/jules --auto-update
```
*Note: Requires a Jules account at `jules.google.com` and repository connection via the Jules console.*

## Multi-Model Orchestration

For complex full-stack projects, we recommend a "Divide and Conquer" strategy between Claude and Gemini. This is detailed in our **FRICTIONLESS_PLAN.md** (Section 8).

### Task Assignment Rationale

| Task Type | Recommended Model | Why? |
|-----------|-------------------|------|
| **Logical Refactoring** | Claude (Sonnet 3.5) | Superior reasoning for complex code logic and architectural changes. |
| **Massive Context Tasks** | Gemini (1.5 Pro) | Best for "Search and Destroy" missions across millions of tokens or multi-file analysis. |
| **UI/UX & Visual QA** | Gemini (1.5 Pro/Flash) | Better native multimodal understanding of screenshots and design files. |
| **Background Maintenance** | Jules (Gemini-powered) | Perfect for dependency updates, linting, and unit test expansion while you code. |

### Collaboration Rules
- **File Ownership**: Avoid having two models write to the same file in the same session.
- **Commit Cadence**: Commit after every successful agentic loop to provide a "checkpoint" for the next model.
- **Parallel Workflows**: Use `tmux` to run Claude in one pane for feature development and Gemini in another for documentation and QA.

## Setup & Experimental Configuration

To unlock the full potential of subagents, you must enable experimental features in your settings.

### Enable Agents
Edit your `~/.gemini/settings.json` file to include:

```json
{
  "experimental": {
    "enableAgents": true
  }
}
```

### Community Tips for Government/Military Users
- **Data Residency**: Be aware that Gemini CLI transmits data to Google Cloud. Check your organization's sensitivity level for proprietary or CUI code.
- **Tool Safety**: Use the `/safe` or `/ask` modes if you are uncomfortable with the "YOLO" execution of shell commands.
- **Context Injection**: Use `llms.txt` and `.gemini-rules` files to provide mission-specific context without manually pasting it every time.

## Related Resources
- [Chrome DevTools MCP](/ai-ml/chrome-devtools-mcp) - Agentic browser control and debugging
- [Claude Code Guide](/ai-ml/claude-code) - Comparison and complementary workflows
- [Full-Stack Development with AI](/development/full-stack-development-with-ai) - Broad AI integration strategies
- [Project Rules & Lessons Learned](/ai-ml/project-rules-lessons-learned) - Maintaining `CLAUDE.md` and `.gemini-rules`

## External Links
- [Gemini CLI Documentation](https://geminicli.com/docs/)
- [Jules Console](https://jules.google.com/)
- [Google AI Studio](https://aistudio.google.com/) - For API key management and model testing
