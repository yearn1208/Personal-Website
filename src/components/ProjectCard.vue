<script setup>
import SiteIcon from './SiteIcon.vue'

defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <RouterLink
    class="project-card card"
    :to="`/projects/${project.slug}`"
    :aria-label="`查看项目：${project.title}`"
  >
    <div class="project-card__cover cover" :class="`cover--${project.accent || 'indigo'}`">
      <img
        v-if="project.cover"
        class="project-card__img"
        :src="project.cover"
        :alt="project.title"
        loading="lazy"
      />
      <span v-else class="project-card__monogram" aria-hidden="true">
        {{ project.title.slice(0, 1) }}
      </span>
      <span class="project-card__year">{{ project.year }}</span>
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title">
        <span>{{ project.title }}</span>
        <SiteIcon name="arrow-up-right" :size="17" class="project-card__arrow" />
      </h3>
      <p class="project-card__summary">{{ project.summary }}</p>
      <ul class="project-card__tags">
        <li v-for="tag in project.tags.slice(0, 4)" :key="tag" class="chip chip--sm">
          {{ tag }}
        </li>
      </ul>
    </div>
  </RouterLink>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: inherit;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
}

.project-card__cover {
  aspect-ratio: 16 / 9;
  border-radius: 0;
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__monogram {
  font-size: 56px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
}

.project-card__year {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(8, 11, 20, 0.35);
  color: #ffffff;
  font-size: 12px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.project-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

.project-card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 18px;
}

.project-card__arrow {
  color: var(--muted);
  transition: transform 0.25s ease, color 0.25s ease;
}

.project-card:hover .project-card__arrow {
  transform: translate(2px, -2px);
  color: var(--accent);
}

.project-card__summary {
  flex: 1;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
}
</style>
