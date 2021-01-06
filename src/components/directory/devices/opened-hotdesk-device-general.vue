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

            <div class="input-extension-wrap">
                <form-input
                        v-model.trim="account"
                        :v="v.itemInstance.account"
                        :label="$t('objects.directory.devices.authId')"
                        disabled
                ></form-input>

                <div class="input-extension">
                    <div class="input-extension__copy" @click="copy">
                        <span>{{$t('objects.copy')}}</span>

                        <div class="hint" v-if="copyAccMessage">
                            <div class="tooltip-top active">

                                <span>{{this.copyAccMessage}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
    import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
    import { getUsersList } from '../../../api/directory/users/users';
    import PasswordInput from '../../utils/generate-password-input.vue';

    export default {
        name: 'opened-hotdesk-device-general',
        mixins: [openedTabComponentMixin],
        components: { PasswordInput },
        data() {
            return {
                defaultAccount: '',
                copyAccMessage: '',
            };
        },

        mounted() {
            this.loadDropdownOptionsList();
            this.generateAccount();
        },

        computed: {
            name: {
                get() { return this.$store.state.directory.devices.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },
            account: {
                get() {
 return this.$store.state.directory.devices.itemInstance.account
                    ? this.$store.state.directory.devices.itemInstance.account
                    : this.defaultAccount;
},
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
                const response = await getUsersList(0, 10, search);
                this.dropdownOptionsList = response.list.map((item) => ({
                        name: item.name,
                        id: item.id,
                    }));
            },

            generateAccount() {
                const length = 7;
                const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += charset.charAt(Math.floor(Math.random() * charset.length));
                }
                this.defaultAccount = `hot-${result}`;
            },

            copy() {
                this.disabled = false;
                eventBus.$emit('copy', this.account);
                this.copyAccMessage = this.$t('objects.copied');
                setTimeout(() => this.copyAccMessage = '', 2000);
            },

            ...mapActions('directory/devices', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
