<template>
    <footer class="v-footer-bar">
        <a class="git-section" href="https://github.com/WilliaamKing/Encoder" target="_blank">
            <v-icon>mdi-github</v-icon>
            <p>Encoder</p>
        </a>

        <p>Developed by Dmitriy Shmaliuk</p>
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

    .git-section {
        display: flex;
        align-items: center;
        text-decoration: none;
        font: 400 24px "Fira Code", sans-serif;

        & .v-icon, &:visited {
            color: #ffffff;
            margin-right: 10px;
        }
    }
</style>