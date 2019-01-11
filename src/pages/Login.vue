<template>
    <div class = 'container-content-centered bg-gradient' v-if = 'loginLoading'>
        <loader></loader>
    </div>
    
    <div v-else class = 'container-content-centered bg-gradient p-a-1'> 
            <div class = 'container-500'>
                    <alert :show = 'verificationError' :message = '"Your credentials have expired, please log in again."' />
                    <alert :show = 'loginError' :message = 'loginError' />
                    <form @submit.prevent = 'logIn({email: email, password: password})' class = 'p-a-2 bg-white box'>
                        <h3 class = 'p-b-2 font-light text-center'>Log In</h3>
                        <label>Email</label>
                        <input class = 'input-block m-b-1' type = 'email' required v-model = 'email' />
                        <label>Password</label>
                        <input class = 'input-block m-b-1'   type = 'password' required v-model = 'password'/>
                        <button class = 'button-block button-orange m-b-1' type = 'submit'>Submit</button>
                        <router-link class = 'form__link' to = '/register'>Create an account</router-link>
                    </form>
            </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import Alert from '../components/Alert';
    import Loader from '../components/Loader';
    export default {
        
        components: {
            'alert': Alert  ,
            'loader': Loader
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