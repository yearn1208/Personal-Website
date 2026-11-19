<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import site from '@/config/site'
import { useSiteStore } from '@/stores/site'
import SiteIcon from './SiteIcon.vue'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const ui = useSiteStore()
const scrolled = ref(false)

const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

// 路由变化时收起移动端菜单
watch(
  () => route.fullPath,
  () => ui.closeMenu()
)
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="container header__inner">
      <RouterLink class="brand" to="/" @click="ui.closeMenu()">
        <span class="brand__mark" aria-hidden="true">{{ site.profile.name.slice(0, 1) }}</span>
        <span class="brand__text">{{ site.profile.name }}</span>
      </RouterLink>

      <nav class="header__nav" aria-label="主导航">
        <RouterLink
          v-for="item in site.nav"
          :key="item.to"
          :to="item.to"
          class="header__link"
          :class="{ 'header__link--active': isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header__actions">
        <ThemeToggle />
        <button
          class="icon-btn header__toggle"
          type="button"
          :aria-expanded="ui.menuOpen"
          aria-controls="mobile-menu"
          :aria-label="ui.menuOpen ? '关闭菜单' : '打开菜单'"
          @click="ui.toggleMenu()"
        >
          <SiteIcon :name="ui.menuOpen ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <nav v-if="ui.menuOpen" id="mobile-menu" class="drawer" aria-label="移动端导航">
        <div class="container drawer__list">
          <RouterLink
            v-for="item in site.nav"
            :key="item.to"
            :to="item.to"
            class="drawer__link"
            :class="{ 'drawer__link--active': isActive(item.to) }"
            @click="ui.closeMenu()"
          >
            {{ item.label }}
            <SiteIcon name="arrow-right" :size="16" />
          </RouterLink>

          <div class="drawer__socials">
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
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--header-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease;
}

.header--scrolled {
  border-bottom-color: var(--border);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: var(--header-h);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--text);
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--gradient);
  color: #ffffff;
  font-size: 15px;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
}

.brand__text {
  font-size: 16px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  margin-right: 4px;
}

.header__link {
  padding: 8px 14px;
  border-radius: 999px;
  color: var(--text-soft);
  font-size: 14px;
  transition: color 0.2s ease, background 0.2s ease;
}

.header__link:hover {
  color: var(--text);
  background: var(--surface-2);
}

.header__link--active {
  color: var(--text);
  background: var(--accent-soft);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__toggle {
  display: none;
}

.drawer {
  position: absolute;
  inset-inline: 0;
  top: var(--header-h);
  padding: 12px 0 20px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}

.drawer__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drawer__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 12px;
  color: var(--text-soft);
  font-size: 16px;
  transition: color 0.2s ease, background 0.2s ease;
}

.drawer__link:hover {
  color: var(--text);
  background: var(--surface-2);
}

.drawer__link--active {
  color: var(--text);
  background: var(--accent-soft);
}

.drawer__socials {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 720px) {
  .header__nav {
    display: none;
  }

  .header__actions {
    margin-left: auto;
  }

  .header__toggle {
    display: inline-flex;
  }

  .brand__text {
    font-size: 15px;
  }
}
</style>
