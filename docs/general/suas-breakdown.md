---
title: "SUAS Breakdown"
---

# SUAS Breakdown

1. small Unmanned Aerial Systems
An unmanned aerial vehicle (UAV) or unmanned aircraft system (UAS), commonly known as a drone, is an aircraft with no human pilot, crew, or passengers onboard, but rather is controlled remotely or is autonomous.

### Terms

- **Unmanned aircraft**: The term "unmanned aircraft" means an aircraft that is operated without the possibility of direct human intervention from within or on the aircraft.

- **Unmanned aircraft system**: The term "unmanned aircraft system" means an unmanned aircraft and associated elements (including communication links and the components that control the unmanned aircraft) that are required for the operator to operate safely and efficiently in the national airspace system.

- **Small unmanned aircraft**: The term "small unmanned aircraft" means an unmanned aircraft weighing less than 55 pounds, including the weight of anything attached to or carried by the aircraft.

- **ESAD**: Electronic Safe and Arm Device - a critical safety component used in an ordnance system, not specific to UAS. Provides electronic control of arming and firing functions with multiple safety interlocks.

- **ESAF**: Electronic Safe Arming and Fire - legacy term more commonly used in UK contexts than ESAD. Both ESAD and ESAF are fundamental safety features in an ordnance system, ensuring proper arming sequences and preventing accidental detonation.

- **ELRS**: ExpressLRS – a low-latency, long-range radio protocol that transmits control inputs and optionally telemetry (like battery voltage, GPS, etc.)

- **LRS**: Long Range System used to maintain command & control links over 10–30+ km

- **ESCs**: Electronic Speed Controllers

- **FPV**: First Person View

- **IMU**: Inertial Measurement Unit

- **GPS**: Global Positioning System

- **GNSS**: Global Navigation Satellite System

- **VTX**: Video Transmitter

- **RX**: Receiver

- **FC**: Flight Controller

- **OSD**: On-Screen Display

- **SBS**: Soldier Borne Sensor

- **GCS**: Ground Control Station

- **Pixel Lock**: A computer-vision-based target-tracking mode found in advanced FPV and autonomous small UAS. Once the operator designates a subject (person, vehicle, structure, etc.), the onboard AI locks onto the target’s pixel representation in the video feed, continuously tracking it—even if GPS or radio communications are lost.

### UAS Groups

| Group | Weight | Alt | Speed | DoD Label | Common Roles | Examples |
|-------|--------|-----|-------|-----------|--------------|----------|
| microUAS/SBS | < 0.55 lb | < 100 ft AGL | < 30 kt | Army SBS | Individual soldier ISR, pocket/nano UAS | Black Hornet |
| Group 1 | 0 – 20 lb | < 1,200 ft AGL | < 100 kt | Small sUAS | Platoon ISR, FPV-strike, point recon | RQ-28A SRR, DJI Mavic 3 |
| Group 2 | 21 – 55 lb | < 3,500 ft AGL | < 250 kt | Small sUAS | Company/Bn ISR, light kinetic, precision resupply | RQ-11 Raven, RQ-20 Puma, ScanEagle |
| Group 3 | 56 – 1,320 lb | < 18,000 ft MSL | < 250 kt | Large sUAS | Bn/brigade ISR, hybrid-VTOL cargo, comms relay | YRQ-30A, RQ-7 Shadow, V-BAT |
| Group 4 | > 1,320 lb | < 18,000 ft MSL | Any | Tactical UAS | Armed ISR, EW, extended-range strike | MQ-1C Gray Eagle, MQ-8B Fire Scout |
| Group 5 | > 1,320 lb | > 18,000 ft MSL | Any | Strategic UAS | HALE ISR/strike, deep-strike, maritime patrol | MQ-9 Reaper, RQ-4 Global Hawk |

1. sUAS Components

### sUAS — Core Flight Hardware (Must Have)

