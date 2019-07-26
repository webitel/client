<template>
    <router-view></router-view>
</template>

<script>
    import {getSession} from './api/auth/auth';

    export default {
        name: 'app',
        created() {
            getSession();
        },
    };
</script>

<style>

</style>
