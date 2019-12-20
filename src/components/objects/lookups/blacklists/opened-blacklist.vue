<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="save"
                close
        >
            {{$tc('objects.lookups.blacklist.blacklist', 1)}} | {{computeTitle}}
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
    import openedBlacklistGeneral from './opened-blacklist-general';
    import openedBlacklistNumbers from './opened-blacklist-numbers';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'opened-blacklist',
        components: {
            openedBlacklistGeneral,
            openedBlacklistNumbers
        },
        mixins: [editComponentMixin],

        data() {
            return {
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

        validations: {
            itemInstance: {
                name: {
                    required
                },
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('lookups/blacklists', {
                itemInstance: state => state.itemInstance,
            }),
            id: {
                get() {return this.$store.state.lookups.blacklists.itemId},
                set(value) {this.setId(value)}
            }
        },

        methods: {
            ...mapActions('lookups/blacklists', {
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
