<template>
  <main class="current-chat">
    <template v-if="!selectedChatId">
      <NoSelectedChat />
    </template>
    <template v-else>
      <ChatMessages
        :messages="currentChatMessages"
        :current-user-id="user._id"
        :is-typing="isTyping"
      />
      <ChatMessageForm
        :is-join="isUserJoinSelectedChat"
        @joinChat="onJoinChat"
        @typing="onTyping"
        @submitMessage="onSubmitMessage"
      />
    </template>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Emitters from '@/plugins/socket/emitters';
import Listeners from '@/plugins/socket/listeners';
import NoSelectedChat from '@/components/NoSelectedChat.vue';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatMessageForm from '@/components/ChatMessageForm.vue';

export default {
  name: 'CurrentChat',
  components: {
    NoSelectedChat,
    ChatMessages,
    ChatMessageForm,
  },
  data: () => ({
    isTyping: false,
    $typingTimeout: null,
  }),
  computed: {
    ...mapGetters('chats', ['selectedChatId', 'currentChatMessages']),
    ...mapGetters('user', ['user', 'fullName']),
    isUserJoinSelectedChat() {
      return this.user.chats.includes(this.selectedChatId);
    },
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('chats', ['newMessage']),
    setTyping() {
      if (this.$typingTimeout) {
        clearTimeout(this.$typingTimeout);
      }

      this.isTyping = true;

      this.$typingTimeout = setTimeout(() => {
        this.isTyping = false;
      }, 1500);
    },
    onJoinChat() {
      this.$socket.emit(
        Emitters.JOIN_CHAT,
        {
          chatId: this.selectedChatId,
          userName: this.fullName,
          userId: this.user._id,
        },
      );
    },
    onTyping() {
      this.$socket.emit(
        Emitters.USER_TYPING,
        {
          chatId: this.selectedChatId,
          userId: this.user._id,
        },
      );
    },
    onSubmitMessage(text) {
      this.$socket.emit(
        Emitters.NEW_MESSAGE,
        {
          chatId: this.selectedChatId,
          userId: this.user._id,
          text,
        },
      );
    },
  },
  mounted() {
    this.$socket.on(Listeners.NEW_USER_JOIN, ({ userId }) => {
      if (userId === this.user._id) {
        this.getUser(this.user.email);
      }
    });

    this.$socket.on(Listeners.USER_TYPING, ({ chatId, userId }) => {
      if (userId !== this.user._id && chatId === this.selectedChatId) {
        this.setTyping();
      }
    });

    this.$socket.on(Listeners.NEW_MESSAGE, (msg) => {
      if (msg.chat === this.selectedChatId) {
        this.newMessage({ ...msg });
      }
    });
  },
};
</script>

<style scoped>
.current-chat {
  background-color: #fdfcfe;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
}
</style>
