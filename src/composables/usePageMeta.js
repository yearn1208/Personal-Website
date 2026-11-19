import { watchEffect } from 'vue'
import site from '@/config/site'

function setMeta(name, content) {
  if (!content) return
  let tag = document.head.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * 设置页面标题与描述。
 * @param {object|Function} getMeta 形如 { title, description }，也支持传入返回该对象的函数（自动响应式）
 */
export function usePageMeta(getMeta) {
  watchEffect(() => {
    const meta = (typeof getMeta === 'function' ? getMeta() : getMeta) || {}
    document.title = meta.title ? `${meta.title} · ${site.seo.siteName}` : site.seo.siteName
    setMeta('description', meta.description || site.seo.description)
    setMeta('keywords', (site.seo.keywords || []).join(','))
  })
}
