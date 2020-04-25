<template>
    <div :class="['v-encoder-textarea', componentClasses]">
        <p class="label">{{label}}</p>
        <textarea class="v-encoder-textarea" 
                  v-model="value"
                  @focus="active" 
                  @focusout="disactive" >
        </textarea>
    </div>
</template>

<script>
export default {
    name: "v-encoder-textarea",
    data(){
        return {
            isActive: false,
            value: ''
        }
    },
    props: {
        label: {
            type: String,
            default: "Label"
        }
    },
    computed: {
        componentClasses (){
            return { active: this.isActive }
        }
    },
    methods: {
        active() {
            this.isActive = true;
        },
        disactive () {
            if (this.value.length === 0)
                this.isActive = false;
        }
    }
}
</script>

<style scoped lang="scss">
    .v-encoder-textarea {
        & > textarea {
            width: 100%;
            min-height: 200px;
            padding: 5px;
            margin-top: 3px;
            font-size: 11px;
            background: #ffffff;
            border-radius: 4px; 
            outline: none;
            resize: none;
            transition: border 200ms linear;

            &::selection {
                background-color: transparent;
            }  

            &::-webkit-scrollbar {
                display: none;
            }
        }

        & .label {
            transform: translate(10px, 29px);
            transition: transform 400ms linear, color 500ms linear;
        }

        &.active .label {
            transform: translate(0px, 0px);
            color: #ffffff;
        }
    }
</style>


