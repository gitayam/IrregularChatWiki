---
title: "BOOM"
---

# BOOM

1. sUAS Munitions and Explosives
This page details the types, configurations, and effects of munitions and explosives integrated with small Unmanned Aerial Systems (sUAS), with a focus on improvised and semi-formal systems used in the Russo-Ukrainian war from 2022–2025. It includes insights from official military frameworks and OSINT analysis.

["EXPLOSIVE DEVICES FOR UNPILOTED LETHAL VEHICLES"](https://u.pcloud.link/publink/show?code=XZTh2j5ZOzmvlUSIbLYQbwrTyWEyKRl2abPX) contains a lot of information on the types of explosives and munitions used in sUAS in the right against Russia by Ukrainian Forces.

### Terms

- **ESAD**: Electronic Safe and Arm Device — Controls firing sequence electronically with safety interlocks.

- **ESAF**: Electronic Safe Arm and Fire — Legacy British term, interchangeable with ESAD in most contexts.

- **HME**: Homemade Explosives — Any non-commercial explosive synthesized from precursors, typically for DIY or non-state applications.

- **COTS**: Commercial Off The Shelf — Readily available, mass-market components, often repurposed for military use.

- **F&DR**: Fielding and Deployment Release — A formal approval for military use of a system or munition.

- **DEVCOM Audible**: A U.S. Army-developed dropper platform enabling safe release of Army-issued munitions via sUAS.

### Munition Types Used in sUAS

| Munition Type | Description | Common Deployment | Observed Effects |
|---------------|-------------|-------------------|------------------|
| PG-7V warhead | Rocket-propelled grenade (shaped charge, anti-armor/HEAT) | FPV drone front-load | Armor penetration, structural destruction. See [RPG-7 archive](https://web.archive.org/web/20250605032724/https://en.wikipedia.org/wiki/RPG-7) |
| OG-7 warhead | Rocket-propelled grenade (fragmentation, anti-personnel) | FPV drone front-load | Wide-area blast and fragmentation, highly lethal to exposed personnel |
| VOG-17 / VOG-25 | 40 mm grenade (airburst/impact) | Servo-drop mod or breakaway mount | Infantry suppression, light vehicle disablement |
| RGO / RGN | Soviet defensive hand grenades | Drop with fuse-delay | Fragmentation anti-personnel |
| Thermite canister | Thermite mix in metal container | Drop or crash delivery | Incendiary burn-through (fuel tanks, radomes) |
| C4 / Semtex block | Commercial/military plastic explosive | Crash-load in kamikaze drones | Focused blast, breaching |
| HME charges | AN mixtures, NM-based, poor-man's C4 | Custom DIY FPV builds | Mixed reliability; cost-effective |
| Improvised shaped charge | Metal cone with explosive liner | Nose-mounted kamikaze | Penetrative focused effect |

### Example Payload Configurations

| Drone Type | Frame/Style | Munition | Trigger System |
|------------|-------------|----------|----------------|
| FPV Kamikaze | 5–7" carbon X-frame | PG-7V / VOG-25 | MOSFET + dual-pin ESAD |
| Servo-drop DJI | DJI Mavic 3 + dropper | RGO / VOG | Servo + timer / RC switch |
| Stick drone | Wood-arm DIY | Thermite / HME | Contact or timed impact |
| Hybrid VTOL | Fixed-wing / quad | VOG bundle | Servo dropper + GPS waypoint |

### Notable Use Cases

### June 2025 – Strategic Bomber Airbase Attacks

- **Target**: Engels and Soltsy-2 airbases (Tu-95, Tu-160 bombers).

- **Tactics**: Long-range DIY drones (>600 km) using internal fuel bladders, carrying ~3 kg thermobaric or HME payloads.

- **Effects**: Confirmed airframe damage and runway disruption. Satellite imagery showed heat signatures and repair activity within 24 hours.

- **Payloads**: Believed to include ANFO or nitromethane-based charges. Use of low-metal signature airframes suggested radar evasion.

### 2023–2024: Evolution of DIY FPV Attacks

- **Initial stage**: 3D-printed nosecones for VOG-17s, dropped manually.

- **Improved stage**: Hardened nose for PG-7 warheads, with dual-signal arming logic to prevent premature detonation.

- **Safety upgrades**: Widespread adoption of ESAD-style boards in fielded FPV units. Dual-command MOSFET logic became a standard.

### Safety and Regulatory Considerations

### U.S. Army and DoD Standards

- Any modified munition or new delivery configuration requires an F&DR before deployment.

- Safety testing must validate:
  - Arming delay
  - Flight stability
  - Fail-safe logic
  - Blast radius modeling

### Civilian Context (U.S. Regulations)

- Manufacture of explosives (including HMEs) is **legal** only when:
  - Not stored or transported commercially
  - Not intended for criminal or commercial use
  - Made in compliance with ATF regs and away from public areas

### Informal Practices (Field-Level)

- Safety SOPs often include:
  - Always use dual-arm logic (RC + mechanical)
  - Avoid nitrile gloves when working with nitric acid mixes
  - Store separated precursors, not pre-mixed charges
  - Minimize metal in airframe to reduce radar signature

### Trends in Improvised Munitions

- **AN mixtures**: Low-cost, easy-to-source, high-yield.

- **Nitromethane blends**: Enhanced detonation velocity, used in combo with shrapnel canisters.

- **Poor-man's C4**: Often ETN or PETN-based, cast into putty with plasticizers.

- **Thermite**: Reliable for damaging engine blocks and electronics.

### Field Observations

- Thermal imagery shows kamikaze FPV drones deliver a downward-blast profile — suggesting shaped or contact charges.

- Ukrainian units have adopted modular payload rails, enabling plug-and-play bomb modules on the same drone chassis.

- Remote ESAD triggering via FC spare UART channels becoming standard for trained units.

### Future Considerations

- Formalization of DIY bomb-droppers via DEVCOM Audible platform could accelerate standardization.

- NATO-aligned safety certification may be introduced for partner-state UAS payloads.

- OSINT tracking of explosive effectiveness could inform future modular UAS ordinance kits.

### See Also

- [* [https://www.youtube.com/@duganashley1337 duganashley1337 youtube playlist](/general/suas)

- [Home Made Explosive Literature](https://drive.google.com/drive/folders/0B8YTArDdXJ6eYUs4Zzc0NW5hY3c?resourcekey=0-MhNPSYLgtFHG1dMiSY4pyw)

### References



