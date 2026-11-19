<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  align: { type: String, default: 'left' },
})
</script>

<template>
  <div class="section-heading" :class="`section-heading--${align}`">
    <p v-if="eyebrow" class="eyebrow">
      <span class="eyebrow__dot" />
      {{ eyebrow }}
    </p>
    <h2 class="section-heading__title">{{ title }}</h2>
    <p v-if="description" class="section-heading__desc">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped>
.section-heading {
  max-width: 640px;
  margin-bottom: 40px;
}

.section-heading--center {
  margin-inline: auto;
  text-align: center;
}

.section-heading__title {
  margin-bottom: 12px;
  font-size: clamp(26px, 3.6vw, 36px);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.section-heading__desc {
  color: var(--muted);
  line-height: 1.75;
}
</style>
