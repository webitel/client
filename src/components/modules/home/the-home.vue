<template>
    <div class="container-fluid no-padding">
        <div class="page-wrap">
            <app-nav></app-nav>
            <main class="home-page">
                <div class="row">
                    <app-header></app-header>
                    <module-header>Dashboard</module-header>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import theHeader from '../../the-header';
import theNavbar from '../../the-navbar';
import moduleHeader from '../module-header';

export default {
  name: 'the-home',
  components: {
    'app-header': theHeader,
    'app-nav': theNavbar,
    'module-header': moduleHeader,
  },
};
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
