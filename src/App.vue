<template>
  <div id="app">
    <transition name='fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {store} from './common/store/index';

export default {
  name: 'App',
  computed:{
    currentUser(){
      return store.state.currentUser;
    },
    currentRoute(){
      return this.$route.path;
    }
  },
  watch: {
    currentRoute(newPath){
        this.setCurrentPath(newPath);
    },
    currentUser(){
      this.currentUser.name !== '' ? this.$router.push('/') : this.$router.push('/login');
    }
  },
  created(){
      this.$router.push({
          path: '/home'
      });
  },
  methods: {
     setCurrentPath (newPath){
        const actualPath = {};
        const newPathConditions = [this.currentUser.userName !== '', newPath === '/registration', newPath === '/restore-password'];
        actualPath.path = (newPathConditions.some(el => el)) ? newPath : '/login';

        if(actualPath.path !== this.$route.path){
          this.$router.push(actualPath);
        }    
     }
  },
  store
}
</script>

<style>
  #app {
    display: flex;
    justify-content: center;
    align-content: space-between;
    width: 100%;
    height: 100%;
    background: rgb(0,159,194);
    background: linear-gradient(159deg, rgba(0,159,194,1) 0%, rgba(13,10,11,1) 100%);
  }

  .form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .form /deep/ header h2 {
      font: 400 56px 'Permanent Marker', sans-serif;;
  }

  .form /deep/ button, .form /deep/ a {
     font: 400 12px 'Arial', sans-serif;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
