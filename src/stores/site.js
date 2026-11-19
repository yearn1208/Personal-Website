import { defineStore } from 'pinia'

/**
 * 站点界面状态：
 * - menuOpen：移动端菜单是否展开
 * - projectTag：项目页的筛选标签（放到 store 里，从详情页返回时筛选条件不丢失）
 */
export const useSiteStore = defineStore('site', {
  state: () => ({
    menuOpen: false,
    projectTag: '全部',
  }),

  actions: {
    toggleMenu(value) {
      this.menuOpen = typeof value === 'boolean' ? value : !this.menuOpen
    },
    closeMenu() {
      this.menuOpen = false
    },
    setProjectTag(tag) {
      this.projectTag = tag
    },
  },
})
