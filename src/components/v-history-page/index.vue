<template>
    <div class="v-history-page">
       <header>
            <h2>History</h2>
        </header>

        <v-history-card v-for="(reccord, index) in currentUserHistory"
                        :date="reccord.date"
                        :operation-name="reccord.operation"
                        :algorithm="reccord.alhorithm"
                        :encoding-text="reccord.encodingText"
                        :decoding-text="reccord.decodingText"
                        :coding-key="reccord.key"
                        :key="getKey('history-reccord', index)">
        </v-history-card>
    </div>
</template>

<script>
import VHistoryCard from '../v-history-card/index.vue';
import {mapActions} from 'vuex';

export default {
    name: 'v-history-page',
    data () {
       return {
            currentUserHistory: null,
       }
    },
    methods: {
        ...mapActions (['getCurrentUserHistory']),
        getKey (id, index) {
            return `${id}-${index}`;
        }
    },
    components: {
        VHistoryCard
    },
    created (){
        this.getCurrentUserHistory()
            .then (result => this.currentUserHistory = result)
            .catch(() => console.log('user history didn\'t find'));
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

    .v-history-card {
        margin-bottom: 5px;
    }
</style>