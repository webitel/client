<template>
    <div class="module-wrap">
        <app-nav></app-nav>
        <main class="module home">
            <app-header></app-header>
            <module-header>Dashboard</module-header>
        </main>
    </div>
</template>

<script>
    import theHeader from '../../the-header';
    import theNavbar from '../../the-navbar';
    import moduleHeader from '../module-header';

    export default {
        name: 'the-home',
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar,
            'module-header': moduleHeader,
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../../assets/css/modules';
</style>