| Sub-system | Key parts | Why it's indispensable |
|------------|-----------|------------------------|
| Airframe / Structure | Frame plates or fuselage; arms/booms; landing skids/bumper | Holds everything together and sets thrust line / CG |
| Propulsion | Brushless motors (2205–2807 KV); matching propellers; ESCs (20–60 A, BLHeli-32) | Converts electrical energy into thrust and steering authority |
| Energy | Li-Po/Li-ion battery pack (4 S–6 S) / hybrid or fuel engine | Powers all onboard systems; sets endurance ceiling |
| Flight-control brain | IMU-equipped flight controller; GPS/GNSS module; barometer; magnetometer | Runs autopilot firmware; fuses sensor data; closes control loops |
| C2 / Telemetry | RC receiver (ELRS, Crossfire, DJI OcuSync); datalink radio; antennas | Operator commands in, health & video out |
| Power distribution | XT60/XT90 lead; silicone-insulated loom; power-distribution board | Safely routes high-current battery output to ESCs & avionics |
| Optional | FPV / EO-IR camera; video TX; companion computer; payload mount | Adds ISR or strike capability |

### Fielded Configurations (Ukraine 2023–25)

| Component | COTS Quad (DJI Mavic 3) | FPV Kamikaze (DIY 5″–7″) | Stick-frame Improvised |
|-----------|-------------------------|--------------------------|------------------------|
| Frame | Injection-moulded, folding arms | 5–7″ carbon X-frame | Pine / bamboo sticks; zip-ties |
| Motors | Integrated in arm | 2306 / 2307 / 2807 6S outrunners | Cheap 2306 1900 KV sets |
| Propellers | Folding 9–9.4″ 2-blade | 5–7″ tri-blade poly-carbonate | Any 5″ nylon/carbon pair |
| ESCs | Integrated 4-in-1 | 45–60 A BLHeli-32 (singles or 4-in-1) | Same, heat-shrunk to stick arm |
| Battery | Smart 4S 5000 mAh Li-Po (≈77 Wh) | 6S 1300–1800 mAh Li-Po | Recycled 6S or parallel tool packs |
| FC firmware | DJI proprietary | Betaflight / iNav or ArduPilot | Same on low-cost F722 boards |
| RC / Video | DJI OcuSync 2.4 / 5.8 GHz | ExpressLRS RX + 5.8 GHz 1W VTX | Crossfire or ELRS; VTX taped on |
| Typical payload | 4K gimbal cam; grenade drop-mod | 3D-printed nose with PG-7V or 40mm HEDP; ESAD PCB | Stick spear, thermite charge |

### Why Each Piece Matters

- **Propellers** – diameter + pitch must suit motor KV & voltage; wrong combo causes brown-outs or stalls.

- **Motors** – 2306/07 outrunners deliver ≈1 kg thrust each on 6 S × 5″ props (enough for 0.5 kg warhead 15–20 km).

- **ESCs** – BLHeli-32 flashed to 48 kHz reduces acoustic signature.

- **Frame material** – carbon = rigid & low-RF; wood sticks are cheap, radar-transparent, disposable.

- **Battery chemistry** – 6 S packs give power head-room for high-g dive-attacks.

- **ELRS / Crossfire** – sub-gram RXs, 10–20 km L-o-S, frequency-hopping anti-jam.

- **ESAD add-ons** – simple MOSFET safe/arm PCB triggered by spare FC output; dual-command logic prevents accidental detonation.

### Minimal Shopping List

## Four brushless motors + matching props

## Four ESCs (or one 4-in-1 board)

## Li-Po battery + XT60 lead

## Basic frame (sticks, carbon, or 3-D-printed)

## Flight-controller stack w/ IMU + GPS puck

## RC receiver & antennas

## Power-distribution harness & wiring

1. *Optional:* FPV camera + VTX, payload mount, ESAD module if carrying explosives

### Roles Involving sUAS
;Pilot / Operator
: Directly controls the aircraft (manual, semi-autonomous, or autonomous modes) and executes the mission profile.
;Payload / Sensor Operator
: Manages cameras, ISR sensors, or munitions; responsible for target acquisition, release, or data capture.
;Mission Planner
: Builds flight plans, waypoints, geofences, and contingency procedures; uploads mission data to the FC/GCS.
;Launch & Recovery Crew
: Handles physical launch methods (hand-launch, bungee, catapult, VTOL spool-up) and safe recovery or retrieval.
;Maintenance Technician
: Performs pre-flight checks, field repairs, firmware updates, battery health monitoring, and post-flight inspections.
;ESAD Armorer
: Implements Electronic Safe-and-Arm procedures for any explosive payload; verifies dual-command logic before arming.
;Data Analyst / Intelligence Cell
: Processes collected imagery/telemetry into actionable intelligence or battle-damage assessments.
;Instructor / Standardization Pilot
: Trains crews, maintains SOPs, and ensures compliance with regulatory and tactical standards.

### References


[Systems]
