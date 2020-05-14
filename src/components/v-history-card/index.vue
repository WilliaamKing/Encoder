<template>
    <div class="v-history-card">
        <p class="article-date">{{formatedDate}}</p>

        <div class="main-information information">
            <h3>Operation: {{this.operationName}}</h3>
            <h4>Algorithm: {{this.algorithm}}</h4>

            <div class="additional-information">
                <div>
                    <p><b>Encoding text: </b>{{encodingText}}</p>
                </div>

                <div :class="{active: this.activatedDecodedSection}">
                    <p><b>Decoding text: </b>{{decodingText}}</p>
                </div>

                <div v-if="showedKeySection">
                    <p><b>Key: </b>{{codingKey}}</p>
                </div>
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
                type: String,
                default: new Date ().toString()
            },
            operationName: {
                type: String,
                validator: value => ['encoding', 'decoding'].indexOf(value) != -1
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
            codingKey: {
                default: null
            }
        },
        computed: {
            formatedDate () {
                return getDateString(new Date(this.date));
            },
            activatedDecodedSection () {
                return this.operationName === 'decoding'
            },
            showedKeySection () {
                return this.codingKey !== null;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-history-card {
        position: relative;
        width: 99%;
    }

    .main-information {
        box-sizing: border-box;
        box-shadow: 0px 0px 4px 0px #000000;
        width: 100%;
        padding:  10px;
        font-size: 16px;
        text-align: left;
        background-color: #ffffff;
        border-radius: 4px;
        color: #000000;

        & h3 {
            font-size: 24px;
        }

        & h4 {
            margin-top: 10px;
            font-size: 18px;
        }
    }

    .article-date {
        font-family: "Fira Code", sans-serif;
        font-weight: 500;
        text-align: left; 
        color: #ffffff;
    }

    .additional-information {
        & > div {
            margin-top: 10px;
        }
    }
</style>