import { defineStore } from 'pinia'

/**
 * 主题状态：亮色 / 暗色 / 跟随系统
 * - 未手动切换时跟随系统（mode = 'system'，不写入 localStorage）
 * - 切换后记住用户选择（localStorage 键名：theme-mode，与 index.html 内联脚本保持一致）
 */
const STORAGE_KEY = 'theme-mode'
const media =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

function readSavedMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : 'system'
  } catch {
    return 'system'
  }
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'system', // 'light' | 'dark' | 'system'
    systemDark: media ? media.matches : false,
    ready: false,
  }),

  getters: {
    resolved: (state) => (state.mode === 'system' ? (state.systemDark ? 'dark' : 'light') : state.mode),
    isDark() {
      return this.resolved === 'dark'
    },
  },

  actions: {
    init() {
      if (this.ready) return
      this.ready = true
      this.mode = readSavedMode()
      if (media) {
        media.addEventListener('change', (event) => {
          this.systemDark = event.matches
          this.apply()
        })
      }
      this.apply()
    },

    setMode(mode) {
      this.mode = mode
      try {
        if (mode === 'system') localStorage.removeItem(STORAGE_KEY)
        else localStorage.setItem(STORAGE_KEY, mode)
      } catch {
        /* 隐私模式下 localStorage 可能不可用，忽略即可 */
      }
      this.apply()
    },

    toggle() {
      this.setMode(this.isDark ? 'light' : 'dark')
    },

    apply() {
      document.documentElement.dataset.theme = this.resolved
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', this.isDark ? '#080b14' : '#f6f7fb')
    },
  },
})
