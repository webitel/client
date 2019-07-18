<template>
    <section class="not-found">
        <h2 class="not-found__title">404 not found</h2>
        <router-link class="not-found__escape-button" to="/">back to home page</router-link>
    </section>
</template>

<script>
    export default {
        name: "the-not-found-component"
    }
</script>

<style scoped>
    .not-found {
        text-align: center;
        margin-top: 90px;
        font-family: 'AvantGardeGothicMedium', sans-serif;
    }

    .not-found__title {
        font-size: 6em;
    }

    .not-found__escape-button {
        font-size: 1.6em;
        color: #fff;
    }
</style>