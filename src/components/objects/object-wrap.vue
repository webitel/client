<template>
    <div class="object-wrap">
        <app-nav @re-renderNav="updateNav" :key="reloadNavKey"></app-nav>
        <main class="object">
            <notification></notification>
            <app-header></app-header>

            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import theHeader from '@/components/the-header';
    import theNavbar from '@/components/the-navbar';
    import notification from '@/components/utils/notification';

    export default {
        name: "module-wrap",
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar,
            notification,
        },
        data() {
            return {
                reloadNavKey: 0
            }
        },
        methods: {
            updateNav() {
                this.reloadNavKey++;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>