<template>
    <div class="object-wrap">
        <app-nav @re-renderNav="updateNav" :key="reloadNavKey"></app-nav>
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
    $bg-color: #F9F9F9;

    .object {
        background: $bg-color;
    }

    .object-content-wrap {
        padding: 28px 58px;
    }
</style>