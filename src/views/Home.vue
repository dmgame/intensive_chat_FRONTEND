<template>
  <div class="home">
    <div class="chat-wrap">
      <Aside />
      <CurrentChat />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Aside from '@/components/Aside.vue';
import CurrentChat from '@/components/CurrentChat.vue';

export default {
  name: 'Home',
  components: {
    Aside,
    CurrentChat,
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async onClick() {
      await this.logout();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: #dcb4f2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-wrap {
  display: grid;
  grid-template-columns: minmax(10%, 40%) minmax(60%, 90%);
  width: 100%;
  max-width: 1100px;
  height: 100%;
  max-height: 90%;
  box-shadow: 0 3px 10px rgba(105, 50, 201, 0.4);
}
</style>
