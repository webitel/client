<template>
    <!--  :class="$i18n.locale" root element class to control fonts on each locale  -->
    <router-view :class="$i18n.locale"></router-view>
</template>

<script>
    import { getSession } from './api/userinfo/userinfo';

    export default {
        name: 'app',
        created() {
            getSession();
            this.setDomain();
            this.setLanguage();
        },
        methods: {
            setDomain() {
                const domain = localStorage.getItem('domain');
                if (domain) this.$store.dispatch('userinfo/SET_DOMAIN_ID', domain);
            },

            setLanguage() {
                const lang = localStorage.getItem('lang');
                if (lang) this.$i18n.locale = lang;
            },
        },
    };
</script>

<style>

</style>
