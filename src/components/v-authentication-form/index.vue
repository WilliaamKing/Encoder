<template>
    <div class="authentication-form form">
        <header>
            <h2>Encoder</h2>
        </header>

        <form @submit.prevent="login">
            <label for="userName"></label>
            <input id="userName" type="name" autocomplete="off"  placeholder="Username" required v-model="name"/>

            <label for="userPassword"></label>
            <input id="userPassword" type="password" autocomplete="off" placeholder="Password" required v-model="password"/>

            <button>Log in</button>

            <div class='additional-actions'>
                <router-link to='/registration'>Register</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default{
        name: 'v-authentication-form',
        data (){
            return {
                name: '',
                password: '',
            }
        },
        computed: {
            ...mapState(['users'])
        },
        methods: {
            ...mapActions(['isUser', 'setCurrentUser']),
            login(){
                this.isUser(this.name)
                    .then((result)=> this.checkUser(result),
                          (error) => console.log(error));
            },
            checkUser(result){
                if(result){
                    const { password, name } = this;
                    const searchUser = this.users.find((el)=> el.name === this.name);
                    searchUser.password === password ? this.setCurrentUser({name, password}): this.$emit('authentication-error', 'Password isn\'t correct');
                }
                else {
                    this.$emit('authentication-error', 'User wasn\'t found');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .authentication-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 550px;
        height: 500px;
        color: #cbced0;
    }

    header h2{
        margin: 15px;
    }

    form {
        width: 100%;
    }

    label {
        position: relative;
    }

    label::before {
        position: absolute;
        transform: translateY(50%);
        width: 20px;
        height: 20px;
        content: '';
    }

    label:nth-of-type(1)::before {
        background: url('../../common/media/images/user-icon.png') center/contain no-repeat;
    }

    label:nth-of-type(2)::before {
        background: url('../../common/media/images/password-icon.png') center/contain no-repeat;
    }

    input {
        display: block;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding-left: 40px;
        margin-bottom: 10px;
        font-size: 14px;
        background: none;
        border: none;
        outline: none;
        border-bottom: 1px solid #cbced0;
        color: #cbced0;
    }

    input::-webkit-input-placeholder {
        color: #cbced0;
    }

    button {
        width: 100%;
        height: 42px;
        margin: 15px 0;
        background: #16a086;
        color: #cbced0;
        border: none;
        outline: none;
    }

    .additional-actions {
        display: flex;
        justify-content: space-evenly;

        a {
            text-align: center;
            text-decoration: none;
            color: #cbced0;
            cursor: pointer;
        }
    }
</style>