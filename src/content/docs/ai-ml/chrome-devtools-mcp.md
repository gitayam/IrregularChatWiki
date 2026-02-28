---
title: "Chrome DevTools MCP"
description: "A guide to using Chrome DevTools via Model Context Protocol (MCP) for AI agent browser interaction."
---

# Chrome DevTools MCP

**Chrome DevTools MCP** is the "next level" for AI agents, providing them with direct access to a live browser's internal debugging and navigation capabilities. While frameworks like Playwright are excellent for scripted automation, Chrome DevTools MCP gives agents real-time "runtime awareness" and "eyes in the browser."

## Why It's the "Next Level"

For AI agents (like Gemini CLI, Claude Code, or Cursor), the ability to interact with a browser is a game-changer. Traditionally, agents were "blind" to the rendered state of their code. Chrome DevTools MCP solves this by providing:

1.  **Direct Engine Access:** It uses the **Chrome DevTools Protocol (CDP)**, the same low-level interface used by Chrome's own developer tools.
2.  **Live Interaction:** Unlike a headless script that runs in isolation, MCP allows an agent to interact with a *live* browser instance, potentially even the one the developer is currently using.
3.  **Lower Overhead:** Agents don't need to write, debug, and execute complex Playwright or Selenium scripts. They simply call standard MCP tools (e.g., `navigate_page`, `take_snapshot`) and get immediate feedback.
4.  **Full Debugging Suite:** Agents can read console logs, inspect network errors (like CORS issues), analyze performance metrics, and view the full accessibility tree of a page.

## Key Capabilities

Through the Model Context Protocol, an AI agent can perform a variety of tasks:

*   **Navigation:** `navigate_page`, `go_back`, `go_forward`, `reload`.
*   **Visual Feedback:** `take_snapshot` (capturing the visual state and accessibility tree of the page).
*   **Interaction:** `click_element`, `type_text`, `drag_and_drop`, `press_key`.
*   **Inspecting State:** Reading the DOM, CSS, and console logs.
*   **Network Analysis:** Monitoring requests and identifying failed API calls.

### Example Workflow

An agent might use Chrome DevTools MCP to verify a UI change:

1.  **Agent:** "I've updated the button styles. Let me check if they look correct."
2.  **Tool Call:** `chrome-devtools - navigate_page (MCP)(url: "http://localhost:3000")`
3.  **Tool Call:** `chrome-devtools - take_snapshot (MCP)`
4.  **Agent:** "I see the button is now the correct shade of blue, but it's overlapping the text. Let me fix the margin..."

## Chrome DevTools MCP vs. Playwright

| Feature | Chrome DevTools MCP | Playwright |
| :--- | :--- | :--- |
| **Primary Use** | Real-time agentic debugging & verification | End-to-end testing & automation scripts |
| **Agent Interface** | Standardized MCP tool calls | LLM-generated script execution |
| **Environment** | Live/Active browser instances | Headless/Isolated test environments |
| **Feedback Loop** | Immediate results per action | Script execution cycle (write -> run -> report) |
| **Depth** | Deep access to internal DevTools features | Broad cross-browser support (WebKit, Firefox) |

**Verdict:** For **agentic coding** and real-time verification, Chrome DevTools MCP is often superior because it provides a tighter feedback loop and deeper integration with the developer's live environment.

## Getting Started

To use Chrome DevTools MCP, you typically need an MCP-compatible agent and a running Chrome instance configured for debugging.

1.  **Install an MCP Server:** Use a server like the official [Google Chrome DevTools MCP server](https://github.com/google/chrome-devtools-mcp).
2.  **Configure Your Agent:** Add the MCP server to your agent's configuration (e.g., in `claude_desktop_config.json` or your Gemini CLI settings).
3.  **Launch Chrome:** Run Chrome with remote debugging enabled if required by the server.

### Example Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@google/model-context-protocol-chrome-devtools"]
    }
  }
}
```

## Advanced Usage

*   **Performance Audits:** Ask the agent to "Analyze the LCP (Largest Contentful Paint) for this page" and suggest optimizations.
*   **Accessibility Testing:** Use the `get_accessibility_tree` tool to ensure your components are accessible to screen readers.
*   **Error Diagnosis:** "Tell me why the login API is failing." The agent can check the Network tab and console logs to find the 401 error.

---

*See also: [Full-Stack Development with AI](/development/full-stack-development-with-ai)*
