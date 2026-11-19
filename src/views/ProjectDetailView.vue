<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import site from '@/config/site'
import { usePageMeta } from '@/composables/usePageMeta'
import SiteIcon from '@/components/SiteIcon.vue'

const route = useRoute()

const project = computed(() => site.projects.find((item) => item.slug === route.params.slug))

usePageMeta(() =>
  project.value
    ? { title: project.value.title, description: project.value.summary }
    : { title: '项目未找到', description: '没有找到对应的项目。' }
)

const index = computed(() => site.projects.findIndex((item) => item.slug === route.params.slug))
const prev = computed(() => (index.value > 0 ? site.projects[index.value - 1] : null))
const next = computed(() =>
  index.value >= 0 && index.value < site.projects.length - 1
    ? site.projects[index.value + 1]
    : null
)
</script>

<template>
  <div class="detail section">
    <div class="container container--narrow">
      <RouterLink class="back-link" to="/projects">
        <SiteIcon name="arrow-left" :size="16" />
        所有项目
      </RouterLink>

      <template v-if="project">
        <header v-reveal class="detail__header">
          <p class="eyebrow">
            <span class="eyebrow__dot" />
            {{ project.year }} · 项目案例
          </p>
          <h1 class="detail__title">{{ project.title }}</h1>
          <p class="detail__summary">{{ project.summary }}</p>

          <ul class="detail__tags">
            <li v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</li>
          </ul>

          <div v-if="project.links && (project.links.demo || project.links.repo)" class="detail__actions">
            <a
              v-if="project.links.demo"
              class="btn btn--primary"
              :href="project.links.demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              在线预览
              <SiteIcon name="external" :size="15" />
            </a>
            <a
              v-if="project.links.repo"
              class="btn btn--ghost"
              :href="project.links.repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              源码仓库
              <SiteIcon name="github" :size="16" />
            </a>
          </div>
        </header>

        <div
          v-reveal
          class="detail__cover cover"
          :class="`cover--${project.accent || 'indigo'}`"
        >
          <img v-if="project.cover" :src="project.cover" :alt="project.title" />
          <span v-else class="detail__monogram" aria-hidden="true">
            {{ project.title.slice(0, 1) }}
          </span>
        </div>

        <section v-reveal class="detail__section">
          <h2>项目背景</h2>
          <p v-for="(paragraph, i) in project.description" :key="i">{{ paragraph }}</p>
        </section>

        <section v-if="project.highlights && project.highlights.length" v-reveal class="detail__section">
          <h2>关键成果</h2>
          <ul class="detail__highlights">
            <li v-for="item in project.highlights" :key="item">
              <span class="detail__check"><SiteIcon name="check" :size="13" /></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>

        <nav v-if="prev || next" class="detail__pager" aria-label="项目导航">
          <RouterLink v-if="prev" class="pager-link" :to="`/projects/${prev.slug}`">
            <span class="pager-link__label">
              <SiteIcon name="arrow-left" :size="14" />
              上一个
            </span>
            <span class="pager-link__title">{{ prev.title }}</span>
          </RouterLink>
          <RouterLink
            v-if="next"
            class="pager-link pager-link--right"
            :to="`/projects/${next.slug}`"
          >
            <span class="pager-link__label">
              下一个
              <SiteIcon name="arrow-right" :size="14" />
            </span>
            <span class="pager-link__title">{{ next.title }}</span>
          </RouterLink>
        </nav>
      </template>

      <div v-else class="detail__missing">
        <h1>项目不存在</h1>
        <p>你访问的项目可能已被移动或删除。</p>
        <RouterLink class="btn btn--primary" to="/projects">返回项目列表</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  padding-top: 48px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 36px;
  color: var(--text-soft);
  font-size: 14px;
  transition: color 0.2s ease, gap 0.2s ease;
}

.back-link:hover {
  gap: 11px;
  color: var(--accent);
}

.detail__header {
  margin-bottom: 36px;
}

.detail__title {
  margin-bottom: 14px;
  font-size: clamp(30px, 4.6vw, 44px);
  letter-spacing: -0.03em;
}

.detail__summary {
  max-width: 640px;
  margin-bottom: 20px;
  color: var(--text-soft);
  font-size: 16px;
  line-height: 1.85;
}

.detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
  list-style: none;
}

.detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.detail__cover {
  aspect-ratio: 21 / 9;
  margin-bottom: 48px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.detail__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail__monogram {
  font-size: clamp(72px, 12vw, 120px);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 14px 36px rgba(0, 0, 0, 0.24);
}

.detail__section {
  margin-bottom: 44px;
}

.detail__section h2 {
  margin-bottom: 16px;
  font-size: 21px;
}

.detail__section p {
  margin-bottom: 16px;
  color: var(--text-soft);
  font-size: 15.5px;
  line-height: 1.9;
}

.detail__section p:last-child {
  margin-bottom: 0;
}

.detail__highlights {
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
}

.detail__highlights li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: var(--text-soft);
  font-size: 15px;
  line-height: 1.7;
}

.detail__check {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
}

.detail__pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 56px;
  padding-top: 36px;
  border-top: 1px solid var(--border);
}

.pager-link {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.pager-link:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.pager-link--right {
  align-items: flex-end;
  text-align: right;
}

.pager-link__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 13px;
}

.pager-link__title {
  font-size: 15px;
  font-weight: 600;
}

.detail__missing {
  padding: 80px 0;
  text-align: center;
}

.detail__missing h1 {
  margin-bottom: 12px;
  font-size: 30px;
}

.detail__missing p {
  margin-bottom: 28px;
  color: var(--muted);
}

@media (max-width: 640px) {
  .detail__pager {
    grid-template-columns: 1fr;
  }

  .detail__cover {
    aspect-ratio: 16 / 10;
  }
}
</style>
