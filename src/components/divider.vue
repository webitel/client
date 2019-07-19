<template>
    <hr class="divider">
</template>

<script>
    export default {
        name: "divider"
    }
</script>

<style scoped>
    .divider {
        display: block;
        flex: 1 1 0;
        max-width: 100%;
        height: 0;
        max-height: 0;
        padding: 0;
        margin: 0;
        border: 0 solid rgba(0, 0, 0, 0.12);
        border-top-width: thin;
        transition: inherit;
    }
</style>