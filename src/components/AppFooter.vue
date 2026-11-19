<script setup>
import site from '@/config/site'
import SiteIcon from './SiteIcon.vue'

const year = new Date().getFullYear()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <RouterLink class="footer__name" to="/">{{ site.profile.name }}</RouterLink>
        <p class="footer__tagline">{{ site.profile.tagline }}</p>
      </div>

      <nav class="footer__nav" aria-label="页脚导航">
        <RouterLink v-for="item in site.nav" :key="item.to" :to="item.to" class="footer__link">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="footer__socials">
        <a
          v-for="social in site.socials"
          :key="social.label"
          class="icon-btn"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          :title="social.label"
        >
          <SiteIcon :name="social.icon || 'link'" :size="18" />
        </a>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} {{ site.profile.name }} · 基于 Vue 3 / Vite / Pinia 构建</p>
      <button type="button" class="footer__top" @click="scrollToTop">
        回到顶部
        <SiteIcon name="arrow-right" :size="14" />
      </button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  padding-top: 56px;
  border-top: 1px solid var(--border);
  background: var(--bg);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
}

.footer__brand {
  max-width: 320px;
}

.footer__name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

.footer__tagline {
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.footer__link {
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--text-soft);
  font-size: 14px;
  transition: color 0.2s ease, background 0.2s ease;
}

.footer__link:hover {
  color: var(--text);
  background: var(--surface-2);
}

.footer__socials {
  display: flex;
  gap: 8px;
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 40px;
  padding-block: 22px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 13px;
}

.footer__top {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-soft);
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.footer__top:hover {
  color: var(--text);
  background: var(--surface-2);
}

.footer__top :deep(svg) {
  transform: rotate(-90deg);
}

@media (max-width: 640px) {
  .footer__inner {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
