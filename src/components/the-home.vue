<template>
    <v-app>
        <v-container fluid class="pa-0">
            <v-layout>
                <v-flex xs12>
                    <app-header></app-header>
                    <!--                <app-nav></app-nav>-->
                    <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa eligendi fugiat libero magnam modi necessitatibus, odio? Ab ad adipisci ea eius est, fugit odio suscipit voluptas. Cum, maiores praesentium?</h1>
                    <router-link to="/login">BUTTONNN</router-link>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import theHeader from './the-header';
    import theNavbar from './the-navbar';

    export default {
        name: "the-home",
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar
        }
    }
</script>

<style scoped>

</style>