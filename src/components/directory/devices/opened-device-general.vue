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

            <div class="input-extension-wrap">
                <form-input
                        ref="input-password"
                        v-model.trim="password"
                        :v="v.itemInstance.password"
                        :label="$t('objects.password')"
                        required
                ></form-input>

                <div class="input-extension">

                    <div class="input-extension__copy" @click="copyToClipboard">
                        <span>{{$t('objects.copy')}}</span>

                        <div class="hint" v-if="copyMessage">
                            <div class="tooltip-top active">
                                <i class="icon-icon_approve"></i>
                                <span>{{this.copyMessage}}</span>
                            </div>
                        </div>
                    </div>
                    <i class="input-extension__generate icon-icon_generate" @click="generatePassword"></i>
                </div>
            </div>

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
    import eventBus from "../../../utils/eventBus";
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getUsersList} from "../../../api/directory/users/users";
    import {mapActions} from "vuex";

    export default {
        name: "opened-device-general",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                copyMessage: '',
            }
        },

        mounted() {
            this.loadDropdownOptionsList();
        },

        computed: {
            name: {
                get() {return this.$store.state.directory.devices.itemInstance.name},
                set(value) {this.setItemProp({prop: 'name', value})}
            },
            account: {
                get() {return this.$store.state.directory.devices.itemInstance.account},
                set(value) {this.setItemProp({prop: 'account', value})}
            },
            password: {
                get() {return this.$store.state.directory.devices.itemInstance.password},
                set(value) {this.setItemProp({prop: 'password', value})}
            },
            user: {
                get() {return this.$store.state.directory.devices.itemInstance.user},
                set(value) {this.setItemProp({prop: 'user', value})}
            },
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getUsersList(10, search);
                this.dropdownOptionsList = response.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                    }
                });
            },

            generatePassword() {
                const length = 12;
                const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += charset.charAt(Math.floor(Math.random() * charset.length));
                }
                this.password = result;
            },

            copyToClipboard() {
                if (this.password) {
                    eventBus.$emit('copyToClipboard', this.password);
                    this.copyMessage = this.$t('objects.copied');
                    setTimeout(() => this.copyMessage = '', 2000);
                }
            },

            ...mapActions('directory/devices', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>