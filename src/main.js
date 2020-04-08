import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import AuthenticationForm from './components/authentication-form/index';
import RegistrationForm from './components/registration-form/index';
import {connectStyle} from './common/connectStyleScript';

Vue.config.productionTip = false;
Vue.use(VueRouter);

connectStyle();

const routes = [
  {
    path: '/login',
    component: AuthenticationForm
  },
  {
    path: '/registration',
    component: RegistrationForm
  }
];

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
