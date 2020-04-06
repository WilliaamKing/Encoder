<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    justify-content: center;
    align-content: space-between;
    width: 100%;
    height: 100%;
    background: rgb(0,159,194);
    background: linear-gradient(159deg, rgba(0,159,194,1) 0%, rgba(13,10,11,1) 100%);
  }

  .v-authentication-form{
    align-self: center;
  }
</style>
