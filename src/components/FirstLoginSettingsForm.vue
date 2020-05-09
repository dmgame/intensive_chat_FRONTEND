<template>
  <div class="first-setup-form-wrap">
    <ElCard class="first-setup-form">
      <div slot="header" class="clearfix">
        <h6 class="card-title">Welcome! 😜</h6>
        <p class="card-description">Let's get acquainted. Tell us about yourself.</p>
      </div>
      <ElForm
        :model="formData"
        @submit.native.prevent="onSubmit"
        ref="settingsForm"
      >
        <ElFormItem label="First name" prop="firstName" size="small">
          <ElInput type="text" v-model="formData.firstName" />
        </ElFormItem>
        <ElFormItem label="Last name" prop="lastName" size="small">
          <ElInput type="text" v-model="formData.lastName" />
        </ElFormItem>
        <ElFormItem label="Country" prop="country" size="small">
          <ElInput type="text" v-model="formData.country" />
        </ElFormItem>
        <ElFormItem label="City" prop="city" size="small">
          <ElInput type="text" v-model="formData.city" />
        </ElFormItem>
        <ElButton native-type="submit" type="primary">Submit</ElButton>
      </ElForm>
    </ElCard>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'FirstLoginSettingsForm',
  data: () => ({
    formData: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
    },
  }),
  methods: {
    ...mapActions('user', ['createUserInfo']),
    onSubmit() {
      this.$refs.settingsForm.validate((isValid) => {
        if (!isValid) return;
        this.createUserInfo({ ...this.formData });
      });
    },
  },
};
</script>

<style scoped>
.first-setup-form-wrap {
  position: relative;
  max-width: 500px;
  width: 100%;
}

.first-setup-form {
  width: 100%;
  max-width: 400px;
}

.first-setup-form-wrap::before {
  content: '';
  position: absolute;
  width: 256px;
  height: 256px;
  background: url('../assets/party-baloons.png');
  left: 0;
  transform: translateX(-70%) rotate(-45deg);
  z-index: -1;
}
.first-setup-form-wrap::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: url('../assets/dancing-party.png');
  right: 0;
  bottom: 0;
  transform: translateX(20%);
  z-index: -1;
}

.card-title {
  font-size: 20px;
  text-transform: uppercase;
}

.card-description {
  margin-top: 10px;
  color: gray;
  letter-spacing: 0.7px;
}
</style>
