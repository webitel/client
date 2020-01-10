<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$tc('objects.integrations.triggers.triggers', 1)}}</span> | {{computeTitle}}
        </object-header>
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
    import openedTriggerAtTimeGeneral from './opened-trigger-at-time-general';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "opened-trigger-at-time",
        mixins: [editComponentMixin],
        components: {
            openedTriggerAtTimeGeneral,
        },
        data() {
            return {
                itemInstance: {
                    name: 'Trigger name',
                    schema: {name: 'Schema name'},

                    description: 'lorem ipsum'
                },
                tabs: [{
                        text: this.$t('objects.general'),
                        value: 'general',
                    }]
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
            }
        },

        methods: {
            async save() {
                if (this.id) {
                    // upd
                } else {
                    //add
                }
                this.close();
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>