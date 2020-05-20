<template>
  <div class="aside-user-info-wrap">
    <div class="aside-user-info">
      <router-link :to="{ name: 'Settings' }" >
        <div class="aside-user-avatar">
          <i class="el-icon-user-solid"></i>
        </div>
      </router-link>
      <span class="aside-user-name">{{ fullName }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AsideUserInfo',
  computed: {
    ...mapGetters('user', ['fullName']),
  },
};
</script>

<style scoped>
.aside-user-info-wrap {
  background-color: #6d47b8;
  box-shadow: 0 30px 20px -15px rgb(101, 64, 180) ;
}

.aside-user-info {
  padding: 20px 10px;
  display: flex;
  align-items: center;
}

.aside-user-avatar {
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.aside-user-name {
  font-size: 16px;
  color: #fff;
  margin-left: 15px;
}
</style>
