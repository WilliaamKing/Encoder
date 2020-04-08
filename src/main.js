import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import VAuthenticationForm from './components/v-authentication-form/index.vue';
import VRegistrationForm from './components/v-registration-form/index.vue';
import VRestoreForm from './components/v-restore-form/index.vue';
import {connectStyle} from './common/connectStyleScript';

Vue.config.productionTip = false;
Vue.use(VueRouter);

connectStyle();

const routes = [
  {
    path: '/login',
    component: VAuthenticationForm
  },
  {
    path: '/registration',
    component: VRegistrationForm
  },
  {
    path: '/restore-password',
    component: VRestoreForm
  }
];

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
