<template>
  <div
    class="chat-item"
    :class="chatClasses"
    @click="selectChat"
  >
    <div class="chat-item-avatar">
      <span v-if="isNewMessage" class="new-message"></span>
    </div>
    <div class="chat-item-info">
      <div class="chat-name">
        <span class="chat-name-text">{{ chatName }}</span>
        <span class="chat-update-time">{{ lastMsgTime | passedTime }}</span>
      </div>
      <p class="chat-item-last-msg">{{ lastMsg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatsListItem',
  props: {
    chat: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    chatIdsPool: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    chatName() {
      return this.chat.name;
    },
    isNewMessage() {
      return this.chatIdsPool.includes(this.chat._id);
    },
    lastMsgTime() {
      return this.chat.lastMessage ? this.chat.lastMessage.time : '-';
    },
    lastMsg() {
      return this.chat.lastMessage ? this.chat.lastMessage.text : 'No messages';
    },
    chatClasses() {
      return {
        selected: this.isSelected,
      };
    },
  },
  methods: {
    selectChat() {
      this.$emit('selectChat', this.chat._id);
    },
  },
};
</script>

<style scoped>
.chat-item {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in;
}

.chat-item:hover,
.chat-item.selected {
  background-color: #5f38a6;
}

.chat-item-avatar {
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background-color: #c8c7ed;
  width: 40px;
  height: 40px;
  position: relative;
}

.new-message {
  position: absolute;
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 50%;
  top: -4px;
  right: -4px;
}

.chat-item-info {
  margin-left: 10px;
  max-width: 70%;
  flex-grow: 1;
}

.chat-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.chat-name-text {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}

.chat-update-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.chat-item-last-msg {
  font-size: 12px;
  line-height: 1.3;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
