<template>
    <div class="v-history-page">
       <header>
            <h2>History</h2>
        </header>

        <v-history-card></v-history-card>
    </div>
</template>

<script>
import VHistoryCard from '../v-history-card/index.vue';

export default {
    name: 'v-history-page',
    components: {
        VHistoryCard
    }
}
</script>

<style lang="scss" scoped>
    .v-history-page {
        width: 100%;
    }

    header {
        margin-bottom: 10px;
        font: 400 24px 'Fira Code', sans-serif;
        text-align: center;
        color: #ffffff;

        & h2 {
            font-weight: 400;
        }

        & h2:first-letter {
            text-transform: uppercase;
        }
    }
</style>