#!/usr/bin/env python3
import os

def fix_links(directory):
    replacements = {
        "/general/army-evaluation-resources": "/military/army-evaluation-resources",
        "/general/fabrication": "/hardware/fabrication",
        "/general/3d-printer-recommendation": "/hardware/3d-printer-recommendation",
        "/general/leaving-service": "/military/leaving-service",
        "/general/awards": "/military/awards",
        "/general/promotion-boards": "/military/promotion-boards",
        "/general/credentialing-assistance": "/military/credentialing-assistance",
        "/general/influence": "/general/information-warfare", # This is a guess, but a good one.
        "/general/flnc": "/community/flnc", # Another guess, but likely.
        "/general/unsorted": "/general/" # A reasonable default.
    }

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                with open(filepath, "r") as f:
                    content = f.read()
                
                new_content = content
                for old, new in replacements.items():
                    new_content = new_content.replace(old, new)

                if new_content != content:
                    with open(filepath, "w") as f:
                        f.write(new_content)
                    print(f"Fixed links in {filepath}")

if __name__ == "__main__":
    fix_links(".")
