---
title: "Tags"
layout: page
---

<script setup>
import { data } from './tags.data.ts'
</script>

# Browse by Tags

Explore content organized by topic tags.

<div v-if="data.allTags.length === 0">
  <p>No tagged content yet.</p>
</div>

<div v-for="tag in data.allTags" :key="tag" class="tag-section">
  <h2 :id="tag">{{ tag }}</h2>
  <ul>
    <li v-for="page in data.tags[tag]" :key="page.url">
      <a :href="page.url">{{ page.title }}</a>
    </li>
  </ul>
</div>

<style scoped>
.tag-section {
  margin-bottom: 2rem;
}
.tag-section h2 {
  text-transform: capitalize;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}
.tag-section ul {
  list-style: none;
  padding-left: 0;
}
.tag-section li {
  padding: 0.25rem 0;
}
</style>
