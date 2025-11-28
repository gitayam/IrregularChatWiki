import { createContentLoader } from 'vitepress'

interface TagData {
  tags: Record<string, { title: string; url: string }[]>
  allTags: string[]
}

export default createContentLoader('**/*.md', {
  transform(rawData): TagData {
    const tags: Record<string, { title: string; url: string }[]> = {}

    rawData.forEach((page) => {
      const pageTags = page.frontmatter.tags
      if (pageTags && Array.isArray(pageTags)) {
        pageTags.forEach((tag: string) => {
          const normalizedTag = tag.toLowerCase().trim()
          if (!tags[normalizedTag]) {
            tags[normalizedTag] = []
          }
          tags[normalizedTag].push({
            title: page.frontmatter.title || page.url.split('/').pop()?.replace('.html', '') || 'Untitled',
            url: page.url
          })
        })
      }
    })

    // Sort tags alphabetically
    const allTags = Object.keys(tags).sort()

    // Sort pages within each tag alphabetically by title
    allTags.forEach(tag => {
      tags[tag].sort((a, b) => a.title.localeCompare(b.title))
    })

    return { tags, allTags }
  }
})
