<template>
    <header class="v-application-bar">
        <figure class="logo">
            <img :src="logo" alt="logo"/>
        </figure>

        <div class="actions">
            <button class="sign-out">Sign-out</button>
        </div>
    </header>
</template>

<script>
    import logo from './media/images/logo.png';

    export default {
        name: "v-application-bar",
        data (){
            return {
                logo
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-application-bar {
        position: fixed;
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
</style>