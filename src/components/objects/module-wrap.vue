<template>
    <div class="object-wrap">
        <app-nav></app-nav>
        <main class="object">
            <notification></notification>
            <app-header></app-header>

            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import theHeader from '../the-header';
    import theNavbar from '../the-navbar';
    import notification from '../utils/notification';

    export default {
        name: "module-wrap",
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar,
            notification,
        },
    }
</script>

<style lang="scss" scoped>

</style>