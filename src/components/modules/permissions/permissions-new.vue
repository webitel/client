<template>
    <div class="module-wrap">
        <app-nav></app-nav>
        <main class="module module-new permissions-new">
            <app-header></app-header>
            <module-header :primaryText="'Save'" :secondaryAction="close">
                {{$tc('modules.permissions.permissionsRole')}} | {{computeTitle}}</module-header>
            <section class="module-content">
                <header class="module-content__header">
                    <h3 class="module-content__title">General info</h3>
                    <div class="module__info-helper">
                        <img class="module__info-helper__img" src="../../../assets/img/modules/info-helper.svg" alt="?">
                        <div class="module__info-helper__text">Ya s`el deda :(</div>
                    </div>
                </header>

                <form class="form">
                    <form-input
                            class="form__input fs14"
                            v-model="form.name"
                            :label="$t('auth.password')"
                            :placeholder="$t('auth.passwordPlaceholder')"
                    ></form-input>
                    <form-input
                            class="form__input fs14"
                            v-model="form.description"
                            :textarea="true"
                            :height="164"
                            :label="$t('auth.password')"
                            :placeholder="$t('auth.passwordPlaceholder')"
                    ></form-input>
                </form>
            </section>
        </main>
    </div>
</template>

<script>
    import theHeader from '../../the-header';
    import theNavbar from '../../the-navbar';
    import moduleHeader from '../module-header';
    import formInput from '../../utils/form-input';

    export default {
        name: "permissions-new",
        components: {
            'app-header': theHeader,
            'app-nav': theNavbar,
            'module-header': moduleHeader,
            'form-input': formInput
        },
        data() {
            return {
                form: {
                    name: '',
                    description: ''
                }
            }
        },
        mounted() {
            this.$log.info('new');
        },
        methods: {
            close() {
                this.$router.push('/permissions');
            }
        },
        computed: {
            computeTitle() {
                return this.$route.query.edit ? this.$t('modules.edit') : this.$t('modules.new');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-input {
        margin: 16px 0 10px;
    }
</style>