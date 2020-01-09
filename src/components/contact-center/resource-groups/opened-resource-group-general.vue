<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="name"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="communication"
                    :v="v.itemInstance.communication"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.lookups.communications.communications', 1)"
                    @search="loadDropdownOptionsList"
                    required
            ></dropdown-select>

            <form-input
                    v-model="description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getCommunicationsList} from "../../../api/lookups/communications/communications";
    import {mapActions} from "vuex";

    export default {
        name: "opened-resource-group-general",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                dropdownOptionsList: [],
            }
        },

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            name: {
                get() {return this.$store.state.ccenter.resGroups.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            communication: {
                get() {return this.$store.state.ccenter.resGroups.itemInstance.communication},
                set(value) {this.setItemProp({prop: 'communication', value})}
            },
            description: {
                get() {return this.$store.state.ccenter.resGroups.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getCommunicationsList(0, 10, search);
                this.dropdownOptionsList = response.map(comm => {
                    return {
                        name: comm.name,
                        id: comm.id
                    };
                });
            },

            ...mapActions('ccenter/resGroups', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>