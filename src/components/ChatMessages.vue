<template>
  <div class="chat-messages-wrap" v-scrollDown="messages.length">
    <template v-if="!messages.length">
      <NoChatMessages />
    </template>
    <template v-else>
      <template v-for="(msg, index) in messages">
        <ChatMessage
          :key="index"
          :msg="msg"
          :is-current-user-msg="msg.user._id === currentUserId"
        />
      </template>
      <template v-if="isTyping">
        <TypingLoader />
      </template>
    </template>
  </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage.vue';
import NoChatMessages from '@/components/NoChatMessages.vue';
import TypingLoader from '@/components/TypingLoader.vue';

export default {
  name: 'ChatMessages',
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
    currentUserId: {
      type: String,
      required: true,
    },
    isTyping: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ChatMessage,
    NoChatMessages,
    TypingLoader,
  },
  directives: {
    scrollDown: {
      componentUpdated(el, binding) {
        if (binding.value === 0) return;
        // eslint-disable-next-line no-param-reassign
        el.scrollTop = el.scrollHeight;
      },
    },
  },
};
</script>

<style scoped>
.chat-messages-wrap {
  padding: 30px 60px;
  height: 75vh;
  flex-grow: 1;
  overflow-x: auto;
}
</style>
