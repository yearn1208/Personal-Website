<script setup>
import { usePageMeta } from '@/composables/usePageMeta'
import SiteIcon from '@/components/SiteIcon.vue'

usePageMeta(() => ({ title: '页面走丢了', description: '你访问的页面不存在。' }))
</script>

<template>
  <div class="not-found section">
    <div class="container not-found__inner">
      <p class="not-found__code gradient-text">404</p>
      <h1 class="not-found__title">页面走丢了</h1>
      <p class="not-found__desc">你访问的地址不存在，或者页面已经被移动。</p>
      <div class="not-found__actions">
        <RouterLink class="btn btn--primary" to="/">
          <SiteIcon name="arrow-left" :size="16" />
          回到首页
        </RouterLink>
        <RouterLink class="btn btn--ghost" to="/projects">看看项目</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: grid;
  place-items: center;
  min-height: calc(100vh - var(--header-h) - 220px);
}

.not-found__inner {
  text-align: center;
}

.not-found__code {
  font-size: clamp(90px, 18vw, 160px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}

.not-found__title {
  margin: 18px 0 12px;
  font-size: clamp(24px, 3.6vw, 32px);
}

.not-found__desc {
  margin-bottom: 30px;
  color: var(--muted);
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
</style>
