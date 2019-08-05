<template>
    <div class="content-wrap">
        <module-header
                :primaryText="$t('modules.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            Devices | {{computeTitle}}
        </module-header>
        <section class="module-content module-new devices-new">

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="module-content__title">General info</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            class="form__input"
                            v-model.trim="$v.name.$model"
                            :v="$v.name"
                            :label="'name*'"
                            :placeholder="'name'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model.trim="$v.authId.$model"
                            :v="$v.authId"
                            :label="'authId*'"
                            :placeholder="'authId'"
                    ></form-input>

                    <div class="input-extension-wrap">


                        <form-input
                                class="form__input"
                                ref="input-password"
                                v-model.trim="$v.password.$model"
                                :v="$v.password"
                                :label="'password*'"
                                :placeholder="'password'"
                        ></form-input>

                        <div class="input-extension">
                            <span class="input-extension__copy" @click="copyToClipboard">Copy</span>
                            <i class="input-extension__generate icon-icon_deny" @click="generatePassword"></i>
                        </div>
                     </div>

                    <form-input
                            class="form__input"
                            v-model="user"
                            :label="'user'"
                            :placeholder="'user'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="phone"
                            :label="'phone'"
                            :placeholder="'phone'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="IPv4"
                            :label="'IPv4'"
                            :placeholder="'IPv4'"
                    ></form-input>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="module-content__title">Autoprovision</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            class="form__input"
                            v-model="vendor"
                            :label="'vendor'"
                            :placeholder="'vendor'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="model"
                            :label="'model'"
                            :placeholder="'model'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="MAC"
                            :label="'MAC'"
                            :placeholder="'MAC'"
                    ></form-input>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import moduleHeader from '../module-header';
    import formInput from '../../utils/form-input';
    import expansionPanel from '../utils/expansion-panel';
    import eventBus from '../../../utils/eventBus';
    import { required } from 'vuelidate/lib/validators';

    export default {
        name: 'devices-new',
        components: {
            'module-header': moduleHeader,
            'form-input': formInput,
            'expansion-panel': expansionPanel
        },
        data() {
            return {
                name: '',
                authId: '',
                password: '',
                user: '',
                phone: '',
                IPv4: '',

                vendor: '',
                model: '',
                MAC: '',

                hostName: [],
            }
        },

        // by vuelidate
        validations: {
            // form: {
                name: {
                    required,
                },
                authId: {
                    required
                },
                password: {
                    required,
                },
            // },
        },
        methods: {
            close() {
                this.$router.push('/devices');
            },
            generatePassword() {
                const length = 12;
                const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let result = '';
                for(let i = 0; i < length; i++) {
                    result += charset.charAt(Math.floor(Math.random()*charset.length));
                }
                this.password = result;
            },
            copyToClipboard() {
                eventBus.$emit('copyToClipboard', this.password);
            }
        },
        computed: {
            computeTitle() {
                return this.$route.query.edit ? this.$t('modules.edit') : this.$t('modules.new');
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/main";
    @import "../../../assets/css/modules/modules";

    .module-content {
        padding-top: 36px;
    }

    .module-content__title {
        margin: 0;
    }

    .input-extension-wrap {
        position: relative;

        .input-extension {
            display: flex;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -35%);

            .input-extension__copy {
                @extend .typo-input-text;
                @extend .border-underline;

                margin-right: 16px;
                cursor: pointer;

                &:before {
                    bottom: 6px;
                    height: 1px;
                    background: #000;
                }
            }

            .input-extension__generate {
                margin-right: 16px;
                color: #000;
                cursor: pointer;
            }
        }
    }
</style>
