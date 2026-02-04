---
title: "Unmanned Systems"
---

# Unmanned Systems

Small unmanned aerial systems (sUAS), counter-UAS, FPV operations, and autonomous robotics resources for defense and civilian applications.

## Getting Started

| Resource | Description |
|----------|-------------|
| [sUAS Breakdown](/general/suas-breakdown) | Components, terminology, and UAS groups |
| [FPV sUAS Guide](/general/fpv-suas) | First-person view flying fundamentals |
| [Guide to Unmanned Systems](/general/guide-to-unmanned-systems) | Leader's guide for vendor evaluation |

## Community Resources

- **Forum**: [Shared Unmanned Systems Files and Briefs](https://forum.irregularchat.com/t/shared-unmanned-systems-access-files-and-briefs/257)
- **Chat**: Open to all enthusiasts of robotics, sUAS, and fabrication

### Vets to Drones

[Vets to Drones](https://vetstodrones.org) is a community member-run program (Chris L.) that helps veterans and active duty service members get their FAA Part 107 certification and connect with other drone operators worldwide.

:::tip[How to Join]
1. **Register** at [VetsToDrones.org](https://vetstodrones.org) and verify your veteran/active duty status
2. **Access the Portal** at [Portal.VetsToDrones.org](https://portal.vetstodrones.org) after verification

The portal is a private ecosystem where verified vets can connect, share resources, and network with other drone operators from anywhere in the world.
:::

## sUAS Guides

### Operator Resources

| Guide | Description |
|-------|-------------|
| [sUAS Breakdown](/general/suas-breakdown) | Components, terms, UAS groups, fielded configurations |
| [FPV sUAS](/general/fpv-suas) | First-person view flying, equipment, drills |
| [Operator Licensing](/general/suas) | FAA Part 107 and military licensing |
| [Operating Conditions](/general/suas-operating-conditions) | Weather, airspace, and operational factors |

### Leadership Resources

| Guide | Description |
|-------|-------------|
| [Guide to Unmanned Systems](/general/guide-to-unmanned-systems) | Vendor evaluation, key questions, red flags |
| [Guide to Countering Unmanned Systems](/general/guide-to-countering-unmanned-systems) | Counter-UAS technologies and TTPs |
| [Guide to Drone Deployment in Disaster Relief](/general/guide-to-drone-deployment-and-coordination-in-disaster-relief) | Civilian UAS coordination |

## UAS Classification

| Group | Weight | Altitude | Speed | Examples |
|-------|--------|----------|-------|----------|
| microUAS/SBS | < 0.55 lb | < 100 ft AGL | < 30 kt | Black Hornet |
| Group 1 | 0 – 20 lb | < 1,200 ft AGL | < 100 kt | RQ-28A SRR, DJI Mavic 3 |
| Group 2 | 21 – 55 lb | < 3,500 ft AGL | < 250 kt | RQ-11 Raven, RQ-20 Puma, ScanEagle |
| Group 3 | 56 – 1,320 lb | < 18,000 ft MSL | < 250 kt | YRQ-30A, RQ-7 Shadow, V-BAT |
| Group 4 | > 1,320 lb | < 18,000 ft MSL | Any | MQ-1C Gray Eagle, MQ-8B Fire Scout |
| Group 5 | > 1,320 lb | > 18,000 ft MSL | Any | MQ-9 Reaper, RQ-4 Global Hawk |

## Counter-UAS

- [Counter-UxS](/general/counter-uxs) - Anti-drone defense technologies and techniques
- [Guide to Countering Unmanned Systems](/general/guide-to-countering-unmanned-systems) - Comprehensive C-UAS guide

### Counter-UAS Frameworks

| Framework | Description |
|-----------|-------------|
| G4 (Generate, Grab, Guide, Grenade) | AI-assisted human-in-loop C4ISR kill chain |
| F3EAD | Find, Fix, Finish, Exploit, Analyze, Disseminate |
| Legacy | Detect, Identify, Track, Defeat/Destroy |

## Combat Lessons Learned (Ukraine)

Based on interviews with combat drone operators and advisors, including [Lito Villanueva's Drone Wars Podcast interview](#ukraine-has-the-best-drones-in-the-world---lito-villanueva).

### Why Ukrainian Drones Lead the World

| Factor | Description |
|--------|-------------|
| **Battle Testing** | Constant iteration against peer adversary with advanced EW |
| **Necessity-Driven Innovation** | Built homegrown industry when Western weapons were unavailable |
| **Rapid Adaptation** | Weekly/monthly iteration cycles vs. years for Western programs |
| **Cost Efficiency** | $5,000/drone target drives innovation under constraint |
| **DJI Modifications** | Jailbreaking, desoldering Chinese telemetry, chimera chips |

### What Works vs. What Doesn't

**Effective in Ukraine:**
- Ukrainian-built systems with constant combat iteration
- Modified DJI platforms (jailbroken, telemetry removed)
- Systems designed for GPS-denied, EW-contested environments
- Alternate PNT (Position, Navigation, Timing) solutions

**Ineffective in Ukraine (per combat operators):**
- Anduril systems - "didn't work" in contested environment
- Skydio - "didn't work" for combat ops (better for public safety/surveillance)
- Parrot Anafi (including government version) - "trash"
- Any system claiming to be "jam-proof" or "EW-proof"

:::caution[Context Matters]
These assessments reflect specific combat conditions in Ukraine (heavy EW, GPS denial, peer adversary). Systems may perform differently in other environments.
:::

### Training Reality

US special operations forces reportedly receive ~30 minutes/week of stick time - far below combat requirements. Ukraine's approach:

- **Build & Fly Classes**: Operators learn to build, repair, and fly
- **Dedicated Drone Corps**: Department-level organization (like Space Force)
- **SWORD Model**: Special Operations Robotics Detachment - broader than just drones

### Key Recommendations from Combat Veterans

1. **Secure logistics and supply chain** - #1 priority
2. **Training adoption** - only way to integrate drones into operations
3. **Combined arms maneuver** - integrate drones into existing tactics, don't replace humans
4. **Test in Ukraine** - millions of dollars of free validation vs. Yuma/White Sands
5. **Buy from allies** - consider Ukrainian systems and expertise

## FPV Operations

### Equipment

| Category | Recommendations |
|----------|-----------------|
| Radio Controller | RadioMaster Boxer with ELRS |
| Goggles | HDZero Race Bundle, DJI Goggles 2 |
| Drones | Tiny Whoops (1S) for learning, ProTek35 for outdoor |
| Training | Liftoff, Velocidrone simulators |

### Training Drills

**Beginner**: Box Pattern, Hovering, Figure 8s, Slow & Hover

**Advanced**: Orbits, Shooting Gaps, Fixed-Bearing Decreasing-Range, FPV Tag

See: [FPV sUAS Guide](/general/fpv-suas)

## Fabrication & DIY

- [Fabrication](/hardware/fabrication) - 3D printing and manufacturing
- [3D Printer Recommendation](/hardware/3d-printer-recommendation) - Community-recommended printers
- [Fabrication: Getting Started with CAD](/hardware/fabrication-getting-started-with-cad) - CAD software guides

## Policy & Doctrine

### Army Publications

| Publication | Description |
|-------------|-------------|
| [TC 3-04.62](https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/tc3_04x62.pdf) | Small Unmanned Aircraft System Aircrew Training Program |
| [AR 95-1](https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN5966_AR_95-1_WEB_FINAL.pdf) | Aviation Flight Regulations |
| [STP 19D Guide](https://armypubs.army.mil/ProductMaps/PubForm/Details.aspx?PUB_ID=1021490) | Cavalry Scout MOS 19D Skill Level 1 |

### FAA Resources

- [FAA UAS FOIA Electronic Reading Room](https://www.faa.gov/foia/electronic_reading_room/uas)
- [Drone Advisory Committee eBook](https://www.faa.gov/sites/faa.gov/files/uas/programs_partnerships/advanced_aviation_advisory_committee/previous_dac_meetings_and_materials/DAC_Public_eBook_06_23_2021.pdf)

### Other Resources

- [Company UAS Operations Excellence Guide](https://www.moore.army.mil/armor/eARMOR/content/issues/2016/JUL_SEP/3Albert16.pdf)
- [Missile Technology Control Regime FAQ](https://www.mtcr.info/en/faq)
- [US MTCR Reinterpretation](https://www.armscontrol.org/act/2020-09/news/us-reinterprets-mtcr-rules)

## Key Terms

| Term | Definition |
|------|------------|
| ESAD | Electronic Safe and Arm Device - safety component for ordnance |
| ELRS | ExpressLRS - low-latency, long-range radio protocol |
| FPV | First Person View |
| GCS | Ground Control Station |
| IMU | Inertial Measurement Unit |
| Pixel Lock | AI-based target tracking via video feed |
| SBS | Soldier Borne Sensor |
| VTX | Video Transmitter |

## Videos & Training

### Ukraine Has the BEST Drones in the World - Lito Villanueva

Lito Villanueva is a U.S. Air Force veteran who served as a combat drone pilot and team leader for a drone team in 3rd Regiment Ukrainian Special Operations Forces. This interview covers critical lessons learned from the Ukraine conflict.

<div class="not-content">
<iframe width="100%" height="315" src="https://www.youtube.com/embed/WtxqPB14pqk" title="Ukraine Has the BEST Drones in the World: Lito Part IV" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

**Key Topics Covered:**
- Why Ukrainian drone tech is "the best in the world" - constant iteration and battle testing
- DJI hardware superiority and Ukrainian jailbreaking/modification techniques
- Testing and validation vs. Western systems built for GWOT
- Combined arms maneuver with drones
- Training requirements (US SOF getting inadequate stick time)
- AI's near-term value: coordination software, not autonomous kinetic strike
- Indo-Pacific preparation and partnership strategies

:::tip[Source]
[Drone Wars Podcast](https://www.youtube.com/@DroneWarsPodcast) - Lito Part IV (Feb 2026)
:::

### 2-508 sUAS Lessons Learned

<div class="not-content">
<iframe width="100%" height="315" src="https://www.youtube.com/embed/a5-i1HUWQKc" title="2-508 sUAS Lessons Learned" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### More Training Videos

| Video | Description |
|-------|-------------|
| [Calling for Fire](https://www.youtube.com/watch?v=RtezbxukS6A) | Using AirPods for fire missions (see 22:45) |
| [2-508 sUAS Lessons Learned](https://www.youtube.com/watch?v=a5-i1HUWQKc) | Unit lessons learned |
| [Joshua Bardwell's Channel](https://www.youtube.com/channel/UCX3eufnI7A2I7IkKHZn8KSQ) | FPV tutorials and reviews |

## Related Pages

- [AI & Autonomy](/ai-ml/) - AI/ML for autonomous systems
- [RF/SDR/Communications](/radio/) - Radio and communications
- [Information Warfare](/general/information-warfare) - ISR and targeting
