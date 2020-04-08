import Vue from 'vue';
import VueRouter from 'vue-router';
import VAuthenticationForm from '@/components/v-authentication-form/index.vue';
import VRegistrationForm from '@/components/v-registration-form/index.vue';
import VRestoreForm from '@/components/v-restore-form/index.vue';

Vue.use(VueRouter);

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

  
  export const router = new VueRouter({routes});