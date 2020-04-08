<template>
  <div id="app">
    <transition name='fade'>
      <router-view @authentication-error='showMessage'></router-view>
    </transition>
  </div>
</template>

<script>
import {store} from './store/index';
import {mapState, mapActions} from 'vuex';

export default {
  name: 'App',
  computed:{
    ...mapState(['currentUser', 'users']),
    currentRoute(){
      return this.$route.path;
    }
  },
  watch: {
    currentRoute(newPath){
        this.setCurrentPath(newPath);
    },
    currentUser(){
      this.updateLocalStorage();
      this.currentUser.name !== '' ? this.$router.push('/') : this.$router.push('/login');
    },
    users(){
      this.updateLocalStorage();
    }
  },
  created(){
      this.uploadStore();
     this.setCurrentPath('/');
  },
  methods: {
     ...mapActions(['setCurrentUser', 'addUser']),
     setCurrentPath (newPath){
        const actualPath = {};
        const newFirstPathConditions = [this.currentUser.name !== '', newPath === '/registration'];
        actualPath.path = (newFirstPathConditions.some(el => el)) ? newPath : '/login';

        if (this.currentUser !== '' && (newPath === '/login' || newPath === '/registration'))
            actualPath.path = '/';

        if(actualPath.path !== this.$route.path){
            this.$router.push(actualPath);
        }    
     },
     uploadStore(){
        const defaultUser = { name: '',  password: '', historyOfCoding: []};

        if (localStorage.getItem('encoder-users') === null) {
           localStorage.setItem('encoder-users', JSON.stringify({ currentUser: defaultUser, users: []}));
        }

        const ENCODER_USERS = JSON.parse(localStorage.getItem('encoder-users'));
        this.setCurrentUser(ENCODER_USERS.currentUser);

        ENCODER_USERS.users.map((el)=> this.addUser(el));
     },
     showMessage(message){
        alert(message);
     },
     updateLocalStorage(){
       localStorage.setItem('encoder-users', JSON.stringify(this.$store.state));
     }
  },
  store
}
</script>

<style lang="scss">
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

      & /deep/ header h2 {
        font: 400 56px 'Permanent Marker', sans-serif;;
      }

      & /deep/ button, & /deep/ a {
      font: 400 12px 'Arial', sans-serif;
      }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
