import axios    from 'axios';
import {router} from '../../main';
const state = {
    user:null,
    token:null,
    
    loginError: null,
    loginLoading: false,

    registrationError: null,
    registrationLoading: false,
    
    verificationError: null
}

const getters = {
    token: (state) => {
        return state.token
    },
    user: (state) => {
        return state.user
    },
    loginError: (state) => {
        return state.loginError
    },
    loginLoading: (state) => {
        return state.loginLoading  
    },
    registrationError: (state) => {
        return state.registrationError
    },
    registrationLoading: (state) => {
        return state.registrationLoading
    },
    verificationError: (state) => {
        return state.verificationError
    }
}

const mutations = {
    resetToken(state) {
        state.token = null
    },
    
    logIn(state, data) {
        state.user = data.user
        state.token = data.token
    },
    logOut(state, data) {
        state.loading       = false,
        state.user          = null,
        state.token         = null,
        window.localStorage.clear()
    },
    
    startLoginLoading(state) {
        state.loginLoading = true
    },
    finishLoginLoading(state) {
        state.loginLoading = false
    },
    loginErrorDidOccur(state, message) {
        state.loginError = message
    },
    loginErrorReset(state) {
        state.loginError = null
    },
    startRegistrationLoading(state) {
        state.registrationLoading = true  
    },
    finishRegistrationLoading(state) {
        state.registrationLoading = false  
    },
    registrationErrorDidOccur(state, message) {
        state.registrationError = message
    },
    registrationErrorReset(state) {
        state.registrationError = null
    },
    verificationErrorDidOccur(state) {
        state.verificationError = true
    },
    verificationErrorReset(state) {
        state.verificationError = null
    }
    
}

const actions = {
    verificationErrorHandler(context) {
        console.log('reached')
        context.commit('verificationErrorDidOccur');
        
        setTimeout(() => {
            context.commit('verificationErrorReset')},
        5000)
    },
    logIn(context, data) {
        context.commit('startLoginLoading')
        axios.post('https://frontend-templates-oliverbth05.c9users.io:8081/user/auth/login', {
            email: data.email,
            password: data.password
        })
        .then(response => {
            context.commit('logIn', {user: response.data.user, token: response.data.token})
            context.commit('finishLoginLoading');
            window.localStorage.setItem('user', JSON.stringify(response.data.user));
            window.localStorage.setItem('token', JSON.stringify(response.data.token));
            router.history.push('/home')
        })
        .catch(err => {
            console.log(err.response.data.error)
            context.commit('loginErrorDidOccur', err.response.data.error)
            context.commit('finishLoginLoading');
        })
    },
    logOut(context) {
        context.commit('logOut');  
        router.history.push('/login');
    },
    register(context, data) {
        context.commit('startRegistrationLoading')
        axios.post('https://frontend-templates-oliverbth05.c9users.io:8081/user/auth/register', {
            email: data.email,
            username: data.username,
            password: data.password
        })
        .then(response => {
            context.commit('finishRegistrationLoading');
            context.commit('logIn', {user: response.data.user, token: response.data.token})
            window.localStorage.setItem('user', JSON.stringify(response.data.user));
            window.localStorage.setItem('token', JSON.stringify(response.data.token));
            router.history.push('/home')
        })
        .catch(err => {
            console.log(err)
            context.commit('registrationErrorDidOccur', err.response.data.error)
            context.commit('finishRegistrationLoading')
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}