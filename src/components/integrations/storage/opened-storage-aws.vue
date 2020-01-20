<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.aws')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="key"
                    :v="v.itemInstance.key"
                    :label="$t('objects.integrations.storage.awsKey')"
                    required
            ></form-input>
            <form-input
                    v-model="access"
                    :v="v.itemInstance.access"
                    :label="$t('objects.integrations.storage.awsAccess')"
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
                    :options="dropdownAWSRegionOptionsList"
                    :label="$t('objects.integrations.storage.region')"
                    required
            ></dropdown-select>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getUsersList} from "../../../api/directory/users/users";
    import {mapActions} from "vuex";
    import DropdownSelect from "../../utils/dropdown-select";

    export default {
        name: "opened-storage-aws",
        components: {DropdownSelect},
        mixins: [openedTabComponentMixin],
        data() {
            return {
                dropdownAWSRegionOptionsList: [
                    {name: 'EU (Frankfurt)', value: 'eu-central-1'},
                    {name: 'EU (Ireland)', value: 'eu-west-1'},
                    {name: 'EU (London)', value: 'eu-west-2'},
                    {name: 'EU (Paris)', value: 'eu-west-3'},
                    {name: 'EU (Stockholm)', value: 'eu-north-1'},
                    {name: 'Asia Pacific (Hong Kong)', value: 'ap-east-1'},
                    {name: 'Asia Pacific (Mumbai)', value: 'ap-south-1'},
                    {name: 'Asia Pacific (Osaka-Local)', value: 'ap-northeast-3'},
                    {name: 'Asia Pacific (Seoul)', value: 'ap-northeast-2'},
                    {name: 'Asia Pacific (Singapore)', value: 'ap-southeast-1'},
                    {name: 'Asia Pacific (Sydney)', value: 'ap-southeast-2'},
                    {name: 'Asia Pacific (Tokyo)', value: 'ap-northeast-1'},
                    {name: 'US East (Ohio)', value: 'us-east-2'},
                    {name: 'US East (N. Virginia)', value: 'us-east-1'},
                    {name: 'US West (N. California)', value: 'us-west-1'},
                    {name: 'US West (Oregon)', value: 'us-west-2'},
                    {name: 'Canada (Central)', value: 'cn-north-1'},
                    {name: 'China (Ningxia)', value: 'cn-northwest-1'},
                    {name: 'Middle East (Bahrain)', value: 'me-south-1'},
                    {name: 'South America (Sao Paulo)', value: 'sa-east-1'},
                    {name: 'AWS GovCloud (US-East)', value: 'us-gov-east-1'},
                    {name: 'AWS GovCloud (US-West)', value: 'us-gov-west-1'},
                    ],
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