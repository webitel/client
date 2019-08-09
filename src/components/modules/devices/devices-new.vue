<template>
    <div class="content-wrap">
        <module-header
                :primaryText="$t('modules.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            {{$t('modules.devices.devicesTitle')}} | {{computeTitle}}
        </module-header>
        <section class="module-content module-new devices-new">

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('modules.generalInfo')}}</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            class="form__input"
                            v-model.trim="$v.name.$model"
                            :v="$v.name"
                            :label="$t('modules.name') + '*'"
                            :placeholder="$t('modules.name') + '*'"
                            :hintText="'Ya s`el deda :('"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model.trim="$v.authId.$model"
                            :v="$v.authId"
                            :label="$t('modules.devices.authId') + '*'"
                            :placeholder="$t('modules.devices.authId') + '*'"
                            :hintText="'Ya s`el deda :('"
                    ></form-input>

                    <div class="input-extension-wrap">


                        <form-input
                                class="form__input"
                                ref="input-password"
                                v-model.trim="$v.password.$model"
                                :v="$v.password"
                                :label="$t('modules.password') + '*'"
                                :placeholder="$t('modules.password') + '*'"
                        ></form-input>

                        <div class="input-extension">

                            <div class="input-extension__copy" @click="copyToClipboard">
                                <span>{{$t('modules.copy')}}</span>

                                <div class="hint" v-if="copyMessage">
                                    <div class="tooltip-top active">
                                        <i class="icon-icon_approve"></i>
                                        <span>{{this.copyMessage}}</span>
                                    </div>
                                </div>
                            </div>
                            <i class="input-extension__generate icon-icon_generate" @click="generatePassword"></i>
                        </div>
                    </div>

                    <form-input
                            class="form__input"
                            v-model="user"
                            :label="$t('modules.user')"
                            :placeholder="$t('modules.user')"
                    ></form-input>
                </template>
            </expansion-panel>


            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('modules.devices.devicesNew.hotDesking')}}</h3>
                </template>

                <template slot="expansion-content">
                    <div class="tags-input-wrap">
                        <div class="tags-input__label">{{$t('modules.devices.devicesNew.hostName') + '*'}}

                            <div class="hint">
                                <i
                                        class="hint__img tooltip-activator icon-icon_question"
                                ></i>
                                <div class="tooltip-left">Ya s`el deda :(</div>
                            </div>
                        </div>
                        <tags-input
                                v-model="hostTag"
                                :tags="hostTags"
                                :autocomplete-items="filterTags"
                                :placeholder="$t('modules.devices.devicesNew.hostName')"
                                @tags-changed="newTags => this.hostTags = newTags"

                        ></tags-input>
                    </div>
                </template>
            </expansion-panel>


            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('modules.devices.devicesNew.phoneInfo')}}</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            class="form__input"
                            v-model="phone"
                            :label="$t('modules.devices.devicesNew.phone')"
                            :placeholder="$t('modules.devices.devicesNew.phone')"
                            disabled
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="IPv4"
                            :label="'IPv4'"
                            :placeholder="'IPv4'"
                            :hintText="'Ya s`el deda :('"
                    ></form-input>
                    <dropdown-select
                            :label="$t('modules.devices.devicesNew.vendor')"
                            :placeholder="$t('modules.devices.devicesNew.vendor')"
                            :hintText="'Ya s`el deda :('"
                            @input="vendor = $event"
                            disabled
                    ></dropdown-select>
                    <dropdown-select
                            :label="$t('modules.devices.devicesNew.model')"
                            :placeholder="$t('modules.devices.devicesNew.model')"
                            :hintText="'Ya s`el deda :('"
                            @input="model = $event"
                    ></dropdown-select>
                    <form-input
                            class="form__input"
                            v-model="MAC"
                            :label="'MAC'"
                            :placeholder="'MAC'"
                    ></form-input>
                </template>
            </expansion-panel>


            <expansion-panel class="grid-w100">
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('modules.history')}}</h3>
                </template>

                <template slot="expansion-content">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('modules.devices.devicesNew.deviceHistory')}}</h3>
                        <div class="content-header__actions-wrap">
                            <datepicker
                                    v-model="historyDate"
                                    :format="'d MMMM yyyy'"
                                    :calendar-button-icon="'icon-icon_arrow-down'"
                                    :maximum-view="'day'"
                                    monday-first
                                    full-month-name
                                    calendar-button
                            ></datepicker>
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
    import datepicker from 'vuejs-datepicker';
    import dropdownSelect from '../utils/dropdown-select';

    export default {
        name: 'devices-new',
        components: {
            'module-header': moduleHeader,
            'form-input': formInput,
            'expansion-panel': expansionPanel,
            'tags-input': vueTagsInput,
            vuetable,
            datepicker,
            'dropdown-select': dropdownSelect
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

                copyMessage: '',

                hostTag: '',
                hostTags: [{text: 'Tag1'}, {text: 'Tag2'}],
                tagsList: [{text: 'Tag1'}, {text: 'Tag2'}, {text: 'Tag3'}, {text: 'Tag3Tag3Tag3Tag3'},
                    {text: 'Tag5555555555555553'}, {text: 'Ta55g3'}],
                disableHost: true,

                history: [],
                historyDate: new Date,
                // vuetable prop
                fields: [
                    {name: 'login', title: this.$t('modules.devices.devicesNew.loggedIn')},
                    {name: 'logout', title: this.$t('modules.devices.devicesNew.loggedOut')},
                    {name: 'user', title: this.$t('modules.user')},
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
            // console.log(this.historyDate.toLocaleString("en-us", {month: 'long'}), this.historyDate.getFullYear());

            document.querySelectorAll('.vdp-datepicker .day-header').forEach(item => {
                item.innerHTML = item.innerHTML.slice(0, -1);
            });

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
                if (this.password) {
                    eventBus.$emit('copyToClipboard', this.password);
                    this.copyMessage = this.$t('modules.copied');
                    setTimeout(() => this.copyMessage = '', 2000);
                }
            },
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

    .content-title {
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
                cursor: pointer;

                &:before {
                    bottom: 6px;
                    height: 1px;
                    background: #000;
                }
            }

            .input-extension__generate {
                margin: 0 16px;
                color: #000;
                cursor: pointer;
            }
        }
    }
</style>
