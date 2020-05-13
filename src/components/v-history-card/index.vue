<template>
    <div class="v-history-card">
        <div class="main-information information">
            <h3>Operation: {{this.operationName}}</h3>
            <h4>Algorithm: {{this.algorithm}}</h4>

            <div>
                <p class="article-date">{{formatedDate}}</p>
                <button @click="openAdditionalInformation">More</button>
            </div>
        </div>

        <div :class="additionInformationClasses">
            <div>
                <p><b>Encoding text: </b>{{encodingText}}</p>
            </div>

            <div :class="{active: this.activatedDecodedSection}">
                <p><b>Decoding text: </b>{{decodingText}}</p>
            </div>

            <div v-if="showedKeySection">
                <p><b>Key: </b>{{coddingKey}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {getDateString} from 'auxiliary-functions';

    export default {
        name: 'v-history-card',
        data (){
            return {
                isAdditionalInformationOpened: false,   
            }
        },
        props: {
            date: {
                type: Date,
                default: () => new Date ()
            },
            operationName: {
                type: String,
                default: 'operation name'
            },
            algorithm: {
                type: String,
                default: 'algorithm name'
            },
            encodingText: {
                type: String,
                default: ''
            },
            decodingText: {
                type: String,
                default: ''
            },
            coddingKey: {
                type: Number,
                default: null
            }
        },
        computed: {
            formatedDate () {
                return getDateString(this.date);
            },
            additionInformationClasses () {
                return [ 'additional-information', 
                         'information', 
                         {opened: this.isAdditionalInformationOpened} ];
            },
            activatedDecodedSection () {
                return this.operationName === "decoding";
            }
        },
        methods: {
            openAdditionalInformation () {
                return this.isAdditionalInformationOpened = !this.isAdditionalInformationOpened;
            },
            showedKeySection () {
                return this.coddingKey !== null;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-history-card {
        position: relative;
        width: 100%;
    }
    
    .information {
        box-sizing: border-box;
        width: 100%;
        padding:  10px;
        font-size: 16px;
        text-align: left;
        background-color: #ffffff;
        border-radius: 4px;
        color: #000000;
    }

    .main-information {
        position: relative;
        height: 101px;
        box-shadow: 0px 0px 4px 0px #000000;
        z-index: 2;

        & > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;
        }

        & h3 {
            font-size: 24px;
        }

        & h4 {
            font-size: 18px;
        }

        & button {
            outline: none;
        }
    }

    .article-date {
        font-family: "Fira Code", sans-serif;
        font-weight: 500;
        text-align: left; 
    }

    .additional-information {
        position: absolute;
        top: 81px;
        display: flex;
        flex-direction: column;
        max-height: 0px;
        overflow: hidden;
        border-radius: 0px 0px 8px 8px;
        transition: max-height 2s ease-in-out;

        &.opened {
            max-height: 2000px;
        }
        
        & > div {
            margin-top: 20px;
        }

        & > div.active {
            order: -1;
        }
    }
</style>