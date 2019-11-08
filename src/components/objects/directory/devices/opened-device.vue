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
    }
</script>

<style lang="scss" scoped>

</style>
