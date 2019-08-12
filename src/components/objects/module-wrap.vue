<template>
    <div class="module-wrap">
        <app-nav></app-nav>
        <main class="module">
            <notification
                    :info="info"
                    :error="error"
            ></notification>
            <app-header></app-header>

            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import theHeader from '../the-header';
    import theNavbar from '../the-navbar';
    import notification from '../utils/notification';

    import errorMixin from '../../mixins/errorMixin';
    export default {
        name: "module-wrap",
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar,
            notification,
        },
        mixins: [errorMixin],
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/objects/objects";
    @import "../../assets/css/objects/objects";
</style>