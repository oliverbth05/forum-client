<template>
    <transition name = 'Fade'  v-if = 'show'>
        <div  class = 'auth__error'>
            <i class="fas fa-exclamation-circle"></i>
            <div>{{message}}</div> 
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['message', 'show']
    }
</script>