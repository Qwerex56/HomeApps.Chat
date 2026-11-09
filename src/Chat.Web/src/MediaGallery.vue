<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useHost } from '@homeapps/plugin-sdk'
import type { AttachmentView } from './api'

// Photos and films of one message on the whole screen: arrows or swipe-free buttons, Esc closes.
const props = defineProps<{ items: AttachmentView[]; start: number }>()
const emit = defineEmits<{ close: [] }>()
const host = useHost()

const index = ref(props.start)
const current = computed(() => props.items[index.value])
const step = (by: number) => (index.value = (index.value + by + props.items.length) % props.items.length)

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
  else if (event.key === 'ArrowLeft') step(-1)
  else if (event.key === 'ArrowRight') step(1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div class="chat-gallery" role="dialog" aria-modal="true" :aria-label="host.t('media.gallery')" @click.self="emit('close')">
      <template v-if="current">
        <video
          v-if="current.kind === 'Video'"
          :key="current.id"
          class="chat-gallery__media"
          :src="current.originalUrl ?? undefined"
          :poster="current.thumbUrl ?? undefined"
          controls
          autoplay
          playsinline
        />
        <img
          v-else
          :key="`i-${current.id}`"
          class="chat-gallery__media"
          :src="current.previewUrl ?? current.originalUrl ?? undefined"
          :alt="current.description ?? host.t('media.photo')"
        />
      </template>
      <div class="chat-gallery__bar">
        <span v-if="items.length > 1">{{ index + 1 }} / {{ items.length }}</span>
        <a v-if="current?.originalUrl" :href="current.originalUrl" target="_blank" rel="noopener noreferrer">{{ host.t('media.original') }}</a>
        <Button icon="pi pi-times" rounded severity="secondary" :aria-label="host.t('close')" @click="emit('close')" />
      </div>
      <template v-if="items.length > 1">
        <Button class="chat-gallery__prev" icon="pi pi-chevron-left" rounded severity="secondary" :aria-label="host.t('media.previous')" @click="step(-1)" />
        <Button class="chat-gallery__next" icon="pi pi-chevron-right" rounded severity="secondary" :aria-label="host.t('media.next')" @click="step(1)" />
      </template>
    </div>
  </Teleport>
</template>

<style scoped>
.chat-gallery {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 0.9);
}
.chat-gallery__media {
  max-width: 100vw;
  max-height: 100dvh;
  object-fit: contain;
}
.chat-gallery__bar {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
}
.chat-gallery__bar a {
  color: #fff;
  text-decoration: underline;
}
.chat-gallery__prev,
.chat-gallery__next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.chat-gallery__prev {
  left: 0.75rem;
}
.chat-gallery__next {
  right: 0.75rem;
}
</style>
