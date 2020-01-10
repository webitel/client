<template>
    <div class="content-wrap">
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.ccenter.buckets.buckets', 1)}} |
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
    import openedBucketGeneral from './opened-bucket-general';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "opened-bucket",
        mixins: [editComponentMixin],
        components: {openedBucketGeneral},

        data() {
            return {
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.permissions.permissions'),
                        value: 'permissions-tab',
                    },
                ],
            };
        },

        validations: {
            itemInstance: {
                name: {
                    required
                }
            }
        },

        computed: {
            ...mapState('ccenter/buckets', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.ccenter.buckets.itemId},
                set(value) {this.setId(value)}
            }
        },

        methods: {
            ...mapActions('ccenter/buckets', {
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