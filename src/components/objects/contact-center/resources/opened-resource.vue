<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$tc('objects.ccenter.res.res', 1)}} | {{computeTitle}}
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
    import openedResourceGeneral from './opened-resource-general';
    import openedResourceNumbers from './opened-resource-numbers';
    import openedResourceFailure from './opened-resource-failure';

    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";
    import {getResource, addResource, updateResource} from "../../../../api/objects/contact-center/resources";


    export default {
        name: 'opened-resource',
        components: {
            openedResourceGeneral,
            openedResourceNumbers,
            openedResourceFailure
        },
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    name: 'test',
                    gateway: {id: 1},
                    cps: 10,
                    limit: 10,
                    description: 'test',
                    numberList: ['1', '2'],
                    maxErrors: 2,
                    errorIds: [{text: '2xx'}],
                },
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.ccenter.res.numbers', 2),
                        value: 'numbers',
                    },
                    {
                        text: this.$t('objects.ccenter.res.failure'),
                        value: 'failure',
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
                gateway: {
                    required
                },
                cps: {
                    required
                },
                limit: {
                    required
                },
                numberList: {
                    requiredArrayValue
                }
            }
        },

        methods: {
            async save() {
                if (this.id) {
                    await updateResource(this.id, this.itemInstance);
                } else {
                    await addResource(this.itemInstance);
                }
                this.close();
            },

            // load current item from backend
            async loadItem() {
                const response = await getResource(this.id);
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
