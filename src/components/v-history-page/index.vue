<template>
    <div class="v-history-page">
       <header>
            <h2>History</h2>
        </header>

        <div class="message" v-if="isHistoryEmpty">
            <h3>The history is empty</h3>
        </div>

        <v-history-card v-for="(record, index) in currentUserHistory"
                        :date="record.date"
                        :operation-name="record.operation"
                        :algorithm="record.algorithm"
                        :encoding-text="record.encodingText"
                        :decoding-text="record.decodingText"
                        :coding-key="record.key"
                        :key="getKey('history-record', index)">
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
            currentUserHistory: [],
       }
    },
    computed: {
        isHistoryEmpty (){
            return this.currentUserHistory.length === 0;
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
        max-width: 1024px;
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

    .message {
        font-family: 'Fira Code', sans-serif;
        text-align: center;
        color: #ff000e;
    }
</style>