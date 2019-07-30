<template>

    <div class="module-wrap">
        <app-nav></app-nav>
        <main class="module">
            <alert
                    :error="error"
            ></alert>
            <app-header></app-header>

            <router-view></router-view>

        </main>
    </div>
</template>

<script>
    import theHeader from '../the-header';
    import theNavbar from '../the-navbar';
    import alert from '../utils/alert';

    import errorMixin from '../../mixins/errorMixin';
    export default {
        name: "module-wrap",
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar,
            alert,
        },
        mixins: [errorMixin],
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/modules/modules";
    @import "../../assets/css/modules/vuetable";
</style>