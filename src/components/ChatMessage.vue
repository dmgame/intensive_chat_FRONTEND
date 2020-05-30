<template>
  <div class="chat-message" :class="messageClasses">
    <div class="message-block">
      <span class="user-name">{{ userName }}</span>
      <p class="message-text">{{ msg.text }}</p>
    </div>
    <div class="user-avatar"></div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    msg: {
      type: Object,
      required: true,
    },
    isCurrentUserMsg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    messageClasses() {
      return {
        'current-user-msg': this.isCurrentUserMsg,
      };
    },
    userName() {
      return `${this.msg.user.firstName} ${this.msg.user.lastName}`;
    },
  },
};
</script>

<style scoped>
.chat-message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.chat-message.current-user-msg {
  justify-content: flex-end;
}

.user-avatar {
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background-color: #c8c7ed;
  width: 50px;
  height: 50px;
}

.message-block {
  background-color: #fff;
  padding: 15px;
  margin-left: 10px;
  box-shadow: 0 0 10px rgba(101, 64, 180, 0.1);
  border-radius: 3px;
  min-width: 150px;
  max-width: 450px;
  order: 1;
}

.current-user-msg .message-block  {
  order: 0;
  margin-left: 0;
  margin-right: 10px;
}

.user-name {
  color: #000;
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
}

.message-text {
  font-size: 12px;
  line-height: 1.3;
  color: #37474f;
}
</style>
