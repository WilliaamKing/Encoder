<template>
    <div :class="['v-encoder-textarea', componentClasses]">
        <p class="label">{{label}}</p>
        <textarea v-model="value"
                  :readonly="readonly"
                  @focus="onFocusHandler" 
                  @focusout="onFocusoutHandler">
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
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        componentClasses (){
            return { focus: this.isActive }
        }
    },
    methods: {
        active() {
            this.isActive = true;
        },
        disactive () {
            this.isActive = false;
        },
        isValueEmpty () {
            return this.value.length === 0;
        },
        onFocusHandler (){
            this.active();
        },
        onFocusoutHandler (){
            if (this.isValueEmpty ()) {
                this.disactive ();
            }
        }
    },
    watch: {
        value (to){
            to.length !== 0 ? this.active() : this.disactive(); 
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
            box-shadow: 0px 0px 4px 0px #000000;
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

        &.focus .label {
            transform: translate(0px, 0px);
            color: #ffffff;
        }
    }
</style>


