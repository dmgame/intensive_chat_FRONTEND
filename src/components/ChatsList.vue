<template>
  <div class="chats-list">
    <template v-for="(chat, index) in publicChats">
      <ChatsListItem
        :chat="chat"
        :key="index"
        :is-selected="selectedChatId === chat._id"
        @selectChat="onChatSelect"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Emitters from '@/plugins/socket/emitters';

import ChatsListItem from '@/components/ChatsListItem.vue';

export default {
  name: 'ChatsList',
  components: {
    ChatsListItem,
  },
  computed: {
    ...mapGetters('chats', ['publicChats', 'selectedChatId']),
  },
  methods: {
    ...mapActions('chats', ['getPublicChats', 'selectChat']),
    onChatSelect(id) {
      this.selectChat(id);
      this.$socket.emit(Emitters.SELECT_CHAT, { chatId: id });
    },
  },
  mounted() {
    this.getPublicChats();
  },
};
</script>
