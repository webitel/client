<template>
        <header class="page-header">
            <h2 class="page__title">Dashboard</h2>
            <button
                    class="btn page-header__btn"
            >
                add new
            </button>
        </header>
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