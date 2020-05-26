<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.integrations.storage.s3')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="keyId"
                    :v="v.itemInstance.properties.keyId"
                    :label="$t('objects.integrations.storage.s3Key')"
                    required
            ></form-input>
            <form-input
                    v-model="accessKey"
                    :v="v.itemInstance.properties.accessKey"
                    :label="$t('objects.integrations.storage.s3Access')"
                    required
            ></form-input>
            <form-input
                    v-model="bucketName"
                    :v="v.itemInstance.properties.bucketName"
                    :label="$t('objects.integrations.storage.bucket')"
                    required
            ></form-input>
            <dropdown-select
                    v-if="!this.id"
                    :value="service"
                    :options="serviceOptions"
                    :label="$t('objects.integrations.storage.service')"
                    @input="setService"
            ></dropdown-select>
            <dropdown-select
                    v-show="service.value !== 'custom'"
                    v-model="region"
                    :v="v.itemInstance.properties.region"
                    :options="computeRegionOptions"
                    :label="$t('objects.integrations.storage.region')"
                    required
            ></dropdown-select>
            <form-input
                    v-show="service.value === 'custom'"
                    v-model="endpoint"
                    :v="v.itemInstance.properties.endpoint"
                    :label="$t('objects.integrations.storage.s3Endpoint')"
                    required
            ></form-input>
            <form-input
                    v-show="service.value === 'custom'"
                    v-model="region"
                    :v="v.itemInstance.properties.region"
                    :label="$t('objects.integrations.storage.region')"
                    required
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import DropdownSelect from '../../utils/dropdown-select';
    import { AWSRegions, DigitalOceanRegions } from '../../../api/integrations/storage/storage';

    export default {
        name: 'opened-storage-aws',
        components: { DropdownSelect },
        mixins: [openedTabComponentMixin],
        data() {
            return {
                service: {},
                serviceOptions: [
                    { name: 'AWS S3 Bucket', value: 'S3' },
                    { name: 'Digital Ocean Spaces', value: 'do' },
                    { name: 'Custom', value: 'custom' }],
                AWSRegions,
                DigitalOceanRegions,
            };
        },

        mounted() {
            if (!this.id) this.setService({ name: 'AWS S3 Bucket', value: 'aws' });
        },

        computed: {
            ...mapState('integrations/storage', {
                id: (state) => state.itemId,
            }),

            keyId: {
                get() {
                    return this.$store.state.integrations.storage.itemInstance.properties.keyId;
                },
                set(value) {
                    this.setItemProp({ prop: 'keyId', value });
                },
            },
            accessKey: {
                get() {
                    return this.$store.state.integrations.storage.itemInstance.properties.accessKey;
                },
                set(value) {
                    this.setItemProp({ prop: 'accessKey', value });
                },
            },
            bucketName: {
                get() {
                    return this.$store.state.integrations.storage.itemInstance.properties.bucketName;
                },
                set(value) {
                    this.setItemProp({ prop: 'bucketName', value });
                },
            },
            endpoint: {
                get() {
                    return this.$store.state.integrations.storage.itemInstance.properties.endpoint;
                },
                set(value) {
                    this.setItemProp({ prop: 'endpoint', value });
                },
            },
            region: {
                get() {
                    return this.$store.state.integrations.storage.itemInstance.properties.region;
                },
                set(value) {
                    this.setItemProp({ prop: 'region', value });
                },
            },

            computeRegionOptions() {
                if (this.endpoint.includes('aws')) {
                    return this.AWSRegions;
                } if (this.endpoint.includes('digitalocean')) {
                    return this.DigitalOceanRegions;
                }
                return [];
            },
        },

        methods: {
            ...mapActions('integrations/storage', {
                setItemProp: 'SET_ITEM_PROPERTIES_PROPERTY',
            }),

            setService(value) {
                this.service = value;
                if (this.service.value === 'aws') {
                    this.endpoint = 'amazonaws.com';
                    this.region = {};
                } else if (this.service.value === 'do') {
                    this.endpoint = 'digitaloceanspaces.com';
                    this.region = {};
                } else {
                    this.endpoint = '';
                    this.region = '';
                }
            },
        },
    };
</script>

<style lang="scss" scoped>

</style>
