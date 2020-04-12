<template>
  <div id="app">
    <transition name='fade' appear>
      <v-application-bar v-if="isUserAuthenicated" @sign-out="reserCurrentUser"></v-application-bar>
      <router-view @authentication-error='showMessage'></router-view>
    </transition>

    <v-dialog v-model="isError" max-width="360">
         <v-card>
              <v-card-title class="headline">
                  <h2>Error</h2>
              </v-card-title>

              <v-card-text>
                  {{errorMessage}}
              </v-card-text>

              <v-card-actions>
                  <v-btn color="#21b8c6" text @click="closeErrorCard">
                      OK
                  </v-btn>
              </v-card-actions>
          </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {store} from './store/index';
import {mapState, mapActions} from 'vuex';
import VApplicationBar from './components/v-application-bar/index.vue';

export default {
  name: 'App',
  data (){
    return {
      errorMessage: '',
      isError: false,
    }
  },
  components: {
      VApplicationBar
  },
  computed:{
    ...mapState(['currentUser', 'users']),
    isUserAuthenicated (){
      return this.currentUser.name !== '';
    }
  },
  watch: {
    $route (to) {
      this.setCurrentPath(to.path)
    },
    currentUser() {
      this.updateLocalStorage();
      this.isUserAuthenicated ? this.$router.push('/') : this.$router.push('/login');
    },
    users() {
      this.updateLocalStorage();
    },
    isError(to) {
      this.setError({status: to});
    }
  },
  created() {
     this.uploadStore();
     this.setCurrentPath('/');
  },
  methods: {
     ...mapActions(['setCurrentUser', 'addUser', 'reserCurrentUser', 'setError']),
     setCurrentPath (newPath) {
        const actualPath = {};
        const newFirstPathConditions = [this.isUserAuthenicated, newPath === '/registration'];
        actualPath.path = (newFirstPathConditions.some(el => el)) ? newPath : '/login';

        if (this.isUserAuthenicated && (newPath === '/login' || newPath === '/registration'))
            actualPath.path = '/';

        if(actualPath.path !== this.$route.path) {
            this.$router.push(actualPath);
        }    
     },
     uploadStore() {
        const defaultUser = { name: '',  password: '', historyOfCoding: []};

        if (localStorage.getItem('encoder-users') === null) {
           localStorage.setItem('encoder-users', JSON.stringify({ currentUser: defaultUser, users: []}));
        }

        const ENCODER_USERS = JSON.parse(localStorage.getItem('encoder-users'));
        this.setCurrentUser(ENCODER_USERS.currentUser);

        ENCODER_USERS.users.map((el)=> this.addUser(el));
     },
     showMessage(message) {
        this.isError = true;
        this.errorMessage = message;
     },
     closeErrorCard() {
       this.isError = false;
     },
     updateLocalStorage() {
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
    align-content: center;
    min-width: 360px;
    width: 100%;
    height: 100%;
    padding: 0 25px;
    background: rgb(0,159,194);
    background: linear-gradient(159deg, rgba(0,159,194,1) 0%, rgba(13,10,11,1) 100%);
  }

  .form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

      & h2 {
        font: 400 56px 'Permanent Marker', sans-serif;
      }

      & button, & a {
        font: 400 12px 'Arial', sans-serif;
      }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

    div.v-dialog__container {
      display: block;
     
       & .v-card {
           & .v-card__title {
               padding: 16px 0px 10px 15px;

               & h2 {
                   font: 700 24px 'Arial', sans-serif;
                   color: #16a086;
               }
           }

           & .v-card__text {
               padding: 0px 0px 5px 15px;
           }

           & .v-card__actions {
               display: flex;
               justify-content: flex-end;
               padding-top: 0px;
               padding-right: 0px;

               & .v-btn {
                   font-weight: 700;
                   color: #16a086;
               }
           }
       }
    }
</style>