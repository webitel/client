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
                            :hintText="'Ya s`el deda :('"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model.trim="$v.authId.$model"
                            :v="$v.authId"
                            :label="'authId*'"
                            :placeholder="'authId'"
                            :hintText="'Ya s`el deda :('"
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
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="module-content__title">Phone Info</h3>
                </template>

                <template slot="expansion-content">
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
                            :hintText="'Ya s`el deda :('"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="vendor"
                            :label="'vendor'"
                            :placeholder="'vendor'"
                            :hintText="'Ya s`el deda :('"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="model"
                            :label="'model'"
                            :placeholder="'model'"
                            :hintText="'Ya s`el deda :('"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="MAC"
                            :label="'MAC'"
                            :placeholder="'MAC'"
                            :hintText="'Ya s`el deda :('"
                    ></form-input>
                </template>
            </expansion-panel>


            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="module-content__title">Hot desking</h3>
                </template>

                <template slot="expansion-content">
                    <div class="tags-input-wrap">
                        <div class="tags-input__label">Host name*

                            <div class="module__info-hint">
                                <i
                                        class="module__info-hint__img tooltip-activator icon-icon_question"
                                ></i>
                                <div class="tooltip-left">Ya s`el deda :(</div>
                            </div>
                        </div>
                        <tags-input
                                v-model="hostTag"
                                :tags="hostTags"
                                :autocomplete-items="filterTags"
                                :placeholder="'Host name'"
                                @tags-changed="newTags => this.hostTags = newTags"
                        ></tags-input>
                    </div>
                </template>
            </expansion-panel>


            <expansion-panel class="w100">
                <template slot="expansion-header">
                    <h3 class="module-content__title">History</h3>
                </template>

                <template slot="expansion-content">
                    <header class="module-content__header">
                        <h3 class="module-content__title">Device history</h3>
                        <div class="module-content__table-actions">

                        </div>
                    </header>
                    <vuetable
                            class="devices-history-table"
                            :api-mode="false"
                            :fields="fields"
                            :data="history"
                    >

                    </vuetable>
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
    import {required} from 'vuelidate/lib/validators';
    import vueTagsInput from '@johmun/vue-tags-input';
    import vuetable from 'vuetable-2/src/components/Vuetable';

    export default {
        name: 'devices-new',
        components: {
            'module-header': moduleHeader,
            'form-input': formInput,
            'expansion-panel': expansionPanel,
            'tags-input': vueTagsInput,
            vuetable
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

                hostTag: '',
                hostTags: [],
                tagsList: [{text: 'Tag1'}, {text: 'Tag2'}, {text: 'Tag3'}, {text: 'Tag3Tag3Tag3Tag3'},
                    {text: 'Tag5555555555555553'}, {text: 'Ta55g3'}],

                history: [],
                // vuetable prop
                fields: [
                    // TODO: UNITED 'NAME' TRANSLATION
                    {name: 'login', title: 'Login',},
                    {name: 'logout', title: 'Logout'},
                    {name: 'user', title: 'User'},
                ],
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
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 7; i++) {
                this.history.push({
                    login: '5 August 2019, 10:16 AM',
                    logout: '5 August 2019, 10:16 AM',
                    user: `User ${i}`,
                    id: i,
                });
            }
        },
        methods: {
            close() {
                this.$router.push('/devices');
            },
            generatePassword() {
                const length = 12;
                const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += charset.charAt(Math.floor(Math.random() * charset.length));
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
            filterTags() {
                const filteredTags = this.tagsList.filter(item => {
                    return item.text.toLowerCase().includes(this.hostTag.toLowerCase());
                });
                if (filteredTags.length > 0) return filteredTags;
                return [{text: this.hostTag}];
            }
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
