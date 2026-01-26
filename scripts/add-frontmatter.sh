#!/bin/bash
# Add missing frontmatter title to markdown files that don't have one

find src/content/docs -name "*.md" -type f | while read -r file; do
  # Check if file starts with ---
  first_line=$(head -n 1 "$file")

  if [[ "$first_line" != "---" ]]; then
    # No frontmatter - need to add it
    # Extract title from first heading
    title=$(grep -m 1 "^# " "$file" | sed 's/^# //')

    if [[ -z "$title" ]]; then
      # No heading found, use filename
      title=$(basename "$file" .md | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
    fi

    # Create temp file with frontmatter
    echo "---" > "$file.tmp"
    echo "title: \"$title\"" >> "$file.tmp"
    echo "---" >> "$file.tmp"
    echo "" >> "$file.tmp"
    cat "$file" >> "$file.tmp"
    mv "$file.tmp" "$file"
    echo "Added frontmatter to: $file"
  else
    # Has frontmatter - check if title exists
    has_title=$(awk '/^---$/{p++} p==1 && /^title:/{found=1} p==2{exit} END{print found+0}' "$file")

    if [[ "$has_title" != "1" ]]; then
      # Has frontmatter but no title
      title=$(grep -m 1 "^# " "$file" | sed 's/^# //')

      if [[ -z "$title" ]]; then
        title=$(basename "$file" .md | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
      fi

      # Insert title after first ---
      sed -i '' "0,/^---$/s/^---$/---\ntitle: \"$title\"/" "$file"
      echo "Added title to frontmatter: $file"
    fi
  fi
done

echo "Frontmatter processing complete!"
