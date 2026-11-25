<script setup>
import { computed } from 'vue'
import site from '@/config/site'
import { usePageMeta } from '@/composables/usePageMeta'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import SiteIcon from '@/components/SiteIcon.vue'
import TimelineList from '@/components/TimelineList.vue'

const { profile, skills, projects, experience, socials } = site

usePageMeta(() => ({ title: '', description: site.seo.description }))

const featuredProjects = computed(() => projects.filter((p) => p.featured).slice(0, 3))
const experiencePreview = computed(() =>
  experience.slice(0, 2).map((item) => ({ ...item, subtitle: item.company }))
)
const initial = profile.name.slice(0, 1)
</script>

<template>
  <div class="home">
    <!-- ===== Hero ===== -->
    <section class="hero">
      <div class="hero__glow" aria-hidden="true" />
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__badge">
            <h1>111111111</h1>
            <span class="hero__status" aria-hidden="true" />
            开放合作 · {{ profile.location }}
          </p>

          <h1 class="hero__title">
            你好，我是
            <span class="gradient-text">{{ profile.name }}</span>
          </h1>
          <p class="hero__role">{{ profile.role }}</p>
          <p class="hero__tagline">{{ profile.tagline }}</p>
          <p class="hero__intro">{{ profile.intro }}</p>

          <div class="hero__actions">
            <RouterLink class="btn btn--primary" to="/projects">
              查看我的项目
              <SiteIcon name="arrow-right" :size="16" />
            </RouterLink>
            <a class="btn btn--ghost" :href="`mailto:${profile.email}`">
              <SiteIcon name="mail" :size="16" />
              联系我
            </a>
          </div>

          <ul class="hero__socials" aria-label="社交链接">
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

          <dl class="hero__stats">
            <div v-for="stat in profile.stats || []" :key="stat.label" class="hero__stat">
              <dt>{{ stat.label }}</dt>
              <dd>{{ stat.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="hero__visual">
          <span class="hero__deco hero__deco--a" aria-hidden="true" />
          <span class="hero__deco hero__deco--b" aria-hidden="true" />
          <div class="hero__avatar-ring">
            <img
              v-if="profile.avatar"
              class="hero__avatar-img"
              :src="profile.avatar"
              :alt="profile.name"
            />
            <div v-else class="hero__avatar">
              <span class="hero__avatar-letter">{{ initial }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 技能 ===== -->
    <section class="section">
      <div class="container">
        <SectionHeading
          v-reveal
          eyebrow="技能"
          title="我擅长什么"
          description="日常使用的技术栈与协作方式。"
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

    <!-- ===== 精选项目 ===== -->
    <section class="section section--soft">
      <div class="container">
        <div v-reveal class="section-bar">
          <SectionHeading
            eyebrow="作品"
            title="精选项目"
            description="从真实业务里长出来的几个项目。"
          />
          <RouterLink class="text-link" to="/projects">
            查看全部
            <SiteIcon name="arrow-right" :size="15" />
          </RouterLink>
        </div>
        <div class="project-grid">
          <ProjectCard
            v-for="(project, index) in featuredProjects"
            :key="project.slug"
            v-reveal="index * 70"
            :project="project"
          />
        </div>
      </div>
    </section>

    <!-- ===== 工作经历 ===== -->
    <section class="section">
      <div class="container">
        <div v-reveal class="section-bar">
          <SectionHeading eyebrow="经历" title="工作经历" description="一路走来的几段旅程。" />
          <RouterLink class="text-link" to="/about">
            完整经历
            <SiteIcon name="arrow-right" :size="15" />
          </RouterLink>
        </div>
        <TimelineList v-reveal :items="experiencePreview" />
      </div>
    </section>

    <!-- ===== 联系 ===== -->
    <section class="section">
      <div class="container">
        <div v-reveal class="contact card">
          <div class="contact__glow" aria-hidden="true" />
          <div class="contact__content">
            <p class="eyebrow">
              <span class="eyebrow__dot" />
              联系我
            </p>
            <h2 class="contact__title">让我们一起做点有意思的事</h2>
            <p class="contact__desc">
              无论是项目合作、技术交流，还是简单地打个招呼，都欢迎给我发邮件。
            </p>
            <div class="contact__actions">
              <a class="btn btn--primary" :href="`mailto:${profile.email}`">
                <SiteIcon name="mail" :size="16" />
                {{ profile.email }}
              </a>
              <a
                v-if="profile.resumeUrl"
                class="btn btn--ghost"
                :href="profile.resumeUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiteIcon name="download" :size="16" />
                查看简历
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- Hero ---------- */
.hero {
  position: relative;
  overflow: hidden;
  padding: 84px 0 88px;
}

.hero__glow {
  position: absolute;
  inset: -18% -12% auto;
  height: 640px;
  pointer-events: none;
  background:
    radial-gradient(42% 46% at 18% 30%, rgba(99, 102, 241, 0.2), transparent 70%),
    radial-gradient(38% 44% at 82% 16%, rgba(168, 85, 247, 0.16), transparent 70%),
    radial-gradient(30% 36% at 62% 68%, rgba(6, 182, 212, 0.12), transparent 70%);
  filter: blur(6px);
}

.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: center;
  gap: 56px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 22px;
  padding: 7px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-soft);
  font-size: 13px;
}

.hero__status {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  animation: pulse 2.4s ease-out infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.hero__title {
  font-size: clamp(34px, 5.4vw, 58px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.12;
}

.hero__role {
  margin-top: 14px;
  color: var(--text-soft);
  font-size: clamp(17px, 2vw, 21px);
  font-weight: 600;
}

.hero__tagline {
  margin-top: 8px;
  color: var(--text-soft);
  font-size: 17px;
}

.hero__intro {
  max-width: 540px;
  margin-top: 14px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.85;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.hero__socials {
  display: flex;
  gap: 8px;
  margin-top: 26px;
  list-style: none;
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}

.hero__stat {
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;
}

.hero__stat dd {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__stat dt {
  color: var(--muted);
  font-size: 13px;
}

/* ---------- Hero 头像 ---------- */
.hero__visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 360px;
}

.hero__avatar-ring {
  position: relative;
  width: min(300px, 68vw);
  aspect-ratio: 1;
  padding: 6px;
  border-radius: 50%;
  background: var(--gradient);
  box-shadow: 0 24px 80px rgba(99, 102, 241, 0.35);
  animation: float 7s ease-in-out infinite;
}

.hero__avatar {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--surface);
}

.hero__avatar-letter {
  font-size: clamp(70px, 12vw, 110px);
  font-weight: 800;
  line-height: 1;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.hero__deco {
  position: absolute;
  border-radius: 50%;
  filter: blur(34px);
  pointer-events: none;
}

.hero__deco--a {
  top: 4%;
  right: 10%;
  width: 140px;
  height: 140px;
  background: var(--accent);
  opacity: 0.5;
}

.hero__deco--b {
  bottom: 2%;
  left: 8%;
  width: 170px;
  height: 170px;
  background: var(--accent-3);
  opacity: 0.32;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

/* ---------- 区块标题栏 ---------- */
.section-bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;
}

.section-bar :deep(.section-heading) {
  margin-bottom: 0;
}

/* ---------- 联系卡片 ---------- */
.contact {
  position: relative;
  overflow: hidden;
  padding: clamp(36px, 6vw, 64px);
  border-radius: var(--radius-lg);
  text-align: center;
}

.contact__glow {
  position: absolute;
  inset: -45% -10% auto;
  height: 340px;
  pointer-events: none;
  background: radial-gradient(
    50% 60% at 50% 40%,
    rgba(99, 102, 241, 0.2),
    rgba(168, 85, 247, 0.12) 45%,
    transparent 75%
  );
}

.contact__content {
  position: relative;
  max-width: 640px;
  margin-inline: auto;
}

.contact__title {
  margin-bottom: 14px;
  font-size: clamp(24px, 3.4vw, 34px);
  letter-spacing: -0.02em;
}

.contact__desc {
  margin-bottom: 28px;
  color: var(--muted);
  line-height: 1.8;
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

/* ---------- 响应式 ---------- */
@media (max-width: 900px) {
  .hero {
    padding-top: 56px;
  }

  .hero__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero__visual {
    order: -1;
    min-height: 0;
  }

  .hero__avatar-ring {
    width: min(210px, 56vw);
  }

  .hero__stats {
    gap: 28px;
  }
}

@media (max-width: 640px) {
  .section-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
}
</style>
