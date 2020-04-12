<template>
  <div id="app">
    <transition name='fade' appear>
      <v-application-bar v-if="isUserAuthenicated" 
                         @sign-out="signOutHandler"
                         @delete-account="deleteAccountHandler">
      </v-application-bar>
      <router-view @authentication-error='showMessage'></router-view>
    </transition>

    <v-dialog v-model="isShowDialog" max-width="360">
         <v-card>
              <v-card-title class="headline">
                  <h2>Message</h2>
              </v-card-title>

              <v-card-text>{{dialogMessage}}</v-card-text>

              <v-card-actions>
                  <template v-if="isError">
                      <v-btn text @click="closeDialog">OK</v-btn>
                  </template>

                  <template v-if="isQuestion">
                     <v-btn  text @click="positiveAnswerAction">Yes</v-btn>
                     <v-btn  text @click="closeDialog">No</v-btn>
                  </template>
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
      dialogMessage: '',
      isError: false,
      isQuestion: false,
      positiveAnswerAction: null,
    }
  },
  components: {
      VApplicationBar
  },
  computed:{
    ...mapState(['currentUser', 'users']),
    isUserAuthenicated (){
      return this.currentUser.name !== '';
    },
    isShowDialog: {
       get: function (){
        return this.isError || this.isQuestion;
      },

      set: function (value){
        this.isError = this.isQuestion = value;
      }
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
     ...mapActions(['setCurrentUser', 'addUser', 'resetCurrentUser', 'setError', 'deleteCurrentUser']),
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
        this.dialogMessage = message;
     },
     closeDialog() {
      this.isShowDialog = false;
     },
     updateLocalStorage() {
       localStorage.setItem('encoder-users', JSON.stringify(this.$store.state));
     },
     deleteAccountHandler(){
        this.showQuestion('Are you sure that you want to delete account?');

        this.positiveAnswerAction = () => {
            this.deleteCurrentUser();
            this.closeDialog();
        };
     },
     signOutHandler(){
       this.showQuestion('Are you sure that you want to sign out?');

       this.positiveAnswerAction = () => {
          this.resetCurrentUser();
          this.closeDialog();
       }
     },
     showQuestion (message){
       this.dialogMessage = message;
       this.isQuestion = true;
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