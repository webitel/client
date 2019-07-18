<template>
    <main>
        <app-header></app-header>
        <app-nav></app-nav>
        <page-header></page-header>
        <router-link to="/login">BUTTON</router-link>
    </main>
</template>

<script>
    import theHeader from './the-header';
    import theNavbar from './the-navbar';
    import pageHeader from './page-header';

    export default {
        name: "the-home",
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar,
            'page-header': pageHeader,
        }
    }
</script>

<style scoped>

</style>