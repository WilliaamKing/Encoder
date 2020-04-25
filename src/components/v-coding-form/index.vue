<template>
    <div class="v-coding-form">
        <header>
            <h2>{{name}}</h2>
        </header>

         <v-select :items="algorithms"
                   color="#ffffff"
                   :label="selectLabel">
        </v-select>

        <v-encoder-textarea label="Encoding text"></v-encoder-textarea>
        <v-encoder-textarea label="Decoding text"></v-encoder-textarea>
    </div>
</template>

<script>
import VEncoderTextarea from '../v-encoder-textarea/index.vue';

export default {
    name: "v-coding-form",
    data (){
        return {
             algorithms: [
                 'Morse code',
                 'Caesar\'s code',
                 'Atbash Cipher',
                 'Vernam cipher',
                 'Codeword Code',
                 'Playfer Code'
             ],
        }
    },
    computed: {
        name (){
            return (this.$route.path + ' form').slice(1);
        },
        selectLabel (){
            return `Alogorithm of ${this.$route.path.slice(1, this.$route.path.length - 1)}ing`;
        }
    },
    components: {
        VEncoderTextarea
    }
}
</script>

<style lang="scss">
    .v-coding-form {
        width: 100%;
        max-width: 1024px;

        & header {
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

        & .v-select {
            height: 60px;
        }

        & div.v-coding-form .theme--light.v-label, .theme--light.v-icon,
        & div.theme--light.v-select .v-select__selection--comma,
        & label.theme--light.v-label {
            color: #ffffff;
        }

        & div.theme--light.v-text-field {
            &:not(.v-input--has-state):hover > .v-input__control > .v-input__slot:before,
            & > .v-input__control > .v-input__slot:before {
                transition: none;
                border-color: #ffffff; 
            }
        }

        & div.v-text-field.v-input--is-focused > .v-input__control > .v-input__slot:after {
            transition: none;
            transform: none;
        }

        & .v-input--is-focused div.v-menu {
            display: block;

            & > div.v-menu__content {
                top: 33px !important;
                left: 0px !important;
            }
        }
    }
</style>