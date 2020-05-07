<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.devices.hotDesking')}}</h3>
        </header>
        <div class="switcher-label-wrap" v-if="$route.params.id == 'new'">
            <div class="label">{{$t('objects.directory.devices.hostName')}}</div>
            <switcher
                    v-model="hotdesk"
            ></switcher>
        </div>
        <form class="object-input-grid">
            <tags-input
                    v-model="hotdesks"
                    :disabled="!hotdesk"
                    :options="[]"
                    :label="$t('objects.directory.devices.hostName')"
                    :addOnlyFromAutocomplete="false"
            ></tags-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";
    import Switcher from "../../utils/switcher";

    export default {
        name: "opened-device-hot-desking",
        components: {Switcher},
        mixins: [openedTabComponentMixin],

        computed: {
            hotdesks: {
                get() {return this.$store.state.directory.devices.itemInstance.hotdesks},
                set(value) {this.setItemProp({prop: 'hotdesks',  value})                }
            },
            hotdesk: {
                get() {return this.$store.state.directory.devices.itemInstance.hotdesk},
                set(value) {this.setItemProp({prop: 'hotdesk',  value})}
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
    .switcher-label-wrap {
        margin: 0 0 28px;

        .switcher {
            margin-top: 7px;
        }
    }
</style>