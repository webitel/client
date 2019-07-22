<template>
    <main class="auth login">
        <!--        ANIMATION CANVAS-->
        <canvas ref="auth-canvas" class="canvas"></canvas>
        <!--        TODO: alert component-->

        <div class="logo">Webitel</div>
        <form
                class="auth__form"
                ref="login"
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
        name: 'the-login',
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
                },
                animationInstance: null
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
            // form is sent to calc dynamic animation border
            this.animationInstance = loginAnimation;
            this.animationInstance.start(this.$refs['auth-canvas'], this.$refs.login);
        },
        deactivated(){
            this.animationInstance.end();
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
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/main";
    @import "../../assets/css/auth";

</style>
