<template>
    <div class="content-wrap">
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$t('objects.integrations.storage.storage')}} |
            {{computeTitle}}
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
    import openedStorageGeneral from './opened-storage-general';
    import openedStorageLocal from './opened-storage-local';
    import openedStorageS3 from './opened-storage-s3';
    import openedStorageBackblaze from './opened-storage-backblaze';
    import openedStorageDropbox from './opened-storage-dropbox';
    import openedStorageDrive from './opened-storage-drive';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required, email} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-storage",
        mixins: [editComponentMixin],
        components: {
            openedStorageGeneral,
            openedStorageLocal,
            openedStorageS3,
            openedStorageBackblaze,
            openedStorageDropbox,
            openedStorageDrive,
        },
        data() {
            return {};
        },

        validations() {
            switch (this.$route.params.type) {
                case 'local':
                    return {
                        itemInstance: {
                            name: {required},
                        }
                    };
                case 's3':
                    return {
                        itemInstance: {
                            name: {required},
                            properties: {
                                keyId: {required},
                                accessKey: {required},
                                bucketName: {required},
                                region: {required},
                                endpoint: {required}
                            },
                        }
                    };
                case 'backblaze':
                    return {
                        itemInstance: {
                            name: {required},
                            account: {required},
                            key: {required},
                            bucket: {required},
                            bucketId: {required},
                        }
                    };
                case 'dropbox':
                    return {
                        itemInstance: {
                            name: {required},
                            properties: {
                                token: {required},
                            },
                        }
                    };
                case 'drive':
                    return {
                        itemInstance: {
                            name: {required},
                            properties: {
                                directory: {required},
                                privateKey: {required},
                                email: {required},
                            },
                        }
                    };
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem(this.$route.params.type);
        },

        computed: {
            ...mapState('integrations/storage', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {
                    return this.$store.state.integrations.storage.itemId
                },
                set(value) {
                    this.setId(value)
                }
            },
            tabs() {
                const tabs = [{text: this.$t('objects.general'), value: 'general'}];
                switch (this.$route.params.type) {
                    case 'local':
                        tabs.push({text: this.$t('objects.integrations.storage.configuration'), value: 'local'});
                        break;
                    case 's3':
                        tabs.push({text: this.$t('objects.integrations.storage.configuration'), value: 's3'});
                        break;
                    case 'backblaze':
                        tabs.push({text: this.$t('objects.integrations.storage.configuration'), value: 'backblaze'});
                        break;
                    case 'dropbox':
                        tabs.push({text: this.$t('objects.integrations.storage.configuration'), value: 'dropbox'});
                        break;
                    case 'drive':
                        tabs.push({text: this.$t('objects.integrations.storage.configuration'), value: 'drive'});
                        break;
                }
                return tabs;
            }
        },

        methods: {
            ...mapActions('integrations/storage', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    }
</script>

<style scoped>

</style>