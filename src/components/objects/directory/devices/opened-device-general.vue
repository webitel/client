<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.name.$model"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    :hintText="'lorem ipsum'"
                    required
            ></form-input>
            <form-input
                    v-model.trim="v.itemInstance.account.$model"
                    :v="v.itemInstance.account"
                    :label="$t('objects.directory.devices.authId')"
                    :hintText="'lorem ipsum'"
                    required
            ></form-input>

            <div class="input-extension-wrap">
                <form-input
                        ref="input-password"
                        v-model.trim="v.itemInstance.password.$model"
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
                    v-model="itemInstance.user"
                    :label="$t('objects.user')"
            ></dropdown-select>
        </form>
    </section>
</template>

<script>
    import eventBus from "../../../../utils/eventBus";
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import DropdownSelect from "../../../utils/dropdown-select";

    export default {
        name: "opened-device-general",
        components: {DropdownSelect},
        mixins: [openedTabComponentMixin],
        data() {
            return {
                copyMessage: '',
            }
        },
        methods: {
            generatePassword() {
                const length = 12;
                const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += charset.charAt(Math.floor(Math.random() * charset.length));
                }
                this.itemInstance.password = result;
            },

            copyToClipboard() {
                if (this.itemInstance.password) {
                    eventBus.$emit('copyToClipboard', this.itemInstance.password);
                    this.copyMessage = this.$t('objects.copied');
                    setTimeout(() => this.copyMessage = '', 2000);
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>