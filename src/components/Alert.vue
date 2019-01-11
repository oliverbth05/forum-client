<template>
    <transition name = 'Fade'  v-if = 'show'>
        <div  class = 'alert p-a-1 color-white'>
            <i class="fas fa-exclamation-circle p-r-1 color-white"></i>
            <div> {{message}}</div> 
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['message', 'show']
    }
</script>