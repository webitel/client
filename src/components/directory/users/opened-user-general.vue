<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="name"
                    :label="$t('objects.name')"
            ></form-input>
            <form-input
                    v-model.trim="username"
                    :v="v.itemInstance.username"
                    :label="$t('objects.directory.users.login')"
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

            <form-input
                    v-model="extension"
                    :label="$t('objects.directory.users.extensions')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import eventBus from '@/utils/eventBus';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'opened-user-general',
        mixins: [openedTabComponentMixin],
        data() {
            return {
                copyMessage: '',
                copyTriggerShow: false,
                type: 'password',
            };
        },

        computed: {
            ...mapState('directory/users', {
                id: (state) => state.itemId,
            }),
            name: {
                get() { return this.$store.state.directory.users.itemInstance.name; },
                set(value) { this.setItemProp({ prop: 'name', value }); },
            },
            username: {
                get() { return this.$store.state.directory.users.itemInstance.username; },
                set(value) { this.setItemProp({ prop: 'username', value }); },
            },
            password: {
                get() { return this.$store.state.directory.users.itemInstance.password; },
                set(value) { this.setItemProp({ prop: 'password', value }); },
            },
            extension: {
                get() { return this.$store.state.directory.users.itemInstance.extension; },
                set(value) { this.setItemProp({ prop: 'extension', value }); },
            },

            computePasswordRepresentation() {
                return this.password.length <= 12 ? this.password : this.password.slice(0, 12);
            },
        },

        methods: {
            generatePassword() {
                const length = 12;
                const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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

            ...mapActions('directory/users', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style scoped>

</style>
