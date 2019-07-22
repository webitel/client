<template>
    <main class="auth register">
        <!--        ANIMATION CANVAS-->
        <canvas ref="auth-canvas" class="canvas"></canvas>
        <!--        TODO: alert component-->

        <div class="logo">Webitel</div>
        <form
                class="auth__form"
                ref="register"
                @submit.prevent="submit"
        >
            <h2 class="auth__title fs24-lh24">{{$t('auth.loginTitle')}}</h2>
            <p class="auth__subtitle fs12-lh24">{{$t('auth.loginSubtitle')}}</p>

            <form-input
                    class="form__input fs14"
                    v-model.trim="$v.form.username.$model"
                    :label="$t('auth.user')"
                    :placeholder="$t('auth.userPlaceholder')"
                    :v="$v.form.username"
                    :autofocus="true"
            ></form-input>

            <form-input
                    class="form__input fs14"
                    v-model.trim="$v.form.password.$model"
                    :label="$t('auth.password')"
                    :placeholder="$t('auth.passwordPlaceholder')"
                    :v="$v.form.password"
                    :type="'password'"
            ></form-input>

            <form-input
                    class="form__input fs14"
                    v-model.trim="$v.form.password.$model"
                    :label="$t('auth.password')"
                    :placeholder="$t('auth.passwordPlaceholder')"
                    :v="$v.form.password"
                    :type="'password'"
            ></form-input>

            <form-input
                    class="form__input fs14"
                    v-model.trim="$v.form.password.$model"
                    :label="$t('auth.password')"
                    :placeholder="$t('auth.passwordPlaceholder')"
                    :v="$v.form.password"
                    :type="'password'"
            ></form-input>

            <btn
                    class="btn form__button"
                    type="submit"
            >
                {{$t('auth.submit')}}
            </btn>
        </form>
    </main>
</template>

<script>
    import formInput from './form-input';
    import btn from './btn';
    import {required, email} from 'vuelidate/lib/validators'

    import {login, logout} from '../../api/auth';
    import errorMixin from '../../mixins/errorMixin';
    import loginAnimation from '../../assets/js/loginAnimation';

    export default {
        name: 'the-register',
        components: {
            'form-input': formInput,
            'btn': btn
        },
        mixins: [errorMixin],
        data() {
            return {
                form: {
                    username: 'srgdemon@webitel.lo',
                    password: '12qwaszx',
                }
            };
        },

        // by vuelidate
        validations: {
            form: {
                username: {
                    required,
                    email
                },
                password: {
                    required,
                }
            }
        },
        mounted() {
            // width and height are sent to calc dynamic animation border
            loginAnimation(this.$refs['auth-canvas'], this.$refs.register);
        },
        methods: {
            submit() {
                this.$v.form.$touch();
                // if its still pending or an error is returned do not submit
                if (this.$v.form.$pending || this.$v.form.$error) return;

                login(this.form)
                    .catch((error) => {
                        this.showError(error); // from Mixin
                    });
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/main";
    @import "../../assets/css/auth";


    /*@media only screen and (max-width: 1440px) {*/
    /*    .auth {*/
    /*        height: 800px;*/
    /*    }*/
    /*}*/

    /*!*Extra Small Devices, Phones*!*/
    /*@media only screen and (max-width: 992px) {*/
    /*    .auth {*/
    /*        height: 1200px;*/
    /*    }*/
    /*}*/

    /*!*Extra Small Devices, Phones*!*/
    /*@media only screen and (max-width: 480px) {*/
    /*    .auth {*/
    /*        min-height: 100vh;*/
    /*        height: 740px;*/
    /*    }*/
    /*}*/

</style>
