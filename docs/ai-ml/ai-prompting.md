---
title: "AI Prompting"
tags: ["ai", "prompting", "chatgpt", "llm", "research"]
---

# AI Prompting

::: tip Related Resources
[AI Resources](/ai-ml/ai-resources) | [AI/ML Learning](/ai-ml/ai-ml-learning) | [AI Ethics](/ai-ml/ai-ethics)
:::

## AI/ML Prompting Guide for Research, Processing, and Analysis

This guide helps users employ AI/ML technologies effectively to enhance research collection, processing, and analysis. It provides structured prompts with placeholders for direct use in conversational AI applications like ChatGPT, Claude, and other LLMs.

---

## Prompting Strategies

### 1. Write Clear Instructions

Ensure your instructions are specific and direct to get the most relevant and accurate responses from AI.

**Prompt Template:**
```
"Analyze [detailed description of the topic or data] focusing on [specific aspects]. Summarize the findings in [desired length or format]."
```

**Example:**
```
"Analyze the 2024 threat landscape for critical infrastructure focusing on ransomware trends. Summarize the findings in a 500-word executive brief."
```

---

### 2. Provide Reference Text

Giving reference texts helps the AI understand the context or background of your query better.

**Prompt Template:**
```
"Considering the information provided in [reference text or document], discuss [specific question or topic]. Include any necessary citations from [specific sources or databases]."
```

**Example:**
```
"Considering the information provided in this CISA advisory, discuss the recommended mitigations for the vulnerabilities mentioned. Include any CVE numbers referenced."
```

---

### 3. Split Complex Tasks

Complex tasks should be divided into simpler, more manageable sub-tasks.

**Prompt Template:**
```
"Step 1: Outline the main arguments found in [document or text].
Step 2: Evaluate the implications of these arguments on [specific field or issue].
Step 3: Predict future trends based on this evaluation."
```

**Example:**
```
"Step 1: Outline the main findings in this intelligence report.
Step 2: Evaluate the implications for regional stability.
Step 3: Identify potential indicators to monitor going forward."
```

---

### 4. Give the Model Time to "Think"

Prompt the AI to consider the response more deeply by asking it to explain its reasoning process.

**Prompt Template:**
```
"Before answering, consider the factors affecting [topic or issue]. What are the potential impacts of [specific factor]? Explain your reasoning."
```

**Example:**
```
"Before answering, consider the factors affecting supply chain security. What are the potential impacts of vendor concentration? Explain your reasoning step by step."
```

---

### 5. Use External Tools

Leverage the AI's ability to integrate with external tools for enhanced data retrieval or analysis.

**Prompt Template:**
```
"Use the data from [external database or API] to calculate [specific calculation]. Summarize the results and explain how they impact [related topic or issue]."
```

**Example:**
```
"Use the data from Shodan to identify exposed industrial control systems in [region]. Summarize the results and explain the potential security implications."
```

---

### 6. Test Changes Systematically

Regularly evaluate the effectiveness of your prompts and the accuracy of the AI's responses.

**Prompt Template:**
```
"Generate a [output type] about [topic]. Then evaluate your response against these criteria: [list criteria]. Revise if needed."
```

---

## Search Query Generation

Use AI to generate advanced search queries for OSINT and research.

**Template:**
```
Create an advanced query for [Search Engine/Platform] using [Language] incorporating the information below:

Searching for: [topic]
Region: [Country/Region]
Language: [Local Language]
Platform: [Google/Bing/DuckDuckGo/Yandex]
Data Type: [PDF/DOC/XLS/etc.]
Media Type: [News/Database/Report/Wiki/Repository]
Date Range: [timeframe]
```

**Example:**
```
Create an advanced query for Google using English incorporating the information below:

Searching for: Critical infrastructure cyberattacks
Region: Eastern Europe
Language: English and Russian
Platform: Google
Data Type: PDF
Media Type: News, Reports
Date Range: Last 6 months
```

---

## Role-Based Prompting

Assign the AI a specific role to get more targeted responses.

**Template:**
```
"Act as a [role with specific expertise]. Given [context or scenario], provide [specific deliverable]."
```

**Examples:**
```
"Act as a senior intelligence analyst. Given this collection of social media posts, identify potential indicators of coordinated inauthentic behavior."
```

```
"Act as a penetration tester. Given this network diagram, identify the top 5 attack vectors you would prioritize."
```

---

## Chain-of-Thought Prompting

For complex analysis, ask the AI to show its reasoning.

**Template:**
```
"Analyze [problem or question]. Think through this step by step:
1. First, identify [component 1]
2. Then, evaluate [component 2]
3. Finally, synthesize your findings into [output format]

Show your reasoning at each step."
```

---

## Structured Output Prompting

Request specific output formats for easier processing.

**Template:**
```
"Analyze [input] and provide your response in the following format:

## Summary
[2-3 sentence overview]

## Key Findings
- Finding 1
- Finding 2
- Finding 3

## Recommendations
1. [Action item]
2. [Action item]

## Confidence Level
[High/Medium/Low] - [reasoning]"
```

---

## Tips for Better Prompts

| Technique | Description |
|-----------|-------------|
| Be specific | Vague prompts get vague answers |
| Provide context | Include relevant background information |
| Set constraints | Specify length, format, tone |
| Use examples | Show what you want with sample outputs |
| Iterate | Refine prompts based on responses |
| Verify outputs | Always fact-check AI-generated content |

---

## Common Pitfalls

::: warning Avoid These Mistakes
- **Assuming accuracy**: AI can hallucinate facts—always verify
- **Over-reliance**: Use AI as a tool, not a replacement for analysis
- **Sensitive data**: Don't input classified or PII into public AI tools
- **Single prompt**: Complex tasks often need multiple refined prompts
:::

---

## Related Resources

- [AI Resources](/ai-ml/ai-resources) - Tools and platforms
- [AI/ML Learning](/ai-ml/ai-ml-learning) - Courses and training
- [AI Ethics](/ai-ml/ai-ethics) - Responsible AI use
- [Research Tools](/research/research-tools) - OSINT and research platforms
