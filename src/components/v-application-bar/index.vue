<template>
    <header class="v-application-bar">
        <figure class="logo">
            <img :src="logo" alt="logo"/>
        </figure>

        <div class="actions">
             <v-menu bottom right transition="slide-y-transition">
                <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="({action, title}, index) in additionalActions" 
                                 @click="action" :key="getKey('action', index + 1)">
                        <v-list-item-title>{{ title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
             </v-menu>
        </div>
    </header>
</template>

<script>
    import logo from './media/images/logo.png';

    export default {
        name: "v-application-bar",
        data (){
            return {
                additionalActions: [
                    { 
                      title: 'Sign out', 
                      action: this.signOut 
                    },
                    {
                      title: 'Delete account',
                      action: this.deleteAccount
                    }
                ],
                logo
            }
        },
        methods: {
            getKey (id, index){
                return `${id}-${index}`;
            },
            signOut(){
                this.$emit('sign-out');
            },
            deleteAccount(){
                this.$emit('delete-account')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-application-bar {
        position: absolute;
        top: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1024px;
        width: 100%;
        height: 70px;
        padding: 0 20px;
    }

    .logo {
        & img {
            width: 50px;
            height: 50px;
        }
    }

    .actions {
        & .v-menu {
            display: block;

            & .v-list {
                padding: 0px;
            }
        }

        & .v-btn--icon.v-size--default {
            height: 40px;
            width: 40px;

            & .v-icon {
                font-size: 32px;
            }
        }
    }
</style>