<template>
    <div class="v-coding-form">
        <header>
            <h2>{{name}}</h2>
        </header>

         <v-select :items="algorithms"
                   :label="selectLabel"
                   color="#ffffff"
                   v-model="selectValue">
        </v-select>

        <v-icon class="swap" @click="flip">mdi-swap-vertical</v-icon>

        <div class="coding-inputs">
            <v-encoder-textarea :class="{active: isActive.encode, disactive: !isActive.encode}"
                                id="encodingInput"
                                :readonly="!isActive.encode"
                                ref="encodingInput" 
                                label="Encoding text"
                                v-model="encodingValue">
            </v-encoder-textarea>

            <v-encoder-textarea :class="{active: isActive.decode, disactive: !isActive.decode}" 
                                id="decodingInput"
                                :readonly="!isActive.decode"
                                ref="decodingInput"
                                label="Decoding text"
                                v-model="decodingValue">
            </v-encoder-textarea>
        </div>

        <button class="coding-button" @click="code">{{buttonText}}</button>
        <router-link class="exit-button" to='/'>Back</router-link>
    </div>
</template>

<script>
import VEncoderTextarea from '../v-encoder-textarea/index.vue';
import {encoding as morseEncoding, decoding as morseDecoding} from 'encoding-module/morse.js';

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
             selectValue: null,
             encodingValue: '',
             decodingValue: ''
        }
    },
    computed: {
        name (){
            return (this.$route.path + ' form').slice(1);
        },
        buttonText (){
            return (this.$route.path === '/encode') ? 'Encoding' : 'Decoding';
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
            this.$router.replace(newPath);
        },
        setActiveSection (section){
            this.activeSection = section;
        },
        code (){
            const currentPath = this.$route.path.slice(1);
            currentPath === 'encode' ? this.encode () : this.decode (); 
        },
        encode () {
            switch (this.selectValue) {
                case 'Morse code': {
                    this.decodingValue = morseEncoding(this.encodingValue);
                    break;
                }
            }
        },
        decode () {
            switch (this.selectValue) {
                case 'Morse code': {
                    this.encodingValue = morseDecoding(this.decodingValue);
                    break;
                }
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
                transition: top 500ms linear;

                &.active {
                    top: 0px;
                    animation: rescale 500ms both;
                }

                &.disactive {
                    top: 226px;
                    animation: scale 500ms both;
                }

                & textarea {
                    font-family: monospace;
                    font-size: 14px;
                }
            }
        }

        & .swap {
            position: absolute;
            top: 105px;
            right: 0px;
            z-index: 3;
        }

        & .v-text-field .v-label--active {
            transform: translateY(-16px) translateX(-20px) scale(0.75);
        }

        &  .coding-button {
            width: 100%;
            height: 42px;
            margin: 15px 0;
            background: #16a086;
            color: #ffffff;
            border: none;
            outline: none;
        }

        & .exit-button {
            display: block;
            font-size: 12px;
            text-align: center;
            text-decoration: none;
            color: #ffffff;
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