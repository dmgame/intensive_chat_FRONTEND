import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import SocketPlugin from './plugins/socket';
import '@/plugins/element-ui';
import passedTime from './filters/passedTime';

Vue.config.productionTip = false;

Vue.filter('passedTime', passedTime);

Vue.use(new SocketPlugin({
  url: process.env.VUE_APP_SOCKET_URL,
}));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
