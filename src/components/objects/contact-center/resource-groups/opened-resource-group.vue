<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$tc('objects.ccenter.resGroups.resGroups', 1)}} | {{computeTitle}}
        </object-header>

        <section class="object-content module-new object-with-tabs">
            <tabs
                    :currentTab="currentTab"
                    :tabs="tabs"
                    @change="currentTab = $event"
            ></tabs>
            <component
                    class="tabs-inner-component"
                    :is="computeCurrentTab"
                    :itemInstanceProp="itemInstance"
                    :v="$v"
            ></component>
        </section>
    </div>
</template>

<script>
    import openedResourceGroupGeneral from './opened-resource-group-general';
    import openedResourceGroupResources from './opened-resource-group-resources';
    import openedResourceGroupTimerange from './opened-resource-group-timerange';
    import deepEqual from 'deep-equal';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue, timerangeNotIntersect} from "@/utils/validators";
    import {
        addResGroup, addResInGroup,
        deleteResInGroup,
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
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.ccenter.res.res', 2),
                        value: 'resources',
                    },
                    {
                        text: this.$t('objects.ccenter.resGroups.timerange'),
                        value: 'timerange',
                    }
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
                    strategy: {
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
            async submit() {
                const isEqualToInitial = deepEqual(this.itemInstance, this.initialItem);
                if (!isEqualToInitial) {
                    const validations = this.checkValidations();
                    if (!validations) {
                        try {
                            await this.saveResGroup();
                            await this.saveResGroupResources();
                            this.close();
                        } catch {
                            this.loadItem();
                        }
                    }
                } else {
                    this.close();
                }
            },

            async saveResGroup() {
                const isItemChanged = !deepEqual(this.itemInstance.resGroup, this.initialItem.resGroup);
                if (isItemChanged) {
                    if (this.id) {
                        await updateResGroup(this.itemInstance.resGroup.id, this.itemInstance.resGroup);
                    } else {
                        this.id = await addResGroup(this.itemInstance.resGroup);
                    }
                }
            },

            async saveResGroupResources() {
                await this.addResList();
            },

            async addResList() {
                const newRes = this.itemInstance.resList.filter(res => !res.id);
                if (newRes.length) {
                    for (const res of newRes) {
                        try {
                            await addResInGroup(this.id, res);
                        } catch (err) {
                            throw err;
                        }
                    }
                }
            },

            async loadItem() {
                await this.loadResGroup();
                await this.loadResList();
                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            },

            async loadResGroup() {
                this.itemInstance.resGroup = await getResGroup(this.id);
            },

            async loadResList() {
                const resList = await getResInGroup(this.id);
                this.itemInstance.resList = [...resList];
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
