<template>
    <div>
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.ccenter.res.res', 1)}} |
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
    import openedResourceGeneral from './opened-resource-general';
    import openedResourceNumbers from './opened-resource-numbers';
    import openedResourceFailure from './opened-resource-failure';
    import deepEqual from 'deep-equal';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";
    import {
        getResource,
        addResource,
        updateResource,
        getResDisplayList, updateResDisplay, addResDisplay
    } from "../../../api/contact-center/resources/resources";
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-resource',
        mixins: [editComponentMixin],
        components: {
            openedResourceGeneral,
            openedResourceNumbers,
            openedResourceFailure
        },

        data() {
            return {
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
                // numberList: {
                //     requiredArrayValue
                // }
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('ccenter/res', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.ccenter.res.itemId},
                set(value) {this.setId(value)}
            }
        },

        methods: {
            ...mapActions('ccenter/res', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>


<style lang="scss" scoped>

</style>
