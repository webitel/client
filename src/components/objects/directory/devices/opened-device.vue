<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                close
        >
            <span>{{$tc('objects.directory.devices.devices', 1)}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new devices-new object-with-tabs">
            <tabs
                    :currentTab="currentTab"
                    :tabs="tabs"
                    @change="currentTab = $event"
            ></tabs>
            <component
                    class="tabs-inner-component"
                    :is="computeCurrentTab"
                    :itemInstanceProp="itemInstance"
                    :v="$v"
            ></component>
            <!--                    <header class="content-header">-->
            <!--                        <h3 class="content-title">{{$t('objects.devices.deviceHistory')}}</h3>-->
            <!--                        <div class="content-header__actions-wrap">-->
            <!--                            <datepicker-->
            <!--                                    v-model="historyDate"-->
            <!--                                    :format="'d MMMM yyyy'"-->
            <!--                                    :calendar-button-icon="'icon-icon_arrow-down'"-->
            <!--                                    :maximum-view="'day'"-->
            <!--                                    monday-first-->
            <!--                                    full-month-name-->
            <!--                                    calendar-button-->
            <!--                            ></datepicker>-->
            <!--                        </div>-->
            <!--                    </header>-->
            <!--                    <vuetable-->
            <!--                            class="devices-history-table"-->
            <!--                            :api-mode="false"-->
            <!--                            :fields="fields"-->
            <!--                            :data="history"-->
            <!--                    >-->

            <!--                    </vuetable>-->
        </section>
    </div>
</template>

<script>
    import openedDeviceGeneral from './opened-device-general';
    import openedDeviceHotdesking from './opened-device-hotdesking';
    import openedDevicePhoneInfo from './opened-device-phone-info';
    import {required} from 'vuelidate/lib/validators';
    import datepicker from 'vuejs-datepicker';
    import editComponentMixin from '@/mixins/editComponentMixin';

    export default {
        name: 'opened-device',
        components: {
            openedDeviceGeneral,
            openedDeviceHotdesking,
            openedDevicePhoneInfo,
            datepicker,
        },
        mixins: [editComponentMixin],
        data() {
            return {
                itemInstance: {
                    name: '',
                    account: '',
                    password: '',
                    user: {},
                    phone: '',
                    ip: '',

                    vendor: '',
                    model: '',
                    mac: '',
                    hotdesk: [{text: 'Tag1'}, {text: 'Tag2'}],
                    vars: [],
                },

                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$t('objects.directory.devices.hotDesking'),
                        value: 'hotdesking',
                    },
                    {
                        text: this.$t('objects.directory.devices.phoneInfo'),
                        value: 'phoneInfo',
                    },
                ],

                // history: [],
                // historyDate: new Date,
                // vuetable prop
                // fields: [
                //     {name: 'login', title: this.$t('objects.devices.loggedIn')},
                //     {name: 'logout', title: this.$t('objects.devices.loggedOut')},
                //     {name: 'user', title: this.$t('objects.user')},
                // ],
            }
        },

        validations: {
            itemInstance: {
                name: {
                    required,
                },
                account: {
                    required
                },
                password: {
                    required,
                },
            },
        },
        mounted() {
            // for (let i = 0; i < 7; i++) {
            //     this.history.push({
            //         login: '5 August 2019, 10:16 AM',
            //         logout: '5 August 2019, 10:16 AM',
            //         user: `User ${i}`,
            //         id: i,
            //     });
            // }
        },
    }
</script>

<style lang="scss" scoped>

</style>
