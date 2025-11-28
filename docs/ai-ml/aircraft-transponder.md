---
title: "Aircraft Transponder"
---

# Aircraft Transponder

Aircraft transponders exist to simplify the burdens of radar-assisted air traffic control. With military origins, they are crucial to managing not just U.S. national airspace, but airspace around the globe. While ADS-B Out is increasingly becoming the common standard that civilian enthusiasts leverage to track aircraft, traditional transponder signals remain a common detectable signature on virtually all FCC-registered aircraft.

**Why aircraft transponders exist – the differences between procedural and positive control:**

;Procedural Control
Without radar or positive line of sight in a control tower, ATC is limited to procedural control. Procedural control focuses on keeping aircraft separated in time and space; this could include common information such as airspeed (to ensure a trailing aircraft does not overtake a lead aircraft), altitude blocks, or specific containers. It is still commonly used by the Air Force and Army for controlling military aircraft during operations, particularly with regard to support to ground operations. Major drawbacks include rapidly increasing complexity as the number of aircraft or area of control increase. Aircraft operating under visual flight rules may not have any contact with controllers, making it very difficult to ensure procedural mitigations protect instrument flight-rule aircraft.

;Positive Control
Radar provides positive control. In effect, the radar can generate a 3-D positional fix for any aerial object within range. There are some factors to consider tied to Doppler shift that may be applicable in some instances. Radar acting independently of the aircraft is referred to as primary radar. Radar controllers only see that an object is located within the airspace but have no knowledge of what the aircraft/object is; certain radars may be able to provide velocity vectors (i.e., direction, speed, acceleration, and rate of climb/descent). To ease the burden on controllers, transponders were specifically developed to enable secondary surveillance. Secondary surveillance provides a variety of information such as reported altitude, transponder codes, etc.

**Understanding Transponders**

The first transponders were developed during World War II. Transponders are passive detectors of radio transmissions occurring due to primary radar surveillance. When a radio pulse is detected at the correct frequency, the transponder activates and rebroadcasts user-programmable and hard-coded data back to the ground radar site, enabling secondary surveillance. The specific data that are broadcast are based on what mode the aircraft is operating in. Civilian transponder broadcasts are all unencrypted, but certain transponder modes reserved for military use are encrypted and require a specific challenge-response from the ground radar before activating. This is specifically for EMCON reasons during combat.

**Civilian Transponder Modes of Import**

**Mode 3A** – Mode 3A is the most basic transponder code utilized by civilian aircraft. When activated, Mode 3A broadcasts a four-digit octal code to identify the flight to ATC. IFR flights typically have the code assigned as part of their IFR clearance. VFR aircraft may be assigned a unique code by ATC while receiving flight following/service from ATC. The most important IFR codes to be aware of are:

| Code | Meaning |
|------|---------|
| 1200 | Non-unique code for VFR flight rules |
| 7500 | Hijack aircraft |
| 7600 | Loss of two-way radio communications |
| 7700 | Emergency aircraft |

**Mode 3C** – Mode 3C is the same as 3A but includes altimeter-indicated altitude from the aircraft, based on field pressure or standard pressure depending on aircraft altitude. This is significant because it reduces the primary-radar processing requirements (2-D radar is enough). This is the most common setting civilian aircraft will be set to. Of note, altimeter malfunctions, or pilot error (not setting the correct altimeter setting) can result in false and misleading altitudes.

**Mode S** – Mode S is the most recent addition to aircraft altimeters and provides significantly more data in the form of short radio pulses referred to as squitters. Extended squitters under Mode S form the basis for ADS-B Out. Mode S also includes air-to-air interrogation capabilities, which underpin the Traffic Collision Avoidance System commonly installed on aircraft within the National Airspace. *Future information on Mode S will be included following the conclusion of the Irregular CTF ;)*
