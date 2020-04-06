<template>
    <div class="v-authentication-form">
        <form>
            <label for="userEmail"></label>
            <input id="userEmail" type="email" autocomplete="off"  placeholder="Email"/>

            <label for="userPassword"></label>
            <input id="userPassword" type="password" autocomplete="off" placeholder="Password"/>

            <button>Log in</button>
        </form>
    </div>
</template>

<script>
    export default{
        name: 'v-authentication-form',
    }
</script>

<style scoped>
    .v-authentication-form{
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        width: 550px;
        height: 500px;
    }

    form{
        width: 100%;
    }

    label{
        position: relative;
    }

    label::before{
        position: absolute;
        transform: translateY(50%);
        width: 20px;
        height: 20px;
        content: '';
    }

    label:nth-of-type(1)::before{
        background: url('./media/images/email-icon.png') center/contain no-repeat;
    }

    label:nth-of-type(2)::before{
        background: url('./media/images/password-icon.png') center/contain no-repeat;
    }

    input{
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

    input::-webkit-input-placeholder{
        color: #cbced0;
    }

    button{
        width: 100%;
        height: 42px;
        margin-top: 12px;
        background: #16a086;
        color: #cbced0;
        border: none;
        outline: none;
    }
</style>