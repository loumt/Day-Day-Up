<template>
    <div class="animation-box">
        <div class="wall midground"></div>
        <div class="wall foreground"></div>
        <div class="wall flotage"></div>
    </div>
</template>

<script>
    export default {
      name: 'animation-box'
    }
</script>

<style>
    .wall{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .animation-box > .midground {
        background: url(./../../../../static/midground.gif);
        z-index: -1;
        -webkit-animation: cc 50s linear infinite;
    }

    .animation-box > .foreground {
        background: url(./../../../../static/foreground.gif);
        z-index: -2;
        -webkit-animation: cc 50s linear infinite;
    }

    .animation-box > .flotage {
        background: url(./../../../../static/midground.gif);
        z-index: -4;
        -webkit-animation: da 50s linear infinite;
    }

    @-webkit-keyframes cc {
        from {
            background-position: 0 0;
            transform: translateY(10px);
        }

        to {
            background-position: 600% 0;
        }
    }

    @-webkit-keyframes da {
        0% {
            background-position: 0 0;
        }

        100% {
            background-position: 0 600%;
        }
    }
</style>