---
title: "Evaluation AI Prompt"
tags: ["ai", "prompting", "ncoer", "oer", "evaluation", "military", "army"]
---

# Evaluation AI Prompt

::: tip Related Resources
[AI Prompting Guide](/ai-ml/ai-prompting) | [Army Evaluation Resources](/general/army-evaluation-resources) | [AI Resources](/ai-ml/ai-resources)
:::

## Overview

This page provides AI prompt templates for writing NCOER Senior Rater comments. The prompts use best practices from the [AI Prompting Guide](/ai-ml/ai-prompting) including role assignment, structured delimiters, few-shot examples, and clear output formats.

::: warning Human Review Required
AI-generated content is a starting point. Always review and tailor comments to accurately reflect the NCO's specific performance, potential, and your professional assessment.
:::

***

## Quick Start

1. Gather input from the Soldier, Rater, and supporting documentation
2. Copy the appropriate prompt template below
3. Fill in the variables section
4. Paste the NCOER bullets for context
5. Generate, review, and refine
6. Ensure comments fit within the allocated space (typically 4-5 lines)

***

## Senior Rater Regulatory Guidance

The NCOER is governed by **AR 623-3** and **[DA PAM 623-3](http://thenewoer.com/presentation_content/external_files/DA%20Pam%20623-3%20Dated%2031%20March%202014.pdf)**.

### Senior Rater Responsibilities

- Provide an **objective and fair assessment** focusing on future potential
- Focus on readiness for **increased responsibility and promotion**
- Include **peer comparisons and enumeration** (e.g., "#1 of 10 SGTs")
- Recommend **career development** (promotion, schooling, assignments)
- Base evaluations on contributions during the rating period

### Performance Box Ratings (Part V, Block c)

| Rating | Description |
|--------|-------------|
| 1 | Far Exceeded Standard |
| 2 | Exceeded Standard |
| 3 | Met Standard |
| 4 | Did Not Meet Standard (requires explanation) |
| 5 | Greatly Did Not Meet Standard (requires explanation) |

### Potential Box Ratings (Part V, Block d)

| Rating | Description |
|--------|-------------|
| 1 | Most Qualified - Immediate promotion recommended |
| 2 | Highly Qualified - Strong promotion recommendation |
| 3 | Qualified - Promote if allocations available |
| 4 | Marginal - Additional training/observation needed |
| 5 | Least Qualified - Significant improvement needed |

### Required Comments

Senior Raters must address:
- Any "Fair" (4) or "Poor" (5) ratings with explanation
- Substantiated SHARP, EO, or EEO findings
- Lack of rated NCO's signature (if applicable)
- When serving as both Rater and Senior Rater

***

## Senior Rater Comments Prompt Template

Copy everything below the line into your AI tool:

***

```
<role>
You are a senior military leader writing NCOER Senior Rater comments. Your task is to write concise, impactful comments that focus on the NCO's potential for future assignments and promotion, following AR 623-3 and DA PAM 623-3 guidelines.
</role>

<writing_rules>
Senior Rater comments must:
- Focus on POTENTIAL, not just past performance
- Include peer comparison/enumeration (e.g., "#1 of 5 SSGs I senior rate")
- Be concise (4-5 lines maximum)
- Include specific recommendations for:
  * Promotion timing (now, ahead of peers, with peers)
  * Education (ALC, SLC, MLC, civilian education)
  * Future assignments (leadership positions, broadening)
- Use confident, assertive language
- Quantify ranking when possible ("top 5%", "top 10%")
- End with a clear promotion recommendation
</writing_rules>

<variables>
MOS: [e.g., 11B, 35F, 92Y]
Rank: [SGT/SSG/SFC/MSG]
Last Name: [LAST]
Position: [e.g., Squad Leader, Operations NCO]
Unit: [e.g., Alpha Company, 2nd Battalion]
Rating Period: [e.g., March 2024 - February 2025]
Performance Rating: [1-5, with 1 being highest]
Potential Rating: [1-5, with 1 being highest]
Enumeration: [e.g., 1 of 5, 3 of 10]
Recommended Schools: [e.g., ALC, SLC, Ranger School]
Recommended Positions: [e.g., Platoon Sergeant, First Sergeant, Drill Sergeant]
</variables>

<rater_bullets>
Paste the NCOER bullets from the Rater's section here for context:
[PASTE RATER BULLETS HERE]
</rater_bullets>

<example_comments>
Use these as reference for style, tone, and structure:

Outstanding Performance (Rating 1-2):
"SFC Doe is one of the absolute best SFCs on Fort Liberty and easily in the top 10% of NCOs I have worked with in 31 years. Her professional acumen, command presence, and leadership made an immeasurable impact to the success of the Command Group and Fort Liberty. Select for Master Sergeant now and send to MLC. Soldiers need her leadership!"

"SSG Brooks is 1 of 3 Staff Sergeants I currently senior rate. He is an outstanding NCO that consistently performs above standard and achieves outstanding results. Brooks has top-notch technical abilities key for mission support and is ready for increased responsibility. Continue to place in tough, demanding leadership jobs. SSG Brooks is a must select for promotion."

"SGT Davis's potential as an NCO and Squad Leader is unmeasurable. He is, by far, the #1 of 3 squad leaders that I senior rate. SGT Davis has the knowledge and work ethic to be an outstanding Squad Leader or Section Sergeant. Continue to challenge this NCO with greater responsibilities. Send to ALC immediately and promote ahead of peers."

"An exceptional NCO and easily in the top 10% of all NCOs I rate. Ready to assume greater responsibilities. Capable of overseeing major operations while coordinating mission critical tasks. Communicates a clear vision to subordinates and peers and fosters a command team spirit. Promote to Sergeant First Class now."

Good Performance (Rating 3):
"SSG Garcia is an organized and disciplined leader, addressing situations with tenacity and zeal. His commitment to the organization is what others should emulate. Challenge with greater responsibilities and promote to Sergeant First Class with peers."

"SSG Elizondo ranks 1 of 4 Staff Sergeants I currently senior rate. He is a top notch NCO who expects and enjoys a challenge. A self-starter who identifies problems early and develops strategies to address them. New soldiers and officers look to him for guidance. Promote to Sergeant First Class."
</example_comments>

<task>
Based on the variables and rater bullets provided, write Senior Rater comments that:

1. Open with a strong statement about the NCO's overall quality and ranking
2. Highlight 1-2 key strengths that demonstrate future potential
3. Include peer comparison/enumeration
4. Recommend specific schools and future positions
5. Close with a clear, confident promotion recommendation
6. Stay within 4-5 lines

Match the tone to the performance/potential ratings provided.
</task>
```

***

## Prompt by Rating Level

### For Outstanding NCOs (Rating 1)

```
<role>
You are a senior military leader writing NCOER Senior Rater comments for an exceptional NCO who deserves immediate promotion.
</role>

<context>
Rank/Name: [RANK LAST]
Position: [Position]
Enumeration: #1 of [X] [Rank]s I senior rate
</context>

<achievements>
[Paste key bullets or achievements]
</achievements>

<task>
Write Senior Rater comments (4-5 lines) that:
- Emphasize this NCO is the BEST you've rated
- Use superlatives appropriately ("finest," "best," "exceptional")
- Include quantified peer comparison ("top 1%", "#1 of X")
- Recommend immediate promotion: "Promote NOW," "Must select"
- Recommend challenging assignments and advanced schooling
- Convey urgency: the Army needs this leader in higher positions

Tone: Enthusiastic, confident, unequivocal recommendation.
</task>
```

### For Strong NCOs (Rating 2)

```
<role>
You are a senior military leader writing NCOER Senior Rater comments for a highly qualified NCO ready for promotion.
</role>

<context>
Rank/Name: [RANK LAST]
Position: [Position]
Enumeration: [X] of [Y] [Rank]s I senior rate
</context>

<achievements>
[Paste key bullets or achievements]
</achievements>

<task>
Write Senior Rater comments (4-5 lines) that:
- Highlight consistent excellence and readiness for more responsibility
- Include peer comparison ("top 10%", "exceeds peers")
- Recommend promotion "ahead of peers"
- Suggest specific future positions and schooling
- Emphasize reliability and mission impact

Tone: Confident, strong recommendation without superlatives reserved for #1 performers.
</task>
```

### For Solid NCOs (Rating 3)

```
<role>
You are a senior military leader writing NCOER Senior Rater comments for a competent NCO who meets standards.
</role>

<context>
Rank/Name: [RANK LAST]
Position: [Position]
Enumeration: [X] of [Y] [Rank]s I senior rate
</context>

<achievements>
[Paste key bullets or achievements]
</achievements>

<task>
Write Senior Rater comments (4-5 lines) that:
- Acknowledge solid performance and potential
- Focus on specific strengths
- Recommend promotion "with peers"
- Suggest developmental assignments or schooling
- Maintain professional, supportive tone

Tone: Professional, balanced—acknowledges value while leaving room for growth.
</task>
```

### For NCOs Needing Improvement (Rating 4-5)

```
<role>
You are a senior military leader writing NCOER Senior Rater comments for an NCO who needs improvement or is not recommended for promotion.
</role>

<context>
Rank/Name: [RANK LAST]
Position: [Position]
Specific Issues: [Areas requiring improvement]
</context>

<task>
Write Senior Rater comments (4-5 lines) that:
- Clearly state areas requiring improvement
- Are factual and objective (avoid subjective characterizations)
- Do NOT recommend promotion at this time
- Suggest specific developmental actions
- Maintain professional dignity

Required: Address the specific performance deficiency that led to this rating.

Tone: Direct, professional, constructive—focused on facts and development.
</task>
```

***

## Prompt for Improving Existing Comments

```
<role>
You are a military writing editor specializing in NCOER Senior Rater comments.
</role>

<task>
Review and improve the following Senior Rater comments. Ensure they:
- Focus on potential, not just past performance
- Include peer comparison/enumeration
- Have a clear promotion recommendation
- Stay within 4-5 lines
- Use confident, active language
- Comply with AR 623-3 guidance
</task>

<original_comments>
[Paste your draft comments here]
</original_comments>

<output_format>
Provide:
1. Revised comments
2. Specific changes made and why
3. Any regulatory concerns addressed
</output_format>
```

***

## Chain-of-Thought Prompt for Complex Evaluations

For NCOs with mixed performance or unusual circumstances:

```
<role>
You are a senior military leader preparing NCOER Senior Rater comments for an NCO with a complex evaluation situation.
</role>

<context>
Rank/Name: [RANK LAST]
Position: [Position]
Rating Period: [Dates]
Performance Rating: [1-5]
Potential Rating: [1-5]
</context>

<situation>
[Describe the complexity: mixed performance, developmental needs, extenuating circumstances, etc.]
</situation>

<achievements>
[List positive contributions]
</achievements>

<areas_for_growth>
[List areas needing development]
</areas_for_growth>

<task>
Think through this step by step:

Step 1: Assess the overall balance of performance vs. potential.

Step 2: Determine the appropriate tone (supportive, developmental, cautionary).

Step 3: Identify 1-2 strengths to highlight.

Step 4: Determine an appropriate promotion recommendation that matches the ratings.

Step 5: Draft comments that are honest, balanced, and constructive.

Step 6: Review for regulatory compliance and appropriate length.

Show your reasoning, then provide the final Senior Rater comments (4-5 lines).
</task>
```

***

## Writing Tips

| Do | Don't |
|----|-------|
| Focus on potential | Rehash Rater bullets |
| Use enumeration (#1 of 5) | Use vague rankings |
| Recommend specific schools | Leave development vague |
| Match tone to rating | Over-praise marginal performers |
| Be concise (4-5 lines) | Write paragraphs |
| Use confident language | Hedge or qualify unnecessarily |

***

## Related Resources

- [AI Prompting Guide](/ai-ml/ai-prompting) - Advanced prompting techniques
- [Army Evaluation Resources](/general/army-evaluation-resources) - Full NCOER/OER guidance
- [Award Bullet AI Prompt Template](/ai-ml/award-bullet-ai-prompt-template) - Award citation prompts
- [AI Resources](/ai-ml/ai-resources) - LLM tools and platforms
- [DA PAM 623-3](http://thenewoer.com/presentation_content/external_files/DA%20Pam%20623-3%20Dated%2031%20March%202014.pdf) - Official evaluation guidance
