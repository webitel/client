<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$tc('objects.lookups.blacklist.blacklist', 1)}} | {{computeTitle}}
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
    import openedBlacklistGeneral from './opened-blacklist-general';
    import openedBlacklistNumbers from './opened-blacklist-numbers';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";
    import {
        addBlacklist,
        addBlacklistCommunication,
        getBlacklist,
        updateBlacklist, updateBlacklistCommunication
    } from "../../../../api/objects/lookups/blacklists";

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
                    blacklist: {
                        name: 'test',
                        description: 'test',
                    },
                    numberList: [],
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
                blacklist: {
                    name: {
                        required
                    },
                },
                numberList: {
                    requiredArrayValue
                }
            }
        },

        methods: {
            async save() {
                try {
                    const id = await this.saveObject('blacklist', addBlacklist, updateBlacklist);
                    if(!this.id) this.id = id;
                    await this.saveArray('numberList', addBlacklistCommunication);
                    await this.updateArray('numberList', updateBlacklistCommunication);
                    this.close();
                } catch (e) {
                    this.loadItem();
                }
            },

            // load current item from backend
            async loadItem() {
                if (this.id) this.itemInstance.blacklist = await getBlacklist(this.id);
                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            },
        },
    };
</script>


<style lang="scss" scoped>

</style>
