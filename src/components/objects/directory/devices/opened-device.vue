<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            {{$t('objects.devices.devices')}} | {{computeTitle}}
        </object-header>
        <section class="object-content module-new devices-new">

            <expansion-panel opened>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            v-model.trim="$v.name.$model"
                            :v="$v.name"
                            :label="$t('objects.name')"
                            :placeholder="$t('objects.name')"
                            :hintText="'lorem ipsum'"
                            required
                    ></form-input>
                    <form-input
                            v-model.trim="$v.authId.$model"
                            :v="$v.authId"
                            :label="$t('objects.devices.authId')"
                            :placeholder="$t('objects.devices.authId')"
                            :hintText="'lorem ipsum'"
                            required
                    ></form-input>

                    <div class="input-extension-wrap">
                        <form-input
                                ref="input-password"
                                v-model.trim="$v.password.$model"
                                :v="$v.password"
                                :label="$t('objects.password')"
                                :placeholder="$t('objects.password')"
                                required
                        ></form-input>

                        <div class="input-extension">

                            <div class="input-extension__copy" @click="copyToClipboard">
                                <span>{{$t('objects.copy')}}</span>

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
                            v-model="user"
                            :label="$t('objects.user')"
                            :placeholder="$t('objects.user')"
                    ></form-input>
                </template>
            </expansion-panel>


            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.devices.hotDesking')}}</h3>
                </template>

                <template slot="expansion-content">
                    <div class="tags-input-wrap">
                        <div class="tags-input__label">{{$t('objects.devices.hostName') + '*'}}

                            <div class="hint">
                                <i
                                        class="hint__img tooltip-activator icon-icon_question"
                                ></i>
                                <div class="tooltip-left">lorem ipsum</div>
                            </div>
                        </div>
                        <tags-input
                                v-model="hostTag"
                                :tags="hostTags"
                                :autocomplete-items="tagsList"
                                :placeholder="$t('objects.devices.hostName')"
                                @tags-changed="newTags => this.hostTags = newTags"
                                autocomplete-filter-duplicates
                                disabled
                        ></tags-input>
                    </div>
                </template>
            </expansion-panel>


            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.devices.phoneInfo')}}</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            v-model="phone"
                            :label="$t('objects.devices.phone')"
                            :placeholder="$t('objects.devices.phone')"
                            disabled
                    ></form-input>
                    <form-input
                            v-model="IPv4"
                            :label="'IPv4'"
                            :placeholder="'IPv4'"
                            :hintText="'lorem ipsum'"
                    ></form-input>
                    <dropdown-select
                            :label="$t('objects.devices.vendor')"
                            :placeholder="vendor || $t('objects.devices.vendor')"
                            :hintText="'lorem ipsum'"
                            @input="vendor = $event"
                            disabled
                    ></dropdown-select>
                    <dropdown-select
                            :label="$t('objects.devices.model')"
                            :placeholder="model || $t('objects.devices.model')"
                            :hintText="'lorem ipsum'"
                            @input="model = $event"
                    ></dropdown-select>
                    <form-input
                            v-model="MAC"
                            :label="'MAC'"
                            :placeholder="'MAC'"
                    ></form-input>
                </template>
            </expansion-panel>


            <expansion-panel class="grid-w100">
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.history')}}</h3>
                </template>

                <template slot="expansion-content">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('objects.devices.deviceHistory')}}</h3>
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
    import objectHeader from '../../the-object-header';
    import formInput from '../../../utils/form-input';
    import expansionPanel from '../../../utils/expansion-panel';
    import eventBus from '../../../../utils/eventBus';
    import {required} from 'vuelidate/lib/validators';
    import vueTagsInput from '@johmun/vue-tags-input';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import datepicker from 'vuejs-datepicker';
    import dropdownSelect from '../../../utils/dropdown-select';

    export default {
        name: 'opened-device',
        components: {
            'object-header': objectHeader,
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
                    {name: 'login', title: this.$t('objects.devices.loggedIn')},
                    {name: 'logout', title: this.$t('objects.devices.loggedOut')},
                    {name: 'user', title: this.$t('objects.user')},
                ],
            }
        },

        // by vuelidate
        validations: {
            name: {
                required,
            },
            authId: {
                required
            },
            password: {
                required,
            },
        },
        mounted() {
            // console.log(document.querySelectorAll('*'));
            // document.querySelectorAll('.vdp-datepicker .day-header').forEach(item => {
            //     console.log(item.innerHTML);
            //     item.innerHTML = item.innerHTML.slice(0, -1);
            // });

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
                this.$router.push('/directory/devices');
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
                    this.copyMessage = this.$t('objects.copied');
                    setTimeout(() => this.copyMessage = '', 2000);
                }
            },
        },
        computed: {
            computeTitle() {
                return this.$route.query.edit ? this.$t('objects.edit') : this.$t('objects.new');
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
