<template>
    <v-app>
        <header class="page-header">
            <h2 class="page__title">Dashboard</h2>
            <v-btn
                    class="btn page-header__btn"
                    color="accent"
            >
                add new
            </v-btn>
        </header>
        <v-divider></v-divider>
    </v-app>
</template>

<script>
    export default {
        name: "page-header"
    }
</script>

<style scoped>
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 26px 28px 26px 44px;
    }

    .page__title {
        font: 20px AvantGardeGothicBold;
    }
</style>