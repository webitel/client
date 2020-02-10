<template>
    <div class="content-wrap">
        <object-header hide-primary-action>
            {{$t('settings.settings')}}
        </object-header>

        <section class="object-content">
            <section class="settings-section">
                <header class="content-header">
                    <h3 class="content-title">{{$t('settings.changePassword')}}</h3>
                </header>
                <form class="object-input-grid grid-w50">
                    <div>
                        <form-input
                                v-model="password"
                                :v="$v.password"
                                :label="$t('auth.password')"
                                required
                        ></form-input>
                        <form-input
                                v-model="confirmPassword"
                                :v="$v.confirmPassword"
                                :label="$t('auth.confirmPassword')"
                                required
                        ></form-input>
                        <btn
                                :disabled="computeDisabled"
                            @click="changePassword"
                        >{{$t('objects.save')}}</btn>
                    </div>
                </form>
            </section>

            <section class="settings-section">
                <header class="content-header">
                    <h3 class="content-title">{{$t('settings.language')}}</h3>
                </header>
                <form class="object-input-grid grid-w50">
                    <dropdown-select
                        class="language-list"
                        :value="language"
                        :options="languageOptions"
                        :label="$t('settings.language')"
                        @input="changeLanguage"
                    ></dropdown-select>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
    import objectHeader from './object-utils/the-object-header';
    import DropdownSelect from "./utils/dropdown-select";
    import btn from "./utils/btn";
    import formInput from "./utils/form-input";
    import {sameAs, required} from 'vuelidate/lib/validators';

    export default {
        name: "the-settings",
        components: {DropdownSelect, objectHeader, btn, formInput, },
        data: () => ({
            password: '',
            confirmPassword: '',
            language: {name: 'English', id: 'en'},
            languageOptions: [
                {name: 'English', id: 'en'},
                {name: 'Русский', id: 'ru'},
            ]
        }),

        validations: {
            password: {
                required
            },
            confirmPassword: {
                sameAs: sameAs('password'),
            },
        },

        mounted() {
            const lang = localStorage.getItem('lang'); // get default lang
            // if there's a previously set lang, set it
            if(lang) this.language = this.languageOptions.find(item => item.id === lang);
        },

        computed: {
            computeDisabled() {
                this.$v.$touch();
                return this.$v.$pending || this.$v.$error;
            }
        },

        methods: {
            changePassword() {},

            changeLanguage(value) {
                localStorage.setItem('lang', value.id);
                this.language = value;
                this.$i18n.locale = value.id;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .settings-section {
        margin-bottom: 28px;

        .btn {
            display: block;
            margin: 3px 0 0 auto;
        }
    }
</style>