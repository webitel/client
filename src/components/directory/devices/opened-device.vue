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
    import { required } from 'vuelidate/lib/validators';
    import datepicker from 'vuejs-datepicker';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import { ipValidator, macValidator } from '../../../utils/validators';
    import openedDevicePhoneInfo from './opened-device-phone-info.vue';
    import openedDeviceGeneral from './opened-device-general.vue';
    import openedDevicePermissions from './opened-device-permissions.vue';

    export default {
        name: 'opened-device',
        mixins: [editComponentMixin],
        components: {
            openedDeviceGeneral,
            openedDevicePhoneInfo,
            openedDevicePermissions,
            datepicker,
        },

        data() {
            return {};
        },

        validations: {
            itemInstance: {
                name: {
                    required,
                },
                account: {
                    required,
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

            tabs() {
                const tabs = [{
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$t('objects.directory.devices.phoneInfo'),
                        value: 'phoneInfo',
                    }];

                const permissions = {
                    text: this.$tc('objects.permissions.permissions', 2),
                    value: 'permissions',
                };

                if (this.id) tabs.push(permissions);
                return tabs;
            },
        },

        methods: {
            ...mapActions('directory/devices', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_SINGLE_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
