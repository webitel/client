<template>
    <module-header>Dashboard</module-header>
</template>

<script>
    import moduleHeader from '../module-header';

    export default {
        name: 'the-home',
        components: {
            'module-header': moduleHeader,
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../../assets/css/modules/modules';
</style>
