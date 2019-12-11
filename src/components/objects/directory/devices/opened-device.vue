<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$tc('objects.directory.devices.devices', 1)}}</span> | {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :itemInstance="itemInstance"
                :v="$v"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :itemInstanceProp="itemInstance"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import openedDeviceGeneral from './opened-device-general';
    import openedDeviceHotdesking from './opened-device-hotdesking';
    import openedDevicePhoneInfo from './opened-device-phone-info';
    import {required} from 'vuelidate/lib/validators';
    import datepicker from 'vuejs-datepicker';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {addDevice, getDevice, updateDevice} from "../../../../api/objects/directory/devices";
    import {ipValidator, macValidator} from "../../../../utils/validators";

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
                    name: 'device name',
                    account: '1002',
                    password: 'pass',
                    user: {},
                    phone: '8 800 555 3535',
                    ip: '10.10.10.117',

                    vendor: 'vendor name',
                    model: 'model name',
                    mac: '80-5E-C0-3C-84-44',
                    hotdesk: [],
                    // hotdesk: [{text: 'Tag1'}, {text: 'Tag2'}],
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
                mac: {
                    macValidator
                },
                ip: {
                    ipValidator
                }
            },
        },

        methods: {
            async save() {
                if (this.id) {
                    await updateDevice(this.id, this.itemInstance);
                } else {
                    await addDevice(this.itemInstance);
                }
                this.close();
            },

            async loadItem() {
                const response = await getDevice(this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
