import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import VAuthenticationForm from './components/v-authentication-form/index';
import {connectStyle} from './common/connectStyleScript';

Vue.config.productionTip = false;
Vue.use(VueRouter);

connectStyle();

const routes = [
  {
    path: '/',
    component: VAuthenticationForm
  }
];

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
