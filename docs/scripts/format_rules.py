#!/usr/bin/env python3
import os
import re
import argparse

def format_rules(directory, dry_run=False):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                with open(filepath, "r") as f:
                    content = f.read()
                
                # Ensure we don't replace YAML front matter
                parts = content.split('---')
                if len(parts) > 2 and parts[0].strip() == '':
                    # This file likely has YAML front matter
                    header = parts[1]
                    body = '---'.join(parts[2:])
                    
                    # Replace '---' in the body only
                    body = re.sub(r'^---$', '***', body, flags=re.MULTILINE)
                    
                    new_content = f"---{header}---{body}"
                else:
                    # No YAML front matter detected, replace all instances
                    new_content = re.sub(r'^---$', '***', content, flags=re.MULTILINE)

                if new_content != content:
                    if dry_run:
                        print(f"[Dry Run] Would update rules in {filepath}")
                    else:
                        with open(filepath, "w") as f:
                            f.write(new_content)
                        print(f"Updated rules in {filepath}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Format horizontal rules in markdown files.")
    parser.add_argument('--dry-run', action='store_true', help='Perform a dry run without modifying files.')
    args = parser.parse_args()
    
    format_rules(".", dry_run=args.dry_run)