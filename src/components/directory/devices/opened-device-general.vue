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
                        :value="computePasswordRepresentation"
                        :label="$t('objects.password')"
                        :type="type"
                        @input="password = $event"
                ></form-input>

                <div class="input-extension">
                    <div class="input-extension__copy" v-show="copyTriggerShow" @click="copyToClipboard">
                        <span>{{$t('objects.copy')}}</span>

                        <div class="hint" v-if="copyMessage">
                            <div class="tooltip-top active">
<!--                                <i class="icon-icon_approve"></i>-->
                                <span>{{this.copyMessage}}</span>
                            </div>
                        </div>
                    </div>
                    <i
                            class="input-extension__generate icon-icon_generate"
                            :title="$t('iconHints.generate')"
                            @click="generatePassword"
                    ></i>
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
                defaultPassword: '12345678',
                copyMessage: '',
                copyTriggerShow: false,
                type: 'password'
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
                get() {
                    return this.$store.state.directory.devices.itemInstance.password
                    ? this.$store.state.directory.devices.itemInstance.password
                    : this.defaultPassword
                },
                set(value) {
                    this.defaultPassword = '';
                    this.setItemProp({prop: 'password', value})
                }
            },
            user: {
                get() {return this.$store.state.directory.devices.itemInstance.user},
                set(value) {this.setItemProp({prop: 'user', value})}
            },

            computePasswordRepresentation() {
                return this.password.length <= 12 ? this.password : this.password.slice(0, 12);
            }
        },

        methods: {
            async loadDropdownOptionsList(search) {
                const response = await getUsersList(0, 10, search);
                this.dropdownOptionsList = response.list.map(item => {
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
                this.copyTriggerShow = true;
                this.type = 'text';
            },

            copyToClipboard() {
                if (this.password) {
                    eventBus.$emit('copyToClipboard', this.password);
                    this.copyMessage = this.$t('objects.copied');
                    setTimeout(() => this.copyMessage = '', 2000);
                }
                this.type = 'password';
            },

            ...mapActions('directory/devices', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    }
</script>

<style lang="scss" scoped>

</style>