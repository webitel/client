<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.digitalOcean')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="keyId"
                    :v="v.itemInstance.properties.keyId"
                    :label="$t('objects.integrations.storage.oceanKey')"
                    required
            ></form-input>
            <form-input
                    v-model="accessKey"
                    :v="v.itemInstance.properties.accessKey"
                    :label="$t('objects.integrations.storage.oceanAccess')"
                    required
            ></form-input>
            <form-input
                    v-model="bucketName"
                    :v="v.itemInstance.properties.bucketName"
                    :label="$t('objects.integrations.storage.bucket')"
                    required
            ></form-input>
            <dropdown-select
                    v-model="region"
                    :v="v.itemInstance.properties.region"
                    :options="DigitalOceanRegions"
                    :label="$t('objects.integrations.storage.region')"
                    required
            ></dropdown-select>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";
    import DropdownSelect from "../../utils/dropdown-select";
    import {DigitalOceanRegions} from "../../../api/integrations/storage/storage";

    export default {
        name: "opened-storage-digital-ocean",
        components: {DropdownSelect},
        mixins: [openedTabComponentMixin],
        data() {
            return {
                DigitalOceanRegions,
            }
        },

        computed: {
            keyId: {
                get() {return this.$store.state.integrations.storage.itemInstance.properties.keyId},
                set(value) {this.setItemProp({prop: 'keyId', value})}
            },
            accessKey: {
                get() {return this.$store.state.integrations.storage.itemInstance.properties.accessKey},
                set(value) {this.setItemProp({prop: 'accessKey', value})}
            },
            bucketName: {
                get() {return this.$store.state.integrations.storage.itemInstance.properties.bucketName},
                set(value) {this.setItemProp({prop: 'bucketName', value})}
            },
            region: {
                get() {return this.$store.state.integrations.storage.itemInstance.properties.region},
                set(value) {this.setItemProp({prop: 'region', value})}
            },
        },

        methods: {
            ...mapActions('integrations/storage', {
                setItemProp: 'SET_ITEM_PROPERTIES_PROPERTY',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>