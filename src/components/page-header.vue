<template>
    <div class="col-12">
        <header class="page-header">
            <h2 class="page__title"><slot></slot></h2>
            <btn
                    class="btn page-header__btn"
            >
                add new
            </btn>
        </header>
        <divider/>
    </div>
</template>

<script>
    import btn from './login/btn';
    import divider from './divider';

    export default {
        name: "page-header",
        components: {
            'btn': btn,
            'divider': divider
        }
    }
</script>

<style scoped>
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 28px 18px 44px;
    }

    .page__title {
        font: 20px AvantGardeGothicBold;
        line-height: 24px;
        letter-spacing: 0.15px;
    }
</style>