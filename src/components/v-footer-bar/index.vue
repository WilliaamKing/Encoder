<template>
    <footer class="v-footer-bar">
        <slot></slot>
    </footer>
</template>

<script>
export default {
    name: "v-footer-bar"
}
</script>

<style lang="scss" scoped>
    .v-footer-bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 1024px;
        height: 50px;
        margin: 20px auto;
        color: #ffffff;
    }
</style>