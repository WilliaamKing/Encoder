<template>
   <div class="v-start-page">
        <header v-html="welcomeMessage"></header>
   </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'v-start-page',
    computed: {
        ...mapState(['currentUser']),
        welcomeMessage (){
            return `<h2>Hello ${this.currentUser.name}</h2>
                    <p>What do want to do today?</p>`;
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-start-page {
        transform: translateY(75px);
        max-width: 1024px;
        width: 100%;
    }

    header {
        font-family: "Fira Code", monospace;
        font-weight: 500;
        color: #ffffff;
    }
</style>