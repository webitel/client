<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.directory.devices.devices', 2)}}</h3>
        </header>
        <form class="object-input-grid">
            <div>
                <dropdown-select
                        v-model="device"
                        :label="$t('objects.directory.users.defaultDevice')"
                        :options="dropdownOptionsList"
                        @search="loadDropdownOptionsList"
                        required
                ></dropdown-select>

                <tags-input
                        v-model="devices"
                        :options="dropdownOptionsList"
                        :label="$tc('objects.directory.devices.devices', 2)"
                        @search="loadDropdownOptionsList"
                ></tags-input>

                <div class="hint-link__wrap">
                    <span>{{$t('objects.directory.users.deviceNotFound')}}</span>
                    <router-link class="hint-link__link" to="/directory/devices/new">
                        {{$t('objects.directory.users.createNewDevice')}}
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';
    import { getDeviceList } from '../../../api/directory/devices/devices';

    export default {
        name: 'opened-user-devices',
        mixins: [openedTabComponentMixin],

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            devices: {
                get() {
                    return this.$store.state.directory.users.itemInstance.devices;
                },
                set(value) {
                    this.setItemProp({ prop: 'devices', value });
                },
            },

            device: {
                get() {
                    return this.$store.state.directory.users.itemInstance.device;
                },
                set(value) {
                    this.setItemProp({ prop: 'device', value });
                },
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getDeviceList(0, 10, search);
                this.dropdownOptionsList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('directory/users', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .hint-link__wrap {
        @extend .typo-body-md;

        margin-top: 8px;
        color: $label-color;
    }
</style>
