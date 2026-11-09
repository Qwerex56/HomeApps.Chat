<script setup lang="ts">
import { computed } from 'vue'
import { useHost } from '@homeapps/plugin-sdk'
import type { AttachmentView, MessageView } from './api'
import { renderMarkdown } from './markdown'

// One message: who and when (on the first of a group), the quote it answers, text, photos and films, reactions.
const props = defineProps<{
  message: MessageView
  mine: boolean
  /** The first of a group: shows the author. */
  lead: boolean
  /** Names are shown where more than two people talk. */
  showAuthor: boolean
  userId: string | null
  time: string
  nameOf: (userId: string | null | undefined) => string
  avatarOf: (userId: string | null | undefined) => string | null
  canAct: boolean
  canReact: boolean
  /** Direct conversations: the other person has read up to here. */
  seen: boolean
}>()
const emit = defineEmits<{
  menu: [event: Event]
  react: [emoji: string, mine: boolean]
  media: [items: AttachmentView[], index: number]
  stale: []
}>()
const host = useHost()

const html = computed(() => (props.message.text ? renderMarkdown(props.message.text) : ''))
const media = computed(() => props.message.attachments.filter((a) => a.thumbUrl || a.originalUrl))
const quote = computed(() => props.message.replyTo)
const quoteText = computed(() => {
  const q = quote.value
  if (!q) return ''
  if (!q.visible) return host.t('quote.hidden')
  if (q.deleted) return host.t('message.deleted')
  return q.text || host.t('media.count', { count: q.attachments })
})
const ratio = (a: AttachmentView) => (media.value.length === 1 && a.width && a.height ? `${a.width} / ${a.height}` : '1 / 1')
const reactionTitle = (userIds: string[]) => userIds.map((id) => props.nameOf(id)).join(', ')
</script>

