<template>
    <aside class="loader">
        <div class="loader-shadow" v-if="loading"></div>
    </aside>
</template>

<script>
    export default {
        name: "fulscreen-loader",
        data() {
            // load
        }
    }
</script>

<style scoped>
    .loader {
        width: 0;
        height: 0;
        opacity: 0;
    }

    .loader-shadow {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.3);
        z-index: 1000;
    }

</style>