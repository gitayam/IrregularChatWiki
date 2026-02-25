---
title: "Guide to Countering Unmanned Systems"
---

import { Tabs, TabItem, Card, CardGrid } from '@astrojs/starlight/components';

# Guide to Countering Unmanned Systems

## Leader's Guide to Counter Unmanned Systems

This guide provides a comprehensive overview of Counter Unmanned Aerial Systems (C-UAS), integrating practical advice, community insights, and lessons from field operations. It emphasizes training, vendor interaction, and key considerations for leaders in the constantly evolving challenge of countering unmanned systems.

### Training for Subordinates

Effective C-UAS operations begin with well-trained subordinates. Training should cover key principles of detecting, neutralizing, and engaging unmanned threats. A layered defense is crucial, combining multiple technologies, such as radar, RF jammers, and high-powered lasers. Instructors should focus on hands-on familiarity with these systems, as well as the integration of AI and networked sensors for faster decision-making.

<CardGrid>
  <Card title="Threat Identification" icon="magnifier">
    Training subordinates to recognize both low-cost and high-tech drones, including swarm attacks and preprogrammed autonomous UAS.
  </Card>
  <Card title="System Proficiency" icon="setting">
    Ensuring that operators are comfortable with layered defense systems that combine kinetic (e.g., shotguns, missiles) and non-kinetic (e.g., RF jamming).
  </Card>
  <Card title="Tactical Guidance" icon="target">
    Emphasize offensive measures, such as targeting enemy UAS operators. Eliminating the pilot renders UAS threats inoperable.
  </Card>
</CardGrid>

:::tip[Combat Doctrine]
"At all times, if given the opportunity, kill the enemy pilot and disable their sUAS weapon systems. This concludes the counter sUAS brief."
:::

### Counter Unmanned Systems: Dealing with Vendors

When engaging vendors, leaders should prioritize systems that offer cost-effective, scalable solutions. Some systems, like the **Stargazer** series, have demonstrated strong field performance, particularly in conflict zones like Ukraine. Others, like Squarehead Technology's **FOCUS system**, show promise but could benefit from enhanced features such as higher-quality cameras.

Vendors should be able to demonstrate:

- **Scalability**: Ability to adapt to evolving threats, such as swarms or autonomous UAS.
- **Layered Capabilities**: Integration of multiple technologies, such as sensors, RF jammers, and AI-powered tracking.
- **Cost-Effectiveness**: Offering viable options for both high-end and low-cost UAS threats.

Leaders must also consider practical and unconventional tools, such as the **Defendtex Metalstorm shotgun insert** for the M320, which offers an effective kinetic solution against drones. However, the challenge of accuracy remains a significant issue for shotgun-based defenses, with opponents often likening it to shooting sporting clays or hunting birds.

### C-UAS Technology Comparison Table

| Model | Range (km) | Power (watts) | Cost (USD) | Point of Contact | Remarks |
|-------|------------|---------------|------------|------------------|---------|
| Stargazer | 6 km | 400 W | $180,000 | Vendor A | Proven in Ukraine, adaptable to different UAS threats |
| Squarehead FOCUS | 3.5 km | 320 W | $120,000 | Vendor B | Effective for smaller UAS, needs improved camera quality |
| Defendtex Metalstorm | 0.5 km | N/A | $15,000 | Vendor C | Close-range kinetic option, challenges with accuracy |

### Key Considerations

1. **Range**: The maximum effective range for detection, tracking, and engagement.
2. **Power Requirements**: Operational sustainability in field environments.
3. **Cost**: Includes both procurement and operational maintenance.
4. **Vendor Support**: Ability to upgrade and maintain systems over time.
5. **Remarks**: Performance in field trials and user feedback.

### Key Phrases to Watch For

<Tabs>
  <TabItem label="Look For (Good)" icon="approve-check">
    1. **"Layered defense approach"** – Integrating multiple technologies for a comprehensive defense.
    2. **"Low-collateral interceptors"** – Minimizes risk to non-combatants and friendly forces.
    3. **"AI-powered threat prioritization"** – Enhances decision-making speed and accuracy.
  </TabItem>
  <TabItem label="Watch Out For (Bad)" icon="warning">
    1. **"High collateral risk"** – Systems that may endanger civilian infrastructure.
    2. **"Limited effectiveness against swarms"** – Systems struggling with multiple UAS threats simultaneously.
    3. **"Excessive cost per engagement"** – Unsustainable solutions for prolonged conflict scenarios.
  </TabItem>
