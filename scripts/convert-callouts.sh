#!/bin/bash
# Convert VitePress callout syntax to Starlight syntax
# VitePress: ::: tip Title
# Starlight: :::tip[Title]

# Also converts:
# ::: warning -> :::caution
# ::: danger -> :::danger
# ::: info -> :::note
# ::: details -> Can't auto-convert (needs manual review)

find src/content/docs -name "*.md" -type f | while read -r file; do
  # Convert ::: tip Title to :::tip[Title]
  sed -i '' -E 's/^::: tip (.+)$/:::tip[\1]/g' "$file"
  sed -i '' -E 's/^::: tip$/:::tip/g' "$file"

  # Convert ::: warning Title to :::caution[Title]
  sed -i '' -E 's/^::: warning (.+)$/:::caution[\1]/g' "$file"
  sed -i '' -E 's/^::: warning$/:::caution/g' "$file"

  # Convert ::: danger Title to :::danger[Title]
  sed -i '' -E 's/^::: danger (.+)$/:::danger[\1]/g' "$file"
  sed -i '' -E 's/^::: danger$/:::danger/g' "$file"

  # Convert ::: info Title to :::note[Title]
  sed -i '' -E 's/^::: info (.+)$/:::note[\1]/g' "$file"
  sed -i '' -E 's/^::: info$/:::note/g' "$file"

  # Convert ::: details Title - mark for manual review
  # Details becomes a custom component or expander in Starlight
  # For now, convert to note
  sed -i '' -E 's/^::: details (.+)$/:::note[\1]/g' "$file"
  sed -i '' -E 's/^::: details$/:::note[Details]/g' "$file"
done

echo "Callout conversion complete!"
