<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$tc('objects.ccenter.resGroups.resGroups', 1)}} | {{computeTitle}}
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
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue, timerangeNotIntersect} from "@/utils/validators";
    import {
        addResGroup, addResInGroup,
        getResGroup, getResInGroup,
        updateResGroup, updateResInGroup
    } from "../../../../api/objects/contact-center/resourceGroups";

    export default {
        name: 'opened-resource-group',
        mixins: [editComponentMixin],
        components: {
            openedResourceGroupGeneral,
            openedResourceGroupResources,
            openedResourceGroupTimerange,
        },

        data() {
            return {
                itemInstance: {
                    resGroup: {
                        name: 'res gr',
                        communication: {id: 1},
                        description: 'res gr descr',
                        time: [
                            {
                                start: 540,
                                end: 1200,
                            }
                        ],
                    },
                    resList: [],
                },

                tabs: [
                    {text: this.$t('objects.general'), value: 'general',},
                    {value: 'resources', text: this.$tc('objects.ccenter.res.res', 2),},
                    {value: 'timerange', text: this.$t('objects.ccenter.resGroups.timerange'),}
                ],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                resGroup: {
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
                },
                resList: {
                    requiredArrayValue
                },
            }
        },

        methods: {
            async save() {
                try {
                    this.id = await this.saveObject('resGroup', addResGroup, updateResGroup);
                    await this.saveArray('resList', addResInGroup, updateResInGroup);
                    this.close();
                } catch {
                    this.loadItem();
                }
            },

            async loadItem() {
                if(this.id) {
                    await this.loadResGroup();
                    await this.loadResList();
                }
                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            },

            async loadResGroup() {
                this.itemInstance.resGroup = await getResGroup(this.id);
            },

            async loadResList() {
                this.itemInstance.resList = await getResInGroup(this.id);
            }
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
