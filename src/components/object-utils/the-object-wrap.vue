<template>
    <div class="object-wrap">
<!--        <app-nav @re-renderNav="updateNav" :key="reloadNavKey"></app-nav>-->
        <main class="object">
            <notification></notification>
            <app-header></app-header>
            <div class="object-content-wrap">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
    import AppHeader from '../cc-header/cc-header.vue';
    import AppNav from '../the-navbar';
    import Notification from '../utils/notification';

    export default {
        name: 'module-wrap',
        components: {
            AppHeader,
            AppNav,
            Notification,
        },
        data() {
            return {
                reloadNavKey: 0,
            };
        },
        methods: {
            updateNav() {
                this.reloadNavKey++;
            },
        },
    };
</script>

<style lang="scss" scoped>
    $bg-color: #F9F9F9;

    .object {
        background: $bg-color;
    }

    .object-content-wrap {
        padding: 20px 30px;
    }
</style>
