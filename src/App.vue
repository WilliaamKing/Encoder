<template>
  <div id="app">
    <router-view></router-view>
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
      this.currentUser.name !== '' ? this.$router.push('/home-page') : this.$router.push('/');
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
        actualPath.path = (this.currentUser.userName !== '') ? newPath : '/';

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

  .v-authentication-form {
    align-self: center;
    margin: 20px;
  }

  .v-authentication-form /deep/ header h2{
      font: 400 56px 'Permanent Marker', sans-serif;;
  }

  .v-authentication-form /deep/ form p{
     font: 400 12px 'Arial', sans-serif;
  }
</style>
