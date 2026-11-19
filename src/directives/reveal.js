/**
 * v-reveal 指令：元素滚动进入视口时播放淡入上浮动画。
 * 用法：
 *   <div v-reveal>...</div>
 *   <div v-reveal="120">...</div>   // 120 为延迟毫秒数，可做交错动画
 * 动画样式在 src/styles/main.css 的 .reveal 中定义。
 */
export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (typeof binding.value === 'number' && binding.value > 0) {
      el.style.transitionDelay = `${binding.value}ms`
    }

    // 不支持 IntersectionObserver 或用户开启了「减少动态效果」时直接显示
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (typeof IntersectionObserver === 'undefined' || reduceMotion) {
      el.classList.add('reveal--visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal--visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    el._revealObserver = observer
  },

  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}
