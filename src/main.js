import Vue from 'vue';
import App from './App.vue';
import {connectStyle} from './connectStyleScript';
import {router} from './plugins/router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
connectStyle();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
