<template>
  <div class="chat-message-form">
    <template v-if="!isJoin">
      <div class="join-chat">
        <span class="join-text">Please join chat</span>
        <ElButton
          type="primary"
          size="small"
          @click="joinChat"
        >
          Join
        </ElButton>
      </div>
    </template>
    <template v-else>
      <ElInput
        v-model="text"
        class="message-control"
        type="textarea"
        @input="onInputMessage"
      />
      <ElButton
        type="primary"
        icon="el-icon-message"
        circle
        @click="submitMessage"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ChatMessageForm',
  props: {
    isJoin: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    text: '',
  }),
  methods: {
    joinChat() {
      this.$emit('joinChat');
    },
    onInputMessage() {
      this.$emit('typing');
    },
    submitMessage() {
      this.$emit('submitMessage', this.text);
      this.text = '';
    },
  },
};
</script>

<style scoped>
.chat-message-form {
  margin-top: auto;
  display: flex;
  padding: 20px 30px;
  background-color: #fff;
  align-items: center;
}

.join-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.join-text {
  margin-right: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.message-control >>> .el-textarea__inner {
  border: none;
  margin-right: 20px;
  resize: none;
}
</style>
