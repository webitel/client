<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid grid-w50">
            <dropdown-select
                    v-model="user"
                    :v="v.itemInstance.user"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.directory.users.users', 1)"
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
    import {getUsersList} from "../../../api/directory/users/users";
    import {mapActions} from "vuex";

    export default {
        name: "opened-agent-general",
        mixins: [openedTabComponentMixin],

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            user: {
                get() {return this.$store.state.ccenter.agents.itemInstance.user},
                set(value) {this.setItemProp({prop: 'user', value})}
            },
            description: {
                get() {return this.$store.state.ccenter.agents.itemInstance.description},
                set(value) {this.setItemProp({prop: 'description', value})}
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getUsersList(0, 10, search);
                this.dropdownOptionsList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            ...mapActions('ccenter/agents', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>