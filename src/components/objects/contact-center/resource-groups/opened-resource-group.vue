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

    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";
    import {getResGroup} from "../../../../api/objects/contact-center/resourceGroups";

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
                    name: '',
                    communication: {},
                    description: '',
                    strategy: '',
                    resList: ['', ''],
                    timerange: [
                        {
                            start: 540,
                            finish: 1200,
                            limit: 10,
                        }
                    ],
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
                name: {
                    required
                },
                comunication: {
                    required
                },
                strategy: {
                    required
                },
                resList: {
                    requiredArrayValue
                },
                range: {
                    requiredArrayValue
                }
            }
        },

        methods: {

            async save() {
                if (this.id) {
                    // await updateRole(this.id, this.itemInstance);
                } else {
                    // await addRole(this.itemInstance);
                }
                this.close();
            },

            async loadItem() {
                const response = await getResGroup(this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
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
