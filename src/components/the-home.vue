<template>
    <div class="container-fluid no-padding">
        <div class="page-wrap">
            <app-nav></app-nav>
            <main class="home-page">
                <div class="row">
                    <app-header></app-header>
                    <page-header>Dashboard</page-header>
                </div>
            </main>
        </div>
    </div>
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

<style lang="scss" scoped>
    .page-wrap {
        display: flex;
        width: 100vw;
        overflow-x: hidden;
    }
    .home-page {
        flex-grow: 1;
    }
</style>