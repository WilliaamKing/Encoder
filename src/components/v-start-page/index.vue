<template>
   <div class="v-start-page">
        <header v-html="welcomeMessage"></header>
        <v-information-section v-for="(section, index) in sections"
                               v-bind="section"
                               :key="getKey('section', index)"
                               @click.native = "goToPage(section.id)"></v-information-section>
   </div>
</template>

<script>
import VInformationSection from '../v-information-section/index.vue';
import {mapState} from 'vuex';
import hackingIcon from './media/images/hacking-icon.png';
import decodingIcon from './media/images/decoding-icon.png';
import historyIcon from './media/images/history-icon.png';
import codingIcon from './media/images/coding-icon.png';

export default {
    name: 'v-start-page',
    data(){
        return {
            sections: [
                {
                    title: 'Encode',
                    id: 'encode',
                    description: 'Encoding data using some famous encoding algorithms',
                    color: '#ffffff',
                    image: codingIcon,
                    imagePosition: 'right',
                    status: "beta version",
                },
                {
                    title: 'Decode',
                    id: 'decode',
                    description: 'Decoding data using some famous encoding algorithms',
                    color: '#ffffff',
                    image: decodingIcon,
                    imagePosition: 'left',
                    status: "beta version",
                },
                 {
                    title: 'Find open key',
                    id: 'find-key',
                    description: 'Key selection for data decoding',
                    color: '#ffffff',
                    image: hackingIcon,
                    imagePosition: 'right',
                    status: "beta version",
                },
                {
                    title: 'History',
                    id: 'history',
                    description: 'History of using this application',
                    color: '#ffffff',
                    image: historyIcon,
                    imagePosition: 'left',
                    status: "beta version",
                }
            ]
        }
    },
    computed: {
        ...mapState(['currentUser']),
        welcomeMessage (){
            return `<h2>Hello ${this.currentUser.name}</h2>
                    <p>What do want to do today?</p>`;
        }
    },
    methods: {
        getKey(id, index){
            return `${id}-${index}`;
        },
        goToPage (path) {
            this.$router.push(path.toLowerCase());
        }
    },
    components: {
        VInformationSection
    }
}
</script>

<style lang="scss" scoped>
    .v-start-page {
        max-width: 1024px;
        width: 100%;

        & header {
            font-family: "Fira Code", monospace;
            font-weight: 500;
            color: #ffffff;
        }
    }

    .v-information-section {
         font-family: 'Fira Code', sans-serif;
    }
</style>