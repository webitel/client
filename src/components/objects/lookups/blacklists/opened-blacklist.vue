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
    // import openedResourceGeneral from './opened-resource-general';
    // import openedResourceNumbers from './opened-resource-numbers';
    // import openedResourceFailure from './opened-resource-failure';
    import deepEqual from 'deep-equal';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";

    export default {
        name: 'opened-resource',
        components: {
            // openedResourceGeneral,
            // openedResourceNumbers,
            // openedResourceFailure
        },
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    res: {
                        name: 'test',
                        gateway: {id: 1},
                        cps: 10,
                        limit: 10,
                        description: 'test',
                        maxErrors: 2,
                        errorIds: [{text: '2xx'}],
                    },
                    numberList: [{display: '1'}, {display: '2'}],
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
                res: {
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
                },
                numberList: {
                    requiredArrayValue
                }
            }
        },

        methods: {
            async submit() {
                const isItemChanged = !deepEqual(this.itemInstance, this.initialItem);
                if (isItemChanged) {
                    const validations = this.checkValidations();
                    if (!validations) {
                        try {
                            await this.saveResource();
                            await this.saveResNumbers();
                            this.close();
                        } catch (err) {
                            console.log(err)
                            this.loadItem();
                        }
                    }
                } else {
                    this.close();
                }
            },

            async saveResource() {
                const isItemChanged = !deepEqual(this.itemInstance.res, this.initialItem.res);
                if (isItemChanged) {
                    if (this.id) {
                        console.log(this.itemInstance.res);
                        await updateResource(this.id, this.itemInstance.res);
                    } else {
                        this.id = await addResource(this.itemInstance.res);
                    }
                }
            },

            async saveResNumbers() {
                await this.addNumbersList();
                await this.updateNumbersList();
            },

            async addNumbersList() {
                const newNumber = this.itemInstance.numberList.filter(num => !num.id && num.display);
                if (newNumber.length) {
                    for (const num of newNumber) {
                        try {
                            await addResDisplay(this.id, num);
                        } catch (err) {
                            throw err;
                        }
                    }
                }
            },

            async updateNumbersList() {
                for (const num of this.itemInstance.numberList) {
                    if (num.id) {
                        const initIndex = this.initialItem.numberList.findIndex(initialNum => {
                            return deepEqual(num, initialNum);
                        });
                        if (initIndex === -1) {
                            try {
                                await updateResDisplay(this.id, num.id, num);
                            } catch (err) {
                                throw err;
                            }
                        }
                    }
                }
            },

            // load current item from backend
            async loadItem() {
                await this.loadResource();
                await this.loadNumbers();
                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            },

            async loadResource() {
                this.itemInstance.res = await getResource(this.id);
            },

            async loadNumbers() {
                const response = await getResDisplayList(this.id);
                this.itemInstance.numberList = [...response];
            },
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