</Tabs>

### Vendor Evaluation Reference Sheet

Use these tabs to navigate specific categories of questions when evaluating C-UAS systems.

<Tabs>
  <TabItem label="Cost & Logistics">
    - **Total Cost of Ownership**: What is the full cost, including kits, additions, and recurring software licenses?
    - **O&M Support**: What are the estimated costs for Operations and Maintenance support?
    - **Production Capacity**: How many units can be produced and delivered within a specific timeframe?
    - **Portability**: How much does it weigh? Is it man-packable, man-portable, vehicle-mounted, or UAS/HAB-ready?
    - **Power Requirements**: Does it run on battery, shore power, or both? What are the requirements for sustained field operations?
  </TabItem>
  <TabItem label="Technical & Data">
    - **Frequency Coverage**: What specific frequencies or frequency ranges does it cover?
    - **Power Output**: How much power (wattage) does it put out for engagement?
    - **Environmental Rating**: Is the system environmentally sealed or ruggedized (IP rating)?
    - **Data I/O**: What data can it ingest or output?
    - **IQ Data**: Can it ingest, save, or output IQ data?
    - **VITA 49**: Does it support any flavor of the VITA 49 standard?
  </TabItem>
  <TabItem label="Integration">
    - **TAK Integration**: Is it compatible with TAK (Cursor on Target)? If not, why?
    - **COP Integration**: Has the system been successfully integrated into a Common Operational Picture (COP)?
    - **Net Readiness**: Does the system meet "Net Ready" requirements for your organization?
    - **Remote Operation**: Can the system be operated remotely?
    - **Connectivity**: Are the cables and connectors proprietary or industry-standard?
  </TabItem>
  <TabItem label="Architecture & Software">
    - **Logic Type**: Is it a library-based system, an RFML (Machine Learning) based system, or a hybrid?
    - **Development Environment**: Does it have an open development environment?
    - **Reprogrammability**: Is the system reprogrammable in the field by operators, or does it require proprietary vendor handling?
    - **Upgradeability**: How upgradeable are the internal components and software? (Ask for proof of modularity).
    - **Third-Party Integration**: Who are some Points of Contact (POCs) that have successfully integrated their own software or hardware on this box?
  </TabItem>
  <TabItem label="Performance & Security">
    - **Targeting Capability**: Can it affect more than one target or frequency simultaneously?
    - **Attack Modes**: What are the available attack modes (e.g., noise, timing, protocol manipulation)?
    - **Target Vectors**: Does it target C2 (Command and Control), GNSS (Navigation), and/or video links?
    - **Performance Data**: What proven performance data exists against specific UAS makes/models/groups?
    - **Security & Classification**: Does it meet specific security requirements? What classification levels (Unclassified, Secret, etc.) is it intended for and capable of operating at?
    - **Swarm Defense**: How does the system perform against large-scale swarm attacks?
  </TabItem>
  <TabItem label="Track Record">
    - **User Base**: Who currently uses this system? (Request names and contact numbers for references).
    - **Engagement Economics**: What is the total cost per engagement compared to the threat (e.g., using a $100k missile for a $500 drone)?
    - **Field Provenance**: Has this system seen combat or significant field trials?
  </TabItem>
</Tabs>

### Actions for Technical Section or Consultant to Validate C-UAS Claims

1. Verify system detection range and accuracy against different UAS types.
2. Test system's resilience and performance during sustained operations and in harsh environments.
3. Evaluate cost-effectiveness of system ammunition or power requirements in comparison to the threat.
4. Ensure integration with existing systems and compatibility with other C-UAS technologies.

### Telltale Signs Leaders Should Be Aware Of

| Sign | Implication |
|------|-------------|
| Frequent jamming failures | System may not be effective against advanced or multiple UAS threats |
| High cost per engagement | System is likely unsustainable in large-scale, prolonged conflicts |
| Overpromised capabilities by vendor | Could lead to over-investment in unproven systems |

### References

- Technology
- Unmanned Systems
- Warfare
