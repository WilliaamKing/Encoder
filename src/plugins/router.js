import Vue from 'vue';
import VueRouter from 'vue-router';
import VStartPage from '@/components/v-start-page/index.vue';
import VAuthenticationForm from '@/components/v-authentication-form/index.vue';
import VRegistrationForm from '@/components/v-registration-form/index.vue';
import VCodingForm from '@/components/v-coding-form/index.vue';
import VHistoryPage from '@/components/v-history-page/index.vue';

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
      component: VCodingForm
    },
    {
      path: '/decode',
      component: VCodingForm
    },
    {
      path: '/history',
      component: VHistoryPage
    }
  ];

  export const router = new VueRouter({routes});