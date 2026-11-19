<script setup>
import SiteIcon from './SiteIcon.vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <button
    class="icon-btn"
    type="button"
    :aria-label="theme.isDark ? '切换到浅色模式' : '切换到深色模式'"
    :title="theme.isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="theme.toggle()"
  >
    <SiteIcon :name="theme.isDark ? 'sun' : 'moon'" :size="18" />
  </button>
</template>
