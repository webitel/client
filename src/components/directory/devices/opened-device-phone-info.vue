<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.devices.phoneInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <dropdown-select
                    v-model="phone"
                    :label="$t('objects.directory.devices.phone')"
                    :options="dropdownOptionsList"
                    @search="loadDropdownOptionsList"
            ></dropdown-select>
            <form-input
                    v-model="ip"
                    :v="v.itemInstance.ip"
                    :label="$t('objects.directory.devices.ipv4')"
            ></form-input>
           <form-input
                    v-model="brand"
                    :label="$t('objects.directory.devices.vendor')"
            ></form-input>
            <form-input
                    v-model="model"
                    :label="$t('objects.directory.devices.model')"
            ></form-input>
            <form-input
                    v-model="mac"
                    :v="v.itemInstance.mac"
                    :label="$t('objects.directory.devices.mac')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';

    export default {
        name: 'opened-device-phone-info',
        mixins: [openedTabComponentMixin],

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            phone: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.phone;
                },
                set(value) {
                    this.setDevice(value);
                },
            },
            ip: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.ip;
                },
                set(value) {
                    this.setItemProp({ prop: 'ip', value });
                },
            },
            brand: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.brand;
                },
                set(value) {
                    this.setItemProp({ prop: 'brand', value });
                },
            },
            model: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.model;
                },
                set(value) {
                    this.setItemProp({ prop: 'model', value });
                },
            },
            mac: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.mac;
                },
                set(value) {
                    this.setItemProp({ prop: 'mac', value });
                },
            },
        },

        methods: {

            setDevice(value) {
                this.brand = value.brand;
                this.model = value.model;
            },

            async loadDropdownOptionsList(search) {
                const response = [
                    {
                        name: 'Cisco IP Phone 7821',
                        id: 1,
                        brand: 'cisco',
                        model: '7821',
                    },
                    {
                        name: 'Yealink SIP-T21P E2',
                        id: 2,
                        brand: 'yealink',
                        model: 'T21',
                    },
                ];
                this.dropdownOptionsList = response.map((item) => ({
                        name: item.name,
                        id: item.id,
                        brand: item.brand,
                        model: item.model,
                    }));
            },
            ...mapActions('directory/devices', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
