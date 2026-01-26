---
title: "Award Bullet AI Prompt Template"
tags: ["ai", "prompting", "awards", "military", "writing", "army"]
---

# Award Bullet AI Prompt Template

:::tip[Related Resources]
[AI Prompting Guide](/ai-ml/ai-prompting) | [Awards Guide](/military/awards) | [AI Resources](/ai-ml/ai-resources)
:::

## Overview

This template helps draft military award citations using AI. The prompts are structured using best practices from the [AI Prompting Guide](/ai-ml/ai-prompting) including role assignment, clear delimiters, few-shot examples, and structured output formats.

**Key benefits:**
- Consistent structure and tone across citations
- Focus on action, impact, and results
- Compliance with official writing guidelines
- Significant time savings on initial drafts

:::caution[Human Review Required]
AI-generated content is a starting point. Always review and refine citations to accurately reflect the individual's specific achievements and context.
:::

Use this template with [AI on government systems](https://intellipedia.intelink.gov/wiki/Ai_on_government_systems) or commercial LLMs.

***

## Quick Start

1. Copy the complete prompt template below
2. Fill in the `<variables>` section with your specific information
3. Add bullet points about the service member's actions in `<actions>`
4. Paste into your LLM (ChatGPT, Claude, government AI tools)
5. Review, refine, and iterate

***

## Award Citation Prompt Template

Copy everything below the line into your AI tool:

***

```
<role>
You are a military award citation writer with expertise in Army writing standards. Your task is to generate award citation bullets that are formal, precise, and comply with AR 600-8-22 and unit SOPs.
</role>

<writing_rules>
Follow these rules strictly:

STRUCTURE:
- Maximum 84 words per bullet
- Use bullet format with complete sentences
- Follow the Action → Impact → Result formula
- Use active voice (led, directed, coordinated, established)
- Use transition words between actions (additionally, moreover, furthermore)

PUNCTUATION:
- No semicolons
- Use colons only when absolutely necessary
- Be consistent with spacing (one or two spaces after periods)

FORMATTING:
- Named Operations/Exercises in ALL CAPS: Operation IRAQI FREEDOM, Exercise AUSTERE CHALLENGE 23
- Capitalize Joint Task Forces and Operations: NOBLE ANVIL, SOUTHERN STRIKE
- Abbreviate ranks in achievement blocks: SGM, CPT, SSG
- Do not use first names
- Capitalize service member terms: Soldier, Airman, Marine, Sailor

ACRONYMS:
- Only use acronyms when they appear more than once
- Spell out acronyms on first use (except standard Army acronyms)

NUMBERS:
- Spell out zero through nine
- Use numerals for 10-999,999
- For larger numbers: $1.5M, $2K, 40%
- If multiple numbers in one sentence and one is 10+, use numerals for all
- Spell out "percent" with numerals: "40 percent"

CONTENT:
- Explain what the service member did AND how they did it
- Focus on specific contributions and measurable impact
- Highlight mission success, leadership, and operational effectiveness
</writing_rules>

<variables>
Award Type: [MSM/ARCOM/AAM/etc.]
Rank: [SSG/SFC/CPT/etc.]
Last Name: [LAST]
Duty Title: [e.g., Operations Sergeant, Team Leader]
Unit: [e.g., Alpha Company, 1st Battalion, 5th Special Forces Group]
Operation/Mission: [e.g., Operation INHERENT RESOLVE]
Time Period: [e.g., 15 March 2023 to 14 March 2024]
Location: [e.g., Kuwait, Combined Joint Operations Area]
</variables>

<actions>
List the service member's key actions and achievements:
- [Action 1: e.g., Led a 12-person team conducting...]
- [Action 2: e.g., Developed and implemented a new SOP for...]
- [Action 3: e.g., Coordinated logistics support for...]
- [Action 4: e.g., Mentored junior Soldiers resulting in...]
</actions>

<example_bullets>
Use these as reference for style and format:

Example 1:
SGT Smith distinguished himself as the Intelligence Analyst for Alpha Company while deployed in support of Operation INHERENT RESOLVE. SGT Smith combined disparate reports into an accurate depiction of adversary defensive tactics, techniques, and procedures. The resulting product was used to update training programs and develop a breach and clear program of instruction for a company of partner nation Special Operations Forces soldiers preparing for their rotation to the line of contact.

Example 2:
While serving as the primary lane manager for Exercise SOUTHERN STRIKE 24, SSG Jones planned and executed a complex irregular warfare scenario for over 150 USSOF and 75 partner personnel. Through his mentorship, SSG Jones informed decisions regarding risk mitigation and task organization, promoting interdependence and interoperability during the NATO validation exercise.

Example 3:
SFC Williams volunteered to act as the personnel movement coordinator for Task Force ANVIL. While serving in this capacity, he coordinated the arrival, transportation, and departure of over 200 personnel throughout the deployment. His efforts ensured the command team maintained awareness of all personnel movements in support of training requirements.

Example 4:
CPT Brown distinguished herself as a leader for Cross-Functional Team ALPHA while enhancing the tactical and operational capacity of Romanian partners to further enable NATO integration. CPT Brown's knowledge, hard work, and outstanding performance were critical to the success of multiple Special Operations elements by improving interoperability and synchronization of efforts with NATO partners.
</example_bullets>

<task>
Using the variables and actions provided above, generate 4-6 award citation bullets. Each bullet should:
1. Begin with rank and last name
2. Clearly state the duty position and context
3. Describe specific actions using active voice
4. Quantify impact where possible (personnel supported, missions completed, etc.)
5. Connect actions to broader mission success
6. Stay within the 84-word limit

Format your response as numbered bullets ready for copy/paste into the award form.
</task>
```

***

## Alternative: Simplified Quick Prompt

For faster results with less setup:

```
Act as a military award citation writer following AR 600-8-22 standards.

Write 4 award bullets for:
- Rank/Name: SSG Smith
- Position: Operations Sergeant
- Unit: Bravo Company, 2nd Battalion
- Award: ARCOM
- Period: Jan 2024 - Dec 2024

Key achievements:
- Led 15 Soldiers on 23 convoy missions
- Zero accidents or incidents
- Trained 8 new drivers on MRAP operations
- Implemented new maintenance tracking system

Rules: Active voice, Action-Impact-Result format, max 84 words per bullet, no semicolons, numerals for 10+.
```

***

## Prompt for Improving Existing Bullets

Use this to refine bullets you've already drafted:

```
<role>
You are a military writing editor specializing in award citations.
</role>

<task>
Review and improve the following award bullet. Ensure it:
- Uses active voice throughout
- Follows Action → Impact → Result structure
- Stays under 84 words
- Quantifies achievements where possible
- Eliminates passive voice and weak verbs
- Complies with Army writing standards
</task>

<original_bullet>
[Paste your draft bullet here]
</original_bullet>

<output_format>
Provide:
1. Revised bullet
2. Word count
3. List of specific changes made
</output_format>
```

***

## Chain-of-Thought Prompt for Complex Awards

For high-level awards (MSM, BSM, LOM) requiring detailed justification:

```
<role>
You are a senior military awards writer preparing a Meritorious Service Medal citation.
</role>

<context>
Rank/Name: [RANK LAST]
Position: [Duty Title]
Unit: [Full Unit Designation]
Period: [Start Date to End Date]
</context>

<achievements>
[List all achievements, metrics, and impacts]
</achievements>

<task>
Think through this step by step:

Step 1: Identify the 4-6 most significant achievements that best support this award level.

Step 2: For each achievement, determine:
- The specific action taken
- The measurable impact
- The connection to mission success

Step 3: Draft bullets following the Action-Impact-Result formula.

Step 4: Review each bullet for:
- Active voice
- Word count (max 84)
- Quantified metrics
- Proper formatting

Step 5: Present the final bullets in order of significance.

Show your reasoning at each step, then provide the final citation bullets.
</task>
```

***

## Writing Standards Reference

| Element | Standard |
|---------|----------|
| Max words per bullet | 84 |
| Voice | Active (led, directed, coordinated) |
| Formula | Action → Impact → Result |
| Numbers 0-9 | Spell out (three, seven) |
| Numbers 10+ | Numerals (15, 250) |
| Operations | ALL CAPS (Operation IRAQI FREEDOM) |
| Ranks | Abbreviated (SGT, CPT, MAJ) |
| Acronyms | Spell out first use, then abbreviate |

***

## Related Resources

- [AI Prompting Guide](/ai-ml/ai-prompting) - Advanced prompting techniques
- [Awards Guide](/military/awards) - Army award regulations and tips
- [Army Evaluation Resources](/military/army-evaluation-resources) - NCOER/OER guidance
- [AI Resources](/ai-ml/ai-resources) - LLM tools and platforms
