<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.devices.phoneInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="phone"
                    :label="$t('objects.directory.devices.phone')"
            ></form-input>
            <form-input
                    v-model="ip"
                    :v="v.itemInstance.ip"
                    :label="$t('objects.directory.devices.ipv4')"
            ></form-input>
            <dropdown-select
                    v-model="vendor"
                    :label="$t('objects.directory.devices.vendor')"
            ></dropdown-select>
            <dropdown-select
                    v-model="model"
                    :label="$t('objects.directory.devices.model')"
            ></dropdown-select>
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
    import {mapActions} from "vuex";

    export default {
        name: "opened-device-phone-info",
        mixins: [openedTabComponentMixin],

        computed: {
            phone: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.phone
                },
                set(value) {
                    this.setItemProp({prop: 'phone', value})
                }
            },
            ip: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.ip
                },
                set(value) {
                    this.setItemProp({prop: 'ip', value})
                }
            },
            vendor: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.vendor
                },
                set(value) {
                    this.setItemProp({prop: 'vendor', value})
                }
            },
            model: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.model
                },
                set(value) {
                    this.setItemProp({prop: 'model', value})
                }
            },
            mac: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.mac
                },
                set(value) {
                    this.setItemProp({prop: 'mac', value})
                }
            },
        },

        methods: {
            ...mapActions('directory/devices', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>