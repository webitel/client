<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$tc('objects.lookups.blacklist.blacklist', 1)}} | {{computeTitle}}
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
    import openedBlacklistGeneral from './opened-blacklist-general';
    import openedBlacklistNumbers from './opened-blacklist-numbers';
    import deepEqual from 'deep-equal';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";

    export default {
        name: 'opened-blacklist',
        components: {
            openedBlacklistGeneral,
            openedBlacklistNumbers
        },
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    name: 'test',
                    description: 'test',
                    numberList: [{name: '+8 800 555 3535', id: 1}, {name: '+8 800 555 3535', id: 2}],
                },
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.lookups.blacklist.number', 2),
                        value: 'numbers',
                    },
                ],
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                numberList: {
                    requiredArrayValue
                }
            }
        },

        methods: {
            // load current item from backend
            async loadItem() {
                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            },
        },
    };
</script>


<style lang="scss" scoped>

</style>
