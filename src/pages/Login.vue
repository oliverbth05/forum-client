<template>
    <div class = 'container-content-centered bg-gradient' v-if = 'loginLoading'>
        <v-progress-circular
        :size="70"
        :width="5"
        color = 'rgb(255, 255, 255)'
        indeterminate
        ></v-progress-circular>
    </div>
    
    <div v-else class = 'container-content-centered bg-gradient'>
            <div class = 'container-600'>
                    <alert :show = 'verificationError' :message = '"Your credentials have expired, please log in again."' />
                    <alert :show = 'loginError' :message = 'loginError' />
                    <form @submit.prevent = 'logIn({email: email, password: password})' :class = "{'form-error form' : loginError, 'form' : !loginError}">
                        <h1 class = 'center'>Log In</h1>
                        <label class = 'label'>Email</label>
                        <input class = 'input' type = 'email' required v-model = 'email' />
                        <br />
                        <br />
                        <label class = 'label'>Password</label>
                        <input  type = 'password' required v-model = 'password' class = 'input'/>
                        <br />
                        <br />
                        <button type = 'submit' class = 'button-block btn-orange'>Submit</button>
                        <br />
                        <router-link class = 'form__link' to = '/register'>Create an account</router-link>
                    </form>
            </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import Alert from '../components/Alert';
    export default {
        
        components: {
            'alert': Alert  
        },
        
        data() {
            return {
                email: '',
                password: ''
            }
        },
        
        computed: {
            ...mapGetters(['loginError', 'loginLoading', 'verificationError'])  
        },
        
        methods: {
            ...mapActions(['logIn']),
            ...mapMutations(['loginErrorReset'])
        },
        
        destroyed() {
            if(this.loginError) {
                this.loginErrorReset()
            }
        }
    }
</script>