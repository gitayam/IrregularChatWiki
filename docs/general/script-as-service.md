---
title: "Script-as-service"
---

# Script-as-service

## Running Scripts as Services and Scheduling Restarts with Crontab
This guide outlines how to set up Python scripts as services using `systemd`, manage scripts running within a Python environment inside a Docker container, and schedule service restarts using `crontab`. This setup ensures your scripts are always running and can automatically restart at specified intervals or in case of failure.

### Setting Up a `systemd` Service
To run a script continuously as a service, you’ll use `systemd`, a system and service manager for Linux operating systems. Here’s how to create a `systemd` service file for your script.


### Example Service File for a Standalone Script
Create a new service file in `/etc/systemd/system/`. For example, for a service named `simple.service`:

```ini
# /etc/systemd/system/simple.service

[Description=Simple Python Script Service
1. Ensures the network is available
After=network.target

[Service](Unit])
1. The type of service, 'simple' is used for continuously running applications
Type=simple

1. Command to start your script, adjust the path as necessary
ExecStart=/usr/bin/python3 /path/to/your/script.py

1. Automatically restarts the service on failure
Restart=always

1. User to run the script as
User=yourusername

1. Working directory for the script
WorkingDirectory=/path/to/your

1. Environment variables required by the script
Environment="PATH=/usr/bin"

1. Specifies where stdout and stderr are sent
StandardOutput=append:/var/log/my_script.log
StandardError=inherit

[WantedBy=multi-user.target
```

### Managing the Service

- Reload systemd, enable, and start your service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable simple.service
sudo systemctl start simple.service
```

- Check the status of your service:

```bash
sudo systemctl status simple.service
```

### Running Scripts within a Docker Container as a Service
To manage a script running within a Python environment inside a Docker container, you need to adjust the `ExecStart` command in your service file.


### Modified Service File Example
```ini

1. /etc/systemd/system/bot-service.service
[Unit](Install])
Description=Personal Bot Service Running in Docker
Requires=docker.service
After=docker.service

[Type=simple
1. Ensure '-it' is removed for non-interactive execution
ExecStart=docker exec jupyter /bin/bash -c "/opt/conda/etc/profile.d/conda.sh; conda activate bot; cd /path/to/workdir; python script.py"

Restart=always
User=yourusername

[Install](Service])
WantedBy=multi-user.target
```

### Bash Script for Docker Execution
It’s a good practice to encapsulate your Docker command in a bash script. Here’s an example `start-bot.sh` script, which activates a Conda environment and runs a Python script inside a Docker container:

```bash
#!/bin/bash

1. Initialize Conda for script use
source /opt/conda/etc/profile.d/conda.sh

1. Activate your conda environment
conda activate bot

1. Navigate to your script's directory
cd /path/to/your/work/matrix_bots/version-004/simplematrixbotlib

1. Execute your Python script, redirecting output to logs
python simple.py >> /path/to/your/logfile.log 2>&1
```

### Scheduling Service Restarts with Crontab
To ensure your services can restart at scheduled intervals, use `crontab` to manage restarts every 12 hours.


### Crontab Entries
Open your crontab for editing:

```bash
crontab -e
```
Add lines to restart your services at midnight (00:00) and noon (12:00):

```
0 0 * * '' systemctl restart simple.service
0 12 * * '' systemctl restart simple.service
0 0 * * '' systemctl restart bot-service.service
0 12 * * '' systemctl restart bot-service.service
```
This setup ensures that your Python scripts, whether running directly on your system or within a Docker container, are reliably executed as services and can automatically restart to maintain continuous operation.

---


## Preventing Duplicate Process Instances in Scripts
When deploying scripts in production environments, especially those that run continuously or are scheduled to restart periodically (e.g., via `systemd` or `cron`), it’s crucial to ensure that only one instance of a script runs at a time. Running multiple instances of the same script can lead to resource contention, inconsistent data processing, or other unintended behaviors. This guide outlines a method to prevent duplicate script instances by programmatically terminating previous instances before starting a new one.

### Overview
The method involves modifying your script to check for and terminate any existing instances of itself and, if necessary, associated launcher scripts (e.g., bash scripts used to initialize and run the Python script). This is particularly useful in environments like Docker containers where scripts are restarted without manually stopping previous instances.

### Implementation

### Dependencies

- **Python**: The example provided uses Python, a common choice for many automated tasks and services.

- **psutil**: A cross-platform library for accessing system details and managing processes in Python.


### Steps


- **Install `psutil`**


First, ensure the `psutil` library is installed in your environment, as it allows you to interact with system processes.

```bash
pip install psutil
```

- **Modify Your Script**


Include a function at the beginning of your script that checks for and terminates existing instances of the script and, if applicable, its launcher script.

```python
import os
import psutil

def kill_previous_instances():
    current_process = psutil.Process(os.getpid())
    for proc in psutil.process_iter(['name', 'cmdline']('pid',)):
        # Check for duplicate Python script instances or bash launcher script instances
        if (proc.info[in ('python', 'python3') and 'your_script.py' in ' '.join(proc.info['cmdline']('name']))) or \
           ('bash' in proc.info[and './path/to/launcher.sh' in ' '.join(proc.info['cmdline']('name']))):
            if proc.pid != current_process.pid:  # Avoid killing the current instance
                proc.terminate()
                try:
                    proc.wait(timeout=5)  # Wait up to 5 seconds for graceful termination
                except psutil.TimeoutExpired:
                    proc.kill()  # Force termination if necessary

1. Call the function at the script's start
kill_previous_instances()

1. Your script's main logic follows...
```


### Key Considerations

- **Specificity**: Adjust the script and launcher script names and paths in the condition to match your setup. This ensures only the intended processes are targeted for termination.

- **Permissions**: Your script may need appropriate permissions to terminate other processes, especially when running in restricted environments.

- **Safety**: Use this method cautiously to avoid accidentally terminating unrelated processes. Ensure the identification logic is specific and accurate for your scripts.

### Use Cases
This approach is particularly useful in scenarios where scripts are automatically restarted, such as:

- **Docker containers** where scripts are restarted without manually stopping the container or the script itself.

- **Automated deployments** where updated scripts are launched without stopping previous versions.

- **Scheduled tasks** that may overlap due to long execution times or scheduling misconfigurations.

### Conclusion
Managing script instances to prevent duplicates is crucial for maintaining the integrity and efficiency of automated systems. By incorporating a self-check and termination mechanism in your scripts, you can ensure that only a single instance runs at any given time, thereby avoiding potential issues associated with multiple concurrent instances.
