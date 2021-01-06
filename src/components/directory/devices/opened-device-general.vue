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
            <form-input
                    v-model.trim="account"
                    :v="v.itemInstance.account"
                    :label="$t('objects.directory.devices.authId')"
                    required
            ></form-input>

              <password-input
                  :value="password"
                  :v="v.itemInstance.password"
                  required
                  @input="setItemProp({ prop: 'password', value: $event })"
              ></password-input>

            <dropdown-select
                    v-model="user"
                    :options="dropdownOptionsList"
                    :label="$t('objects.user')"
                    @search="loadDropdownOptionsList"
            ></dropdown-select>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import { mapActions } from 'vuex';
    import { getUsersList } from '../../../api/directory/users/users';
    import PasswordInput from '../../utils/generate-password-input.vue';

    export default {
        name: 'opened-device-general',
        mixins: [openedTabComponentMixin],
        components: { PasswordInput },

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            name: {
                get() { return this.$store.state.directory.devices.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },
            account: {
                get() { return this.$store.state.directory.devices.itemInstance.account; },
                set(value) { this.setItemProp({ prop: 'account', value }); },
            },
            password: {
                get() {
                    return this.$store.state.directory.devices.itemInstance.password;
                },
                set(value) {
                    this.setItemProp({ prop: 'password', value });
                },
            },
            user: {
                get() { return this.$store.state.directory.devices.itemInstance.user; },
                set(value) { this.setItemProp({ prop: 'user', value }); },
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getUsersList(1, 10, search);
                this.dropdownOptionsList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            ...mapActions('directory/devices', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
