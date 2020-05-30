<template>
  <div class="chat-messages-wrap">
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
    </template>
  </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage.vue';
import NoChatMessages from '@/components/NoChatMessages.vue';

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
  },
  components: {
    ChatMessage,
    NoChatMessages,
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
