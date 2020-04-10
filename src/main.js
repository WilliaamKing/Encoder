import Vue from 'vue';
import App from './App.vue';
import {router} from './router/index';
import {connectStyle} from './common/connectStyleScript';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
connectStyle();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
