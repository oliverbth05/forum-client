<template>
    
    <div class = 'container-content-centered bg-gradient' v-if = 'registrationLoading'>
        <v-progress-circular
        :size="70"
        :width="5"
        color = 'rgb(255, 255, 255)'
        indeterminate
        ></v-progress-circular>
    </div>
    
    <div v-else class = 'container-content-centered bg-gradient'>
            <div class = 'container-600'>
                    <alert :show = 'registrationError' :message = 'registrationError' />
                    <form @submit.prevent = 'register({email: email, password: password, username: username})' :class = "{'form-error form' : registrationError, 'form' : !registrationError}">
                        <h1 class = 'center'>Register</h1>
                        <label class = 'label'>Email</label>
                        <input class = 'input' type = 'email' required v-model = 'email' />
                        <br />
                        <br />
                        <label class = 'label'>Username</label>
                        <input class = 'input' type = 'text' required v-model = 'username' />
                        <br />
                        <br />
                        <label class = 'label'>Password</label>
                        <input  type = 'password' required v-model = 'password' class = 'input'/>
                        <br />
                        <br />
                        <label class = 'label'>Confirm Password</label>
                        <input  type = 'password' required v-model = 'confirmPassword' class = 'input'/>
                        <br />
                        <br />
                        <button type = 'submit' class = 'button-block btn-orange'>Submit</button>
                        <br />
                        <router-link class = 'form__link' to = '/login'>Already have an account?</router-link>
                    </form>
            </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import Alert from '../components/Alert';
    export default {
        
        components: {
            'alert': Alert  
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