import { definePlugin } from '@homeapps/plugin-sdk'
import ChatWidget from './ChatWidget.vue'
import en from './messages/en'
import pl from './messages/pl'

export default definePlugin({
  id: 'chat',
  routes: { '': () => import('./ChatPage.vue') },
  widgets: { chat: ChatWidget },
  messages: { pl, en },
})
