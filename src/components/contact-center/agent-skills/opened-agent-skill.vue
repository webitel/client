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

            <form class="new_w50">
                <form-input
                        v-model.trim="name"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        v-model.trim="description"
                        :label="$t('objects.description')"
                        textarea
                ></form-input>

            </form>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { required } from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'opened-agent-skill',
        mixins: [editComponentMixin],
        data() {
            return {
            };
        },

        validations: {
            itemInstance: {
                name: {
                    required,
                },
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('ccenter/skills', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() { return this.$store.state.ccenter.skills.itemId; },
                set(value) { this.setId(value); },
            },
            name: {
                get() { return this.$store.state.ccenter.skills.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },
            description: {
                get() { return this.$store.state.ccenter.skills.itemInstance.description; },
                set(value) { this.setItemProp({ prop: 'description', value }); },
            },

          path() {
            return [
              { name: this.$t('objects.ccenter.ccenter') },
              { name: this.$tc('objects.ccenter.skills.agentSkills', 2), route: '/contact-center/skills' },
              {
                name: this.id ? this.itemInstance.name : this.$t('objects.new'),
                route: this.id ? `/contact-center/skills/${this.id}` : '/contact-center/skills/new',
              },
            ];
          },
        },

        methods: {
            ...mapActions('ccenter/skills', {
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
