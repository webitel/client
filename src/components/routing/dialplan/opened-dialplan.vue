<template>
    <div class="content-wrap">
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
          <headline-nav :path="path"></headline-nav>
        </object-header>
        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>
            <form class="object-input-grid">
                <form-input
                        v-model.trim="name"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        required
                ></form-input>

                <dropdown-select
                    v-model="schema"
                    :v="$v.itemInstance.schema"
                    :label="$tc('objects.routing.schema', 1)"
                    :options="dropdownOptionsList"
                    @search="loadDropdownOptionsList"
                    required
                ></dropdown-select>

<!--                1 col container-->
                <div>
                    <form-input
                            v-model.trim="pattern"
                            :v="$v.itemInstance.pattern"
                            :label="$t('objects.routing.dialplan.pattern')"
                            required
                    ></form-input>

                    <form-input
                            v-model="description"
                            :label="$t('objects.description')"
                            textarea
                    ></form-input>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';

    import { required } from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';
    import { getFlowList } from '../../../api/routing/flow/flow';

    export default {
        name: 'opened-dialplan',
        mixins: [editComponentMixin],
        data() {
            return {

            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required,
                },
                schema: {
                    required,
                },
                pattern: {
                    required,
                },
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
            this.loadDropdownOptionsList();
        },

        computed: {
            ...mapState('routing/dialplan', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() { return this.$store.state.routing.dialplan.itemId; },
                set(value) { this.setId(value); },
            },
            name: {
                get() { return this.$store.state.routing.dialplan.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },
            schema: {
                get() { return this.$store.state.routing.dialplan.itemInstance.schema; },
                set(value) { this.setItemProp({ prop: 'schema', value }); },
            },
            pattern: {
                get() { return this.$store.state.routing.dialplan.itemInstance.pattern; },
                set(value) { this.setItemProp({ prop: 'pattern', value }); },
            },
            description: {
                get() { return this.$store.state.routing.dialplan.itemInstance.description; },
                set(value) { this.setItemProp({ prop: 'description', value }); },
            },

          path() {
            return [
              { name: this.$t('objects.routing.routing') },
              { name: this.$t('objects.routing.dialplan.dialplan'), route: '/routing/dialplan' },
              {
                name: this.id ? this.itemInstance.name : this.$t('objects.new'),
                route: this.id ? `/routing/dialplan/${this.id}` : '/routing/dialplan/new',
              },
            ];
          },
    },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getFlowList(0, 10, search);
                this.dropdownOptionsList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('routing/dialplan', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style scoped>

</style>
