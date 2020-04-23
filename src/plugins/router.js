import Vue from 'vue';
import VueRouter from 'vue-router';
import VStartPage from '@/components/v-start-page/index.vue';
import VAuthenticationForm from '@/components/v-authentication-form/index.vue';
import VRegistrationForm from '@/components/v-registration-form/index.vue';
import VCoddingForm from '@/components/v-coding-form/index.vue';

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      component: VStartPage
    },
    {
      path: '/login',
      component: VAuthenticationForm
    },
    {
      path: '/registration',
      component: VRegistrationForm
    },
    {
      path: '/encode',
      component: VCoddingForm
    },
    {
      path: '/decode',
      component: VCoddingForm
    }
  ];

  export const router = new VueRouter({routes});