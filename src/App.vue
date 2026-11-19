<script setup>
import site from '@/config/site'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
theme.init()

// 全站默认标题 / 描述，各页面会覆盖为更具体的值
usePageMeta(() => ({ title: '', description: site.seo.description }))
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
}
</style>