<template>
  <div class="chat-message" :class="{ 'chat-message--mine': mine, 'chat-message--lead': lead }">
    <div class="chat-message__avatar">
      <Avatar
        v-if="lead && !mine"
        :image="avatarOf(message.authorId) ?? undefined"
        :label="avatarOf(message.authorId) ? undefined : nameOf(message.authorId).charAt(0).toUpperCase()"
        shape="circle"
      />
    </div>
    <div class="chat-message__body">
      <div v-if="lead && showAuthor && !mine" class="chat-message__author">{{ nameOf(message.authorId) }}</div>
      <div class="chat-message__row">
        <div class="chat-message__bubble" :class="{ 'chat-message__bubble--deleted': message.deleted }">
          <template v-if="message.deleted">{{ host.t('message.deleted') }}</template>
          <template v-else>
            <div v-if="quote" class="chat-message__quote">
              <strong v-if="quote.visible && quote.authorId">{{ nameOf(quote.authorId) }}</strong>
              <span>{{ quoteText }}</span>
            </div>
            <div v-if="media.length" class="chat-message__media" :class="`chat-message__media--${Math.min(media.length, 3)}`">
              <button
                v-for="(item, index) in media"
                :key="item.id"
                type="button"
                class="chat-message__thumb"
                :style="{ aspectRatio: ratio(item) }"
                :aria-label="host.t(item.kind === 'Video' ? 'media.openVideo' : 'media.openPhoto')"
                @click="emit('media', media, index)"
              >
                <img :src="item.thumbUrl ?? undefined" :alt="item.description ?? ''" loading="lazy" @error="emit('stale')" />
                <span v-if="item.kind === 'Video'" class="chat-message__play"><i class="pi pi-play" aria-hidden="true" /></span>
              </button>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -- sanitized in renderMarkdown (markdown-it without HTML, then DOMPurify) -->
            <div v-if="html" class="chat-message__text" v-html="html" />
          </template>
          <div class="chat-message__meta">
            <span v-if="message.editedAt && !message.deleted">{{ host.t('message.edited') }} · </span>{{ time }}
          </div>
        </div>
        <Button
          v-if="canAct && !message.deleted"
          class="chat-message__more"
          icon="pi pi-ellipsis-h"
          text
          rounded
          size="small"
          severity="secondary"
          :aria-label="host.t('message.actions')"
          @click="emit('menu', $event)"
        />
      </div>
      <div v-if="message.reactions.length && !message.deleted" class="chat-message__reactions">
        <button
          v-for="reaction in message.reactions"
          :key="reaction.emoji"
          type="button"
          :class="{ active: !!userId && reaction.userIds.includes(userId) }"
          :title="reactionTitle(reaction.userIds)"
          :disabled="!canReact"
          @click="emit('react', reaction.emoji, !!userId && reaction.userIds.includes(userId))"
        >
          {{ reaction.emoji }} <span>{{ reaction.userIds.length }}</span>
        </button>
      </div>
      <div v-if="seen" class="chat-message__seen"><i class="pi pi-check" aria-hidden="true" /> {{ host.t('message.seen') }}</div>
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  display: flex;
  gap: 0.5rem;
  padding: 0.1rem 0.75rem;
}
.chat-message--lead {
  margin-top: 0.6rem;
}
.chat-message--mine {
  flex-direction: row-reverse;
}
.chat-message__avatar {
  width: 2rem;
  flex-shrink: 0;
}
.chat-message--mine .chat-message__avatar {
  display: none;
}
.chat-message__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  max-width: min(36rem, 85%);
}
.chat-message--mine .chat-message__body {
  align-items: flex-end;
}
.chat-message__author {
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0 0 0.15rem 0.25rem;
}
.chat-message__row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  max-width: 100%;
}
.chat-message--mine .chat-message__row {
  flex-direction: row-reverse;
}
.chat-message__bubble {
  min-width: 0;
  padding: 0.45rem 0.7rem;
  border-radius: 1rem;
  background: var(--p-content-hover-background);
  overflow-wrap: anywhere;
}
.chat-message--mine .chat-message__bubble {
  background: var(--p-highlight-background);
}
.chat-message__bubble--deleted {
  font-style: italic;
  color: var(--p-text-muted-color);
}
.chat-message__more {
  flex-shrink: 0;
  opacity: 0;
}
.chat-message:hover .chat-message__more,
.chat-message__more:focus-visible {
  opacity: 1;
}
@media (hover: none) {
  .chat-message__more {
    opacity: 0.6;
  }
}
.chat-message__quote {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.35rem;
  padding-left: 0.5rem;
  border-left: 3px solid var(--p-primary-color);
  font-size: 0.85rem;
  color: var(--p-text-muted-color);
}
.chat-message__quote span {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.chat-message__media {
  display: grid;
  gap: 0.25rem;
  margin: 0.1rem 0 0.35rem;
  width: min(18rem, 60vw);
}
.chat-message__media--2 {
  grid-template-columns: repeat(2, 1fr);
}
.chat-message__media--3 {
  grid-template-columns: repeat(3, 1fr);
}
.chat-message__thumb {
  position: relative;
  padding: 0;
  border: 0;
  border-radius: 0.6rem;
  overflow: hidden;
  cursor: pointer;
  background: var(--p-content-border-color);
}
.chat-message__thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.chat-message__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  background: rgb(0 0 0 / 0.25);
}
.chat-message__meta {
  margin-top: 0.15rem;
  font-size: 0.7rem;
  text-align: right;
  color: var(--p-text-muted-color);
  font-style: normal;
}
.chat-message__reactions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.2rem;
}
.chat-message__reactions button {
  padding: 0.1rem 0.45rem;
  border: 1px solid var(--p-content-border-color);
  border-radius: 1rem;
  background: var(--p-content-background);
  color: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
.chat-message__reactions button:disabled {
  cursor: default;
}
.chat-message__reactions button.active {
  border-color: var(--p-primary-color);
  background: var(--p-highlight-background);
}
.chat-message__seen {
  margin-top: 0.1rem;
  font-size: 0.7rem;
  color: var(--p-text-muted-color);
}

/* The Markdown inside a bubble (plan 9a). */
.chat-message__text :deep(p) {
  margin: 0;
}
.chat-message__text :deep(p + p),
.chat-message__text :deep(p + ul),
.chat-message__text :deep(p + ol),
.chat-message__text :deep(p + blockquote),
.chat-message__text :deep(p + pre) {
  margin-top: 0.4rem;
}
.chat-message__text :deep(a) {
  color: var(--p-primary-color);
  text-decoration: underline;
}
.chat-message__text :deep(code) {
  padding: 0.05rem 0.3rem;
  border-radius: 0.3rem;
  background: rgb(127 127 127 / 0.2);
  font-size: 0.9em;
}
.chat-message__text :deep(pre) {
  margin: 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgb(127 127 127 / 0.2);
  overflow-x: auto;
}
.chat-message__text :deep(pre code) {
  padding: 0;
  background: none;
}
.chat-message__text :deep(ul),
.chat-message__text :deep(ol) {
  margin: 0;
  padding-left: 1.25rem;
  list-style: revert;
}
.chat-message__text :deep(blockquote) {
  margin: 0;
  padding-left: 0.6rem;
  border-left: 3px solid var(--p-content-border-color);
  color: var(--p-text-muted-color);
}
</style>
