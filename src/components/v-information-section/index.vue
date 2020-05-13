<template>
    <div :class="['v-information-section', parrentBlockClasses]" :style="{backgroundColor: color}">
        <div class="status" v-if="isShow">
            {{status}}
        </div>

        <div class="information">
            <h2>{{title}}</h2>
            <p>{{description}}</p>
        </div>

        <figure>
            <img :src="image" alt="image" />
        </figure>
    </div>
</template>

<script>
export default {
    name: "v-information-section",
    props: {
        title: {
            type: String,
            default: 'Title',
        },
        description: {
            type: String,
            default: 'Description'
        },
        color: {
            type: String,
            default: '#ffffff'
        },
        image: {
            type: String,
            default: '',
        },
        imagePosition: {
            validator: value => ['left', 'right'].indexOf(value) != -1,
            default: 'left'
        },
        status: {
            validator: value => ['developed', 'beta version', 'in developing'].indexOf(value) != -1,
            default: 'developed'
        }
    },
    computed: {
        parrentBlockClasses (){
            return { 
                     left: this.imagePosition === 'left', 
                     right: this.imagePosition === 'right', 
                     block: this.status === 'in developing'
                   };
        },
        isShow (){
            return this.status !== 'developed';
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-information-section {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 175px;
        margin: 10px 0px 20px;
        padding: 10px;
        border-radius: 4px;

        &.left {
            flex-direction: row-reverse;

            & .status {
                  left: 10px;
            }
        }

        &.right {
            & .status {
                right: 10px;
            }
        }

        &.block {
            pointer-events: none;
        }

        & .status {
            position: absolute;
            top: 5px;
            min-width: 100px;
            height: 25px;
            text-align: center;
            text-transform: uppercase;
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            line-height: 25px;
            color: #ffffff;
            background: rgb(9,197,5);
            background: linear-gradient(128deg, rgba(9,197,5,1) 0%, rgba(4,110,37,1) 100%);
            border-radius: 4px;
        }

        & .information {
            flex-basis: 80%;
            padding: 0px 5px;
        }

        & figure {
            width: 175px;
            height: 100%;

            & img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>