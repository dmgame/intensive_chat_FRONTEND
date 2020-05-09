<template>
  <div class="first-login-settings-wrap">
    <FirstLoginSettingsForm />
  </div>
</template>

<script>
import FirstLoginSettingsForm from '@/components/FirstLoginSettingsForm.vue';

export default {
  name: 'FirstLoginSettings',
  components: {
    FirstLoginSettingsForm,
  },
};
</script>

<style scoped>
.first-login-settings-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
