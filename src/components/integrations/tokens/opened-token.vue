<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="() => {this.popupTriggerIf = true}"
                close
        >
            <span>{{$tc('objects.integrations.tokens.tokens', 1)}}</span> | {{computeTitle}}
        </object-header>
        <token-popup v-if="popupTriggerIf" @close="popupTriggerIf = false"></token-popup>
        <tabs-component
                :tabs="tabs"
                :itemInstance="itemInstance"
                :v="$v"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :itemInstanceProp="itemInstance"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';
    import { required } from 'vuelidate/lib/validators';
    import tokenPopup from './copy-token-popup';
    import openedTokenGeneral from './opened-token-general';

    export default {
        name: 'opened-token',
        mixins: [editComponentMixin],
        components: {
            tokenPopup,
            openedTokenGeneral,
        },
        data() {
            return {
                itemInstance: {
                    name: 'Trigger name',
                    role: { name: 'Role name' },
                    expires: Date.now().toLocaleString(),
                },
                tabs: [{
                        text: this.$t('objects.general'),
                        value: 'general',
                    }],
                popupTriggerIf: false,
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required,
                },
            },
        },

        methods: {
            async save() {
                if (this.id) {
                    // upd
                } else {
                    // add
                }
                this.close();
            },
        },
    };
</script>

<style lang="scss" scoped>

</style>
