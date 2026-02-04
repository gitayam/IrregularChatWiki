---
title: "Guide to Unmanned Systems"
---

# Guide to Unmanned Systems

## Regulatory Updates (January 2026)

**FCC Exempts Certain UAS from "Covered List"**

On January 7, 2026, the Federal Communications Commission (FCC) issued a Public Notice (DA 26-22) updating the "Covered List" to exempt specific Uncrewed Aircraft Systems (UAS) and their critical components. This follows a broader December 2025 decision that had restricted foreign-produced UAS.

**Key Exemptions:**
1.  **Blue UAS Cleared List:** UAS and components on the Defense Innovation Unit’s (DIU) [Blue UAS Cleared List](https://www.diu.mil/blue-uas).
2.  **"Domestic End Product" Compliant:** UAS and components that meet the [Buy American Act](https://www.acquisition.gov/far/25.101) standard (48 CFR § 25.101(a)) for domestic manufacturing.

These exemptions allow manufacturers of qualifying secure and domestic drones to continue seeking FCC equipment authorization until **January 1, 2027**.

**Documents:**
*   [FCC Public Notice: Exemption for Certain UAS (PDF)](/documents/fcc-covered-list-exemption-notice-2026-01-07.pdf)
*   [FCC News Release & FAQs](https://www.fcc.gov/document/fcc-updates-covered-list-exempt-certain-drones-and-releases-faqs)

## Leader's Guide to Unmanned Systems

Return back to [Unmanned Systems](/general/unmanned-systems)

### Training for Subordinates

### Unmanned Systems: Dealing with Vendors

This section is not intended to call out any specific vendor but to help leaders identify attributes and aspects that have been problematic in the past.

> [insert unit org or other] requires an unmanned system that ensures modularity and open architecture for easy modifications and upgrades, with capabilities such as auto-frequency switching and hardened GPS-Rx for robust operation against jamming. The system must be day/night capable, support swappable communication modules, and run on a non-proprietary operating system and backend to avoid vendor lock-in and ensure compatibility. The imaging system should be shutterless for continuous capture, and the design must be built-for-purpose, tailored to [insert specific mission needs]. Maintenance and repair should be feasible in-house, with minimal reliance on vendor-specific services. The system must demonstrate proven performance in challenging environments and be equipped with effective security measures against electronic warfare threats.

### SWaP-C Comparison Table for Unmanned Systems

**SWaP-C**: Size, Weight, Power, Cost

| Model | Size | Weight | Power | Cost | Point of Contact | Remarks |
|-------|------|--------|-------|------|------------------|---------|
| Model A | | | | | | |
| Model B | | | | | | |
| Model C | | | | | | |
| Model D | | | | | | |
| Model E | | | | | | |

**SWAP-C Table Key:**
- **Size**: Dimensions of the drone (e.g., L x W x H)
- **Weight**: Total weight of the drone including payload (in kg or lbs)
- **Power**: Power requirements and battery life (e.g., watts, hours of operation)
- **Cost**: Total cost of the drone (including maintenance and operation costs)
- **Point of Contact**: The primary contact person for the drone vendor
- **Remarks**: Additional notes or comments about the drone's performance, capabilities, and limitations.

### Key Phrases to Watch For

#### Look For (Good)

- **Modularity and Open Architecture**: Important for flexibility and ease of maintenance.
  - Example: There are commercial UUVs where overturning a screw can lead to 6 weeks of downtime and a $30,000 fix, which must be done by the vendor.
- **Auto-frequency Switching**: Indicates advanced capability for frequency management.
- **Hardened GPS-Rx**: Suggests robustness against GPS jamming.
- **Day/Night Capable**: Implies versatility in various lighting conditions.
- **Swappable Comms**: Indicates modular communication systems.
- **Non-Proprietary OS/Back End**: Avoids vendor lock-in and promotes compatibility.
  - Easily updatable firmware, software, and a DevSecOps pipeline dedicated to continually pushing out patches… timeline of weeks, not years.
- **Shutterless**: Refers to continuous image capture capability.
- **Built-for-Purpose**: Custom solutions tailored for specific needs.
  - "comes with 5 batteries" or "runs on diesel"
  - "prisoners are using our platform to drop drugs that's how hard it is to detect"
  - "we can reconstitute faster than they can reconstitute the countermeasure" (these are the terms of the new DIB arms race!)

#### Sounds Good But...

- **GPS**: As for navigation in a GPS denied environment, it's nice to have, but I haven't seen it work too well. Buildings, city blocks, treelines, hell, whole patches of forest I have seen completely disappear over the course of a few hours.

#### Watch Out For (Bad)

- **Proprietary Systems**: Buzzwords indicating a lack of flexibility and potential vendor lock-in.
- **With enough Time and Resources we can do xyz**: Anyone could and does say this and is a pretty easy cop out to detect.
- **Unjammable UAS**: Any company claiming their UAS is unjammable.
- **Future Features**: Phrases like "*** feature to be implemented Q4".
- **Firm Fixed Cost Plus**: Potential hidden costs.
- **Special Price**: "My friend, special price for you my friend."
- **EW-proof**: Claims of being electronic warfare-proof without evidence.
- **Tested in Battlefield Conditions of Kyiv, Ukraine**: Kyiv is like bragging about being at KAIA or Bagram or Erbil, not necessarily indicative of quality.
  - "An island in the pacific." Which island? Here's a pen. Touch the map. Draw an icon. Now tell me what USCT will say.

### Questions Leaders Should Be Asking

1. How does the system ensure modularity and open architecture?
2. Can you provide examples of how the system can be easily modified or upgraded?
3. What are the specific capabilities and limitations of the system in terms of auto-frequency switching and hardened GPS-Rx?
4. Is the system day/night capable, and can you provide details on its performance in various lighting conditions?
5. Does the system support swappable communication modules?
6. Can you demonstrate the process of swapping out comms?
7. What operating system and backend does the system use?
8. Is it non-proprietary, and how easily can it be integrated with other systems?
9. Is the imaging system shutterless, and how does this benefit continuous image capture?
10. Is the system built-for-purpose, or is it designed to be a general-purpose solution?
11. Can you provide case studies where the system was used for specific missions?
12. How does the system handle maintenance and repair?
13. Are there any vendor-specific maintenance requirements?
14. Can we perform basic maintenance and repairs in-house?
15. What are the security measures in place to protect the system from electronic warfare (EW) threats?
16. How has the system been tested against EW threats?
17. Can you provide real-world examples or case studies of the system's performance in challenging environments, such as adverse weather conditions?
18. What are the total costs associated with the system, including hidden costs?
19. Are there any firm fixed cost plus arrangements?
20. What is the expected lifespan of the system, and what are the maintenance requirements over its lifespan?
21. What kind of support and service do you offer post-purchase?
22. Can you provide details on your customer support and service level agreements (SLAs)?
23. Have any of your systems been tested in battlefield conditions?
24. If so, can you provide specific locations and details on the testing environment?
25. How does this system work in the total absence of links to SVs - no GNSS, no Starlink, etc?
26. What is the CE90 of this system, under such conditions?
27. What does end-game look like for this system? How does it guide to target?

**PACOM specific use cases - Explain the concept of employment:**
- Emphasis on survival v. known threats and geopolitical realities of whatever land is involved in the CONEMP.
- What agreements do we currently have with that country?
- What have they said about their willingness to allow us to use their land in use cases that don't directly involve their own territorial integrity?

### Actions for Technical Section or Consultant to Validate SUAS Claims

- **EW Testing**: Bring in EW aggressors to attempt to break the system. Use basic TTPs found in Ukraine and see if the system passes.
- **Field Testing**: Test the system in real-world conditions, including challenging environments and battlefield conditions, to ensure reliability and performance.
- **Hardware and Software Validation**: Ensure the system's hardware and software are as barebones as possible to reduce failure points. Verify the claimed functionalities, such as GPS hardening and auto-frequency switching.
- **Signal Resilience**: Test the system's ability to operate without GPS and in the presence of signal jamming and spoofing.
- **Maintenance and Repair**: Validate that maintenance and repair can be performed in-house and are not overly reliant on vendor-specific services.
- **Cost Analysis**: Conduct a thorough cost analysis to uncover any hidden costs and verify the total cost of ownership, including maintenance and upgrades.
- **Integration Testing**: Test the integration of the system with existing technology and workflows to ensure compatibility and ease of use.
- **Performance Metrics**: Establish and measure key performance metrics, such as CE90, to validate the system's accuracy and effectiveness in various conditions.

## Ukraine Combat Lessons Learned

Based on interviews with combat veterans including [Lito](https://youtu.be/WtxqPB14pqk), a former drone team leader in 3rd Regiment Ukrainian Special Operations Forces.

### Why Ukrainian Systems Lead

Ukrainian drone technology is considered "the best in the world" due to constant battle testing and rapid iteration. Key factors:

| Factor | US/Western Approach | Ukrainian Approach |
|--------|--------------------|--------------------|
| **Development Cycle** | Years (acquisition process) | Weeks/months |
| **Testing Environment** | Simulated (Yuma, White Sands) | Active combat against peer EW |
| **Cost Priority** | Capability-first | $5,000/drone constraint |
| **Validation** | Controlled tests | Operators' lives depend on it |

### Combat-Tested Vendor Assessments

:::caution[Context]
These assessments reflect specific combat conditions in Ukraine (heavy EW, GPS denial). Systems may perform differently in other environments.
:::

| Vendor/System | Combat Assessment | Notes |
|---------------|-------------------|-------|
| **Ukrainian-built** | Effective | Constant iteration, battle-tested |
| **DJI (modified)** | Effective | Jailbroken with Chinese telemetry removed |
| **Anduril** | "Didn't work" | Per combat operators in contested environment |
| **Skydio** | "Didn't work" | May be suitable for public safety, not combat |
| **Parrot Anafi** | "Trash" | Including government version |
| **Any "jam-proof" claim** | Skeptical | "Anything wireless can be jammed by dirt" |

### Why Western Systems Struggled

Per combat veterans, US systems were built for Global War on Terror conditions:
- Radio supremacy assumed
- Logistics superiority assumed
- GPS availability assumed
- EW threat minimal

In contested Ukraine environment:
- Heavy Russian EW presence
- GPS frequently denied/spoofed
- Supply chains contested
- Peer adversary adapts quickly

### What Makes Ukrainian Systems Work

1. **Testing and Validation** - Constant real-world feedback loop
2. **Alternate PNT** - Systems designed for GPS-denied operations
3. **Rapid Iteration** - Weekly improvements based on combat results
4. **User-Driven Requirements** - Operators shape development
5. **DJI Hardware Foundation** - Superior hardware with modifications

### Recommended Actions for US Programs

From debriefs with senior military leaders:

1. **Test in Ukraine** - "Millions of dollars of free testing" vs. domestic ranges
2. **Hire Ukrainian expertise** - Bring proven operators/engineers on visa
3. **Partner with allies** - Buy from Ukraine, leverage their experience
4. **Focus on training** - US SOF reportedly get ~30 min/week stick time
5. **Prioritize secure logistics** - Supply chain is #1 challenge

### Video Reference

<div class="not-content">
<iframe width="100%" height="315" src="https://www.youtube.com/embed/WtxqPB14pqk" title="Ukraine Has the BEST Drones in the World: Lito Part IV" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

### Telltale Signs Leaders Should Be Aware Of

**Modularity and Open Architecture:**
- Commercial UUVs might have stringent vendor-dependent maintenance requirements, such as a $30,000 fix for overturning a screw, which can result in 6 weeks of downtime.
- Similar to the "John Deere problem," where maintenance and part replacements are highly controlled by the vendor.
- Around 60% of the parts in expendable UUV electronics are sourced from the air market to allow resourcing and repurposing from the air wing depot.
- Lack of knowledge or focus on robotics/theory by company leadership, instead emphasizing product and marketing.
- High turnover of solid engineers, often due to leadership losing focus on the product.

**Actionable Insight**: Consider hiring an OSINT professional to investigate why ex-employees left the company. Even with potential negativity bias, this can provide significant insights into the company's problems.

- Potential impacts of regulatory changes, such as the upcoming FTC non-compete dismissal, which might reveal underlying issues within companies.

**Red Flags:**
- No mention of how the system will prevail against EW. Reliance on having a signal in an unknown/future environment.
- Anything in a tube: Expensive and can't be easily modified, leading to an inability to adapt post-manufacture.
- Testing environments where failure is bad for someone's career: If designed to look good or demonstrate readiness, it's a bad sign. If nobody invites EMS aggressors to try and stop it, it's a bad sign. If there's a grandstand with FOGOs watching, that's a demonstration - not a test.
