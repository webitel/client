<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.digitalOcean')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="key"
                    :v="v.itemInstance.key"
                    :label="$t('objects.integrations.storage.oceanKey')"
                    required
            ></form-input>
            <form-input
                    v-model="access"
                    :v="v.itemInstance.access"
                    :label="$t('objects.integrations.storage.oceanAccess')"
                    required
            ></form-input>
            <form-input
                    v-model="bucket"
                    :v="v.itemInstance.bucket"
                    :label="$t('objects.integrations.storage.bucket')"
                    required
            ></form-input>
            <dropdown-select
                    v-model="region"
                    :v="v.itemInstance.region"
                    :options="dropdownDORegionsList"
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

    export default {
        name: "opened-storage-digital-ocean",
        components: {DropdownSelect},
        mixins: [openedTabComponentMixin],
        data() {
            return {
                dropdownDORegionsList: [
                    {name: 'New York City, United States (NYC1)', value: 'NYC1'},
                    {name: 'New York City, United States (NYC2)', value: 'NYC2'},
                    {name: 'New York City, United States (NYC3)', value: 'NYC3'},
                    {name: 'Amsterdam, the Netherlands 9 (AMS1)', value: 'AMS1'},
                    {name: 'Amsterdam, the Netherlands 9 (AMS2)', value: 'AMS2'},
                    {name: 'San Francisco, United States (SFO1)', value: 'SFO1'},
                    {name: 'San Francisco, United States (SFO2)', value: 'SFO2'},
                    {name: 'Singapore (SGP1)', value: 'SGP1'},
                    {name: 'London, United Kingdom (LON1)', value: 'LON1'},
                    {name: 'Frankfurt, Germany (FRA1)', value: 'FRA1'},
                    {name: 'Toronto, Canada (TOR1)', value: 'TOR1'},
                    {name: 'Bangalore, India (BLR1)', value: 'BLR1'},
                    ]
            }
        },

        computed: {
            key: {
                get() {return this.$store.state.integrations.storage.itemInstance.key},
                set(value) {this.setItemProp({prop: 'key', value})}
            },
            access: {
                get() {return this.$store.state.integrations.storage.itemInstance.access},
                set(value) {this.setItemProp({prop: 'access', value})}
            },
            bucket: {
                get() {return this.$store.state.integrations.storage.itemInstance.bucket},
                set(value) {this.setItemProp({prop: 'bucket', value})}
            },
            region: {
                get() {return this.$store.state.integrations.storage.itemInstance.region},
                set(value) {this.setItemProp({prop: 'region', value})}
            },
        },

        methods: {
            ...mapActions('integrations/storage', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>