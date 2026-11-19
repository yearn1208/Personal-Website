<script setup>
import site from '@/config/site'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/SectionHeading.vue'
import SiteIcon from '@/components/SiteIcon.vue'
import TimelineList from '@/components/TimelineList.vue'

const { profile, skills, experience, education, socials } = site

usePageMeta(() => ({ title: '关于', description: '了解一下我：经历、技能与联系方式。' }))

const initial = profile.name.slice(0, 1)
const bioParagraphs = Array.isArray(profile.bio) ? profile.bio : [profile.bio]
const experienceItems = experience.map((item) => ({ ...item, subtitle: item.company }))

const facts = [
  { icon: 'briefcase', label: '职位', value: profile.role },
  { icon: 'map-pin', label: '所在地', value: profile.location },
  { icon: 'mail', label: '邮箱', value: profile.email, href: `mailto:${profile.email}` },
]
</script>

<template>
  <div class="about">
    <!-- ===== 简介 ===== -->
    <section class="section about__top">
      <div class="container about__intro">
        <aside v-reveal class="about__card card">
          <div class="about__avatar">
            <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" />
            <div v-else class="about__avatar-inner">
              <span>{{ initial }}</span>
            </div>
          </div>
          <h1 class="about__name">{{ profile.name }}</h1>
          <p class="about__role">{{ profile.role }}</p>

          <ul class="about__facts">
            <li v-for="fact in facts" :key="fact.label">
              <span class="about__fact-icon">
                <SiteIcon :name="fact.icon" :size="15" />
              </span>
              <span class="about__fact-label">{{ fact.label }}</span>
              <a v-if="fact.href" class="about__fact-value" :href="fact.href">{{ fact.value }}</a>
              <span v-else class="about__fact-value">{{ fact.value }}</span>
            </li>
          </ul>

          <ul class="about__socials" aria-label="社交链接">
            <li v-for="social in socials" :key="social.label">
              <a
                class="icon-btn"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
                :title="social.label"
              >
                <SiteIcon :name="social.icon || 'link'" :size="18" />
              </a>
            </li>
          </ul>
        </aside>

        <div v-reveal="80" class="about__body">
          <p class="eyebrow">
            <span class="eyebrow__dot" />
            关于我
          </p>
          <h2 class="about__title">你好，我是 {{ profile.name }}</h2>
          <p v-for="(paragraph, i) in bioParagraphs" :key="i" class="about__para">
            {{ paragraph }}
          </p>
          <a v-if="profile.resumeUrl" class="btn btn--ghost about__resume" :href="profile.resumeUrl" target="_blank" rel="noopener noreferrer">
            <SiteIcon name="download" :size="16" />
            查看简历
          </a>
        </div>
      </div>
    </section>

    <!-- ===== 技能 ===== -->
    <section class="section section--soft">
      <div class="container">
        <SectionHeading
          v-reveal
          eyebrow="技能"
          title="技能与工具"
          description="围绕前端开发，延伸到工程化与协作。"
        />
        <div class="skills">
          <article
            v-for="(group, index) in skills"
            :key="group.group"
            v-reveal="index * 60"
            class="skills__group card"
          >
            <h3 class="skills__title">{{ group.group }}</h3>
            <ul class="skills__list">
              <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== 工作经历 ===== -->
    <section class="section">
      <div class="container">
        <SectionHeading v-reveal eyebrow="经历" title="工作经历" />
        <TimelineList v-reveal :items="experienceItems" />
      </div>
    </section>

    <!-- ===== 教育 ===== -->
    <section class="section">
      <div class="container">
        <SectionHeading v-reveal eyebrow="教育" title="教育背景" />
        <div class="education">
          <article v-for="item in education" :key="item.school" v-reveal class="edu card">
            <div class="edu__head">
              <span class="edu__icon">
                <SiteIcon name="graduation" :size="19" />
              </span>
              <div>
                <h3 class="edu__school">{{ item.school }}</h3>
                <p class="edu__period">{{ item.period }}</p>
              </div>
            </div>
            <p class="edu__major">{{ item.major }} · {{ item.degree }}</p>
            <p v-if="item.summary" class="edu__summary">{{ item.summary }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== 联系 ===== -->
    <section class="section">
      <div class="container">
        <div v-reveal class="about__cta card">
          <h2 class="about__cta-title">想聊聊？</h2>
          <p class="about__cta-desc">我随时欢迎有趣的项目、技术讨论和新朋友。</p>
          <a class="btn btn--primary" :href="`mailto:${profile.email}`">
            <SiteIcon name="mail" :size="16" />
            {{ profile.email }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about__top {
  padding-top: 56px;
}

.about__intro {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  align-items: start;
  gap: 56px;
}

.about__card {
  position: sticky;
  top: calc(var(--header-h) + 24px);
  padding: 28px;
  text-align: center;
}

.about__avatar {
  width: 112px;
  height: 112px;
  margin: 0 auto 18px;
  padding: 3px;
  border-radius: 50%;
  background: var(--gradient);
}

.about__avatar img,
.about__avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.about__avatar-inner {
  display: grid;
  place-items: center;
  background: var(--surface);
}

.about__avatar-inner span {
  font-size: 46px;
  font-weight: 800;
  line-height: 1;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.about__name {
  margin-bottom: 6px;
  font-size: 22px;
}

.about__role {
  margin-bottom: 22px;
  color: var(--muted);
  font-size: 14px;
}

.about__facts {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 0;
  border-block: 1px solid var(--border);
  list-style: none;
  text-align: left;
}

.about__facts li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.about__fact-icon {
  display: inline-flex;
  color: var(--accent);
}

.about__fact-label {
  color: var(--muted);
  flex-shrink: 0;
}

.about__fact-value {
  margin-left: auto;
  color: var(--text-soft);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

a.about__fact-value:hover {
  color: var(--accent);
}

.about__socials {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 20px;
  list-style: none;
}

.about__body {
  padding-top: 8px;
}

.about__title {
  margin-bottom: 22px;
  font-size: clamp(26px, 3.6vw, 36px);
  letter-spacing: -0.02em;
}

.about__para {
  margin-bottom: 18px;
  color: var(--text-soft);
  font-size: 15.5px;
  line-height: 1.9;
}

.about__resume {
  margin-top: 8px;
}

/* ---------- 教育 ---------- */
.education {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.edu {
  padding: 24px;
}

.edu__head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.edu__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent);
}

.edu__school {
  font-size: 17px;
}

.edu__period {
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
}

.edu__major {
  margin-bottom: 8px;
  color: var(--text-soft);
  font-size: 14px;
  font-weight: 600;
}

.edu__summary {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.75;
}

/* ---------- 联系卡片 ---------- */
.about__cta {
  padding: clamp(36px, 6vw, 56px);
  border-radius: var(--radius-lg);
  text-align: center;
}

.about__cta-title {
  margin-bottom: 10px;
  font-size: clamp(24px, 3.2vw, 32px);
}

.about__cta-desc {
  margin-bottom: 24px;
  color: var(--muted);
}

@media (max-width: 900px) {
  .about__intro {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .about__card {
    position: static;
    max-width: 420px;
    margin-inline: auto;
    width: 100%;
  }
}
</style>
