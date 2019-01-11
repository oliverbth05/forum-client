<template>
    
    <div class = 'container-content-centered bg-gradient' v-if = 'registrationLoading'>
        <loader></loader>
    </div>
    
    <div v-else class = 'container-content-centered bg-gradient p-a-1'>
            <div class = 'container-500'>
                    <alert :show = 'registrationError' :message = 'registrationError' />
                    <form @submit.prevent = 'register({email: email, password: password, username: username})' class = 'p-a-2 bg-white box'>
                        <h3 class = 'p-b-2 font-light text-center'>Register</h3>
                        
                        <label>Email</label>
                        <input class = 'input-block m-b-1' type = 'email' required v-model = 'email' />
                 
                        <label>Username</label>
                        <input class = 'input-block m-b-1' type = 'text' required v-model = 'username' />
                     
                        <label>Password</label>
                        <input class = 'input-block m-b-1' type = 'password' required v-model = 'password'/>
                     
                        <label>Confirm Password</label>
                        <input class = 'input-block m-b-1' type = 'password' required v-model = 'confirmPassword'/>
                      
                        <button type = 'submit' class = 'button-block button-orange m-b-1'>Submit</button>
                      
                        <router-link class = 'form__link' to = '/login'>Already have an account?</router-link>
                    </form>
            </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import Alert from '../components/Alert';
    import Loader from '../components/Loader';
    
    export default {
        
        components: {
            'alert': Alert,
            'loader': Loader
        },
        
        data() {
            return {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        },
        
        computed: {
            ...mapGetters(['registrationError', 'registrationLoading'])  
        },
        
        methods: {
            ...mapActions(['register']),
            ...mapMutations(['registrationErrorReset'])
        },
        
        destroyed() {
            if(this.registrationError) {
                this.registrationErrorReset()
            }
        }
    }
</script>