<template>
    <div class="v-coding-form">
        <header>
            <h2>{{name}}</h2>
        </header>

         <v-select :items="algorithms"
                   :label="selectLabel"
                   color="#ffffff">
        </v-select>

        <v-icon class="swap" @click="flip">mdi-swap-vertical</v-icon>

        <div class="coding-inputs">
            <v-encoder-textarea :class="{active: isActive.encode, disactive: !isActive.encode}"
                                id="encodingInput"
                                :readonly="!isActive.encode"
                                ref="encodingInput" 
                                label="Encoding text">
            </v-encoder-textarea>

            <v-encoder-textarea :class="{active: isActive.decode, disactive: !isActive.decode}" 
                                id="decodingInput"
                                :readonly="!isActive.decode"
                                ref="decodingInput"
                                label="Decoding text">
            </v-encoder-textarea>
        </div>
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
        isActive (){
            return {
                encode: this.$route.path !== '/decode',
                decode: this.$route.path === '/decode',
            }
        },
        selectLabel (){
            return `Alogorithm of ${this.$route.path.slice(1, this.$route.path.length - 1)}ing`;
        }
    },
    methods: {
        flip (){
            const newPath = this.$route.path === '/encode' ? 'decode' : 'encode';
            this.$router.push(newPath);
            this.changeTranslateText();
        },
        changeTranslateText(){
            if (this.isActive.encode) {
                this.$refs.encodingInput.value = this.$refs.decodingInput.value;
                this.$refs.decodingInput.value = '';
            }
            else {
                this.$refs.decodingInput.value = this.$refs.encodingInput.value;
                this.$refs.encodingInput.value = '';
            }
        }
    },
    components: {
        VEncoderTextarea
    }
}
</script>

<style lang="scss">
    .v-coding-form {
        position: relative;
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
        
        & .coding-inputs {
            position: relative;
            width: 100%;
            height: 450px;

            & .v-encoder-textarea {
                position: absolute;
                width: 100%;
                transition: top 1s linear;

                &.active {
                    top: 0px;
                    animation: rescale 1s both;
                }

                &.disactive {
                    top: 226px;
                    animation: scale 1s both;
                }

                & textarea {
                    font-family: 'Fira Code', sans-serif;
                }
            }
        }

        & .swap {
            position: absolute;
            top: 103px;
            right: 10px;
            z-index: 3;
        }
    }

    @keyframes scale {
        0%, 100% {
            transform: scale(1.0);
            z-index: 2;
        }
        50% {
            transform: scale(1.04);
        }
    }

     @keyframes rescale {
        0%, 100% {
            transform: scale(1.0);
            z-index: 1;
        }
        50% {
            transform: scale(0.96);
        }
    }
</style>