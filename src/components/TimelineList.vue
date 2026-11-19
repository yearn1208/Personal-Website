<script setup>
defineProps({
  // 每一项：{ period, title, subtitle, summary, tags }
  items: { type: Array, required: true },
})
</script>

<template>
  <ol class="timeline">
    <li v-for="(item, index) in items" :key="index" class="timeline__item">
      <span class="timeline__dot" aria-hidden="true" />
      <div class="timeline__content">
        <p class="timeline__period">{{ item.period }}</p>
        <h3 class="timeline__title">
          {{ item.title }}
          <span v-if="item.subtitle || item.company" class="timeline__sub">
            @ {{ item.subtitle || item.company }}
          </span>
        </h3>
        <p v-if="item.summary" class="timeline__summary">{{ item.summary }}</p>
        <ul v-if="item.tags && item.tags.length" class="timeline__tags">
          <li v-for="tag in item.tags" :key="tag" class="chip chip--sm">{{ tag }}</li>
        </ul>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 28px;
  list-style: none;
}

.timeline__item {
  position: relative;
  padding-left: 34px;
}

.timeline__item::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 12px;
  bottom: -30px;
  width: 2px;
  background: var(--border);
}

.timeline__item:last-child::before {
  display: none;
}

.timeline__dot {
  position: absolute;
  left: 0;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 3px solid var(--accent);
  background: var(--surface);
}

.timeline__period {
  margin-bottom: 6px;
  color: var(--muted);
  font-size: 13px;
  letter-spacing: 0.04em;
}

.timeline__title {
  margin-bottom: 8px;
  font-size: 17px;
}

.timeline__sub {
  margin-left: 6px;
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
}

.timeline__summary {
  max-width: 720px;
  margin-bottom: 12px;
  color: var(--text-soft);
  font-size: 14.5px;
  line-height: 1.8;
}

.timeline__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
}
</style>
