<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.ccenter.resGroups.resGroups', 1)}} |
            {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :itemInstance="itemInstance"
                :v="$v"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :itemInstanceProp="itemInstance"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import openedResourceGroupGeneral from './opened-resource-group-general';
    import openedResourceGroupResources from './opened-resource-group-resources';
    import openedResourceGroupTimerange from './opened-resource-group-timerange';
    import openedResourceGroupPermissions from './opened-resource-group-permissions';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue, timerangeNotIntersect} from "@/utils/validators";
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-resource-group',
        mixins: [editComponentMixin],
        components: {
            openedResourceGroupGeneral,
            openedResourceGroupResources,
            openedResourceGroupTimerange,
            openedResourceGroupPermissions,
        },

        data() {
            return { };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                communication: {
                    required
                },
                time: {
                    requiredArrayValue,
                    timerangeNotIntersect,
                }
                // resList: {
                //     requiredArrayValue
                // },
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('ccenter/resGroups', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.ccenter.resGroups.itemId},
                set(value) {this.setId(value)}
            },

            tabs() {
                const tabs = [{text: this.$t('objects.general'), value: 'general',},
                    {value: 'resources', text: this.$tc('objects.ccenter.res.res', 2),},
                    {value: 'timerange', text: this.$t('objects.ccenter.resGroups.timerange'),}
                ];

                const permissions = {
                    text: this.$tc('objects.permissions.permissions', 2),
                    value: 'permissions',
                };

                if (this.id) tabs.push(permissions);
                return tabs;
            }
        },

        methods: {
            ...mapActions('ccenter/resGroups', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },

    };
</script>


<style lang="scss" scoped>
    .value-pair-wrap {
        margin-top: 8px;
    }

    .value-pair {
        grid-template-columns: 1fr 24px;
    }
</style>
