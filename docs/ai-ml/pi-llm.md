---
title: "Pi-llm"
---

# Pi-llm

## Pi Language Model Project

### Overview
The Pi Language Model Project involves innovatively using a software decoder, a Large Language Model (LLM), and various data analysis techniques to create an offline ADS-B tracker. This system was designed to automate aircraft tracking without robust GPS, data, or upper transmission capabilities. Utilizing just a 1090 MHz antenna with line-of-sight (LOS), the system can cover most of the battlespace, allowing for monitoring aircraft in the conflict zone and identifying military flights. The lack of flights near the battlespace could indicate incoming fires or other significant tactical movements.

### Technical Details

### ADS-B Signal Processing
The project starts with the reception of ADS-B signals, which are processed using a custom software decoder. These signals provide real-time data on aircraft positions, which are crucial for the tracking and analysis conducted by the project.


### Large Language Model (LLM) Integration
After decoding, the ADS-B data logs are fed into a Large Language Model (LLM). The LLM is tasked with outputting identifiers and plotting these over time. This process involves complex data analysis, including the combination of radar data and other unspecified information to enrich the ADS-B data. This enriched data could include flight plans, ear locations, and analysis on tactics, techniques, and procedures (TTPs).


### Data Analysis and Visualization
The system automates the tracking of aircraft by analyzing data in 10-minute intervals. It identifies military flights and assesses the tactical situation by noting the absence of flights in certain areas. The LLM prompts are designed to analyze given limitations, such as aircraft capabilities and positions, to predict their operational reach.


### Integration with Tactical Systems
The project also explores the integration of this data with tactical systems through plugins or servers, such as IJBCP or TAK, to enhance its utility in rugged environments. Additionally, the project has considered the use of sim modems and LoRa (Long Range) technology for remote data access and integration with solar power for autonomous operation.


### Hardware and Software Setup
The hardware setup includes a Raspberry Pi 4 running the LLM, combined with a custom ADS-B receiver, potentially augmented with a LoRa transmitter for remote data pull. The software stack involves using an off-the-shelf LLM solution, specifically a trimmed version adapted for efficient performance on the Raspberry Pi hardware. This setup emphasizes ease of installation and maintenance, with automated server installations for quick resets if necessary.


### Future Directions
The project has explored adding microphone and automatic transcription capabilities to extend its utility to radio communications. This development aims at further automating the analysis and intelligence-gathering processes in field operations.

### Conclusion
The Pi Language Model Project represents a significant step forward in leveraging AI and machine learning technologies for tactical and strategic advantage in military operations. By combining ADS-B data with advanced data analysis and visualization techniques, the project offers a novel approach to aircraft tracking and tactical assessment without the need for extensive hardware or high-bandwidth data connections.
