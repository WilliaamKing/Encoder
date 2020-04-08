import Vue from 'vue';
import App from './App.vue';
import {router} from './router/index';
import {connectStyle} from './common/connectStyleScript';

Vue.config.productionTip = false;
connectStyle();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
