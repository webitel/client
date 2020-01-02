<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.devices.hotDesking')}}</h3>
        </header>
        <form class="object-input-grid">
            <tags-input
                    v-model="hotdesk"
                    :options="[]"
                    :label="$t('objects.directory.devices.hostName')"
                    @search="loadDropdownOptionsList"
            ></tags-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";

    export default {
        name: "opened-device-hot-desking",
        mixins: [openedTabComponentMixin],

        computed: {
            hotdesk: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.hotdesk
                },
                set(value) {
                    this.setItemProp({prop: 'hotdesk', value})
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