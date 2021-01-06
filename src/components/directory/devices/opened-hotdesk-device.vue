<template>
    <div class="content-wrap">
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            <span>{{$tc('objects.directory.devices.devices', 1)}}</span> | {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
import { required, requiredUnless } from 'vuelidate/lib/validators';
    import datepicker from 'vuejs-datepicker';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import openedHotdeskDeviceGeneral from './opened-hotdesk-device-general';
    import openedHotdeskDeviceHotdesking from './opened-hotdesk-device-hotdesking';
    import openedHotdeskDevicePhoneInfo from './opened-device-phone-info';
    import { ipValidator, macValidator } from '../../../utils/validators';


    export default {
        name: 'opened-hotdesk-device',
        mixins: [editComponentMixin],
        components: {
            openedHotdeskDeviceGeneral,
            openedHotdeskDeviceHotdesking,
            openedHotdeskDevicePhoneInfo,
            datepicker,
        },

        data() {
            return {
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
            };
        },

        validations: {
            itemInstance: {
                name: {
                    required,
                },
                password: {
                  required: requiredUnless('id'),
                },
                mac: {
                    macValidator,
                },
                ip: {
                    ipValidator,
                },
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('directory/devices', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() { return this.$store.state.directory.devices.itemId; },
                set(value) { this.setId(value); },
            },
        },

        methods: {
            ...mapActions('directory/devices', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_HOTDESK_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
