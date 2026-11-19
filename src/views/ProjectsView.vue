<script setup>
import { computed } from 'vue'
import site from '@/config/site'
import { usePageMeta } from '@/composables/usePageMeta'
import ProjectCard from '@/components/ProjectCard.vue'
import { useSiteStore } from '@/stores/site'

const ui = useSiteStore()

usePageMeta(() => ({ title: '项目', description: '我参与和独立完成的项目集合。' }))

// 按出现频次整理技术标签
const tags = computed(() => {
  const counts = new Map()
  site.projects.forEach((project) => {
    project.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1))
  })
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag)
})

const activeTag = computed(() => (tags.value.includes(ui.projectTag) ? ui.projectTag : '全部'))

const filtered = computed(() =>
  activeTag.value === '全部'
    ? site.projects
    : site.projects.filter((project) => project.tags.includes(activeTag.value))
)
</script>

<template>
  <div class="projects section">
    <div class="container">
      <header v-reveal class="projects__header">
        <p class="eyebrow">
          <span class="eyebrow__dot" />
          作品集
        </p>
        <h1 class="projects__title">项目</h1>
        <p class="projects__desc">
          一些真实业务里沉淀下来的项目，点击卡片可以查看详情。
        </p>
      </header>

      <div v-reveal="60" class="projects__filters" role="group" aria-label="按技术标签筛选">
        <button
          type="button"
          class="filter-chip"
          :class="{ 'filter-chip--active': activeTag === '全部' }"
          @click="ui.setProjectTag('全部')"
        >
          全部
          <span class="filter-chip__count">{{ site.projects.length }}</span>
        </button>
        <button
          v-for="tag in tags"
          :key="tag"
          type="button"
          class="filter-chip"
          :class="{ 'filter-chip--active': activeTag === tag }"
          @click="ui.setProjectTag(tag)"
        >
          {{ tag }}
        </button>
      </div>

      <TransitionGroup name="cards" tag="div" class="project-grid">
        <ProjectCard
          v-for="project in filtered"
          :key="project.slug"
          :project="project"
        />
      </TransitionGroup>

      <p v-if="!filtered.length" class="projects__empty">
        这个标签下还没有项目，换个筛选试试。
      </p>
    </div>
  </div>
</template>

<style scoped>
.projects {
  padding-top: 64px;
}

.projects__header {
  max-width: 640px;
  margin-bottom: 36px;
}

.projects__title {
  margin-bottom: 12px;
  font-size: clamp(32px, 5vw, 46px);
  letter-spacing: -0.03em;
}

.projects__desc {
  color: var(--muted);
  line-height: 1.75;
}

.projects__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 36px;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-soft);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease,
    box-shadow 0.2s ease, transform 0.2s ease;
}

.filter-chip:hover {
  border-color: var(--border-strong);
  color: var(--text);
  transform: translateY(-1px);
}

.filter-chip--active {
  background: var(--gradient);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.32);
}

.filter-chip__count {
  font-size: 12px;
  opacity: 0.8;
}

.projects__empty {
  padding: 60px 0;
  color: var(--muted);
  text-align: center;
}

/* 筛选时的卡片过渡 */
.cards-enter-active {
  transition: opacity 0.32s ease, transform 0.32s ease;
}

.cards-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

.cards-move {
  transition: transform 0.32s ease;
}
</style>
