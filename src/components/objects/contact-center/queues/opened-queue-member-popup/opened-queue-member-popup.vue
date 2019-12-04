<template>
    <popup
            :title="$tc('objects.ccenter.queues.members', 1)"
            :primaryBtnAction="addItem"
            no-gutters
            @close="$emit('close')">
        <div>
            <section class="object-with-tabs">
                <tabs
                        :currentTab="currentTab"
                        :tabs="tabs"
                        @change="currentTab = $event"
                ></tabs>
                <component
                        class="tabs-inner-component"
                        :is="computeCurrentTab"
                        :itemInstanceProp="itemInstance"
                        :v="$v"
                ></component>
            </section>
        </div>
    </popup>
</template>

<script>
    import openedQueueMemberPopupGeneral from './opened-queue-member-popup-general';
    import openedQueueMemberPopupCommunication from './opened-queue-member-popup-communication';
    import openedQueueMemberPopupVariables from './opened-queue-member-popup-variables';
    import popup from '@/components/utils/popup';
    import editComponentMixin from '@/mixins/editComponentMixin';

    export default {
        name: "opened-queue-member-popup",
        mixins: [editComponentMixin],
        components: {
            openedQueueMemberPopupGeneral,
            openedQueueMemberPopupCommunication,
            openedQueueMemberPopupVariables,
            popup,
        },
        props: {
            value: {
                type: Object,
            },
        },

        data() {
            return {
                itemInstance: {
                    name: '',
                    priority: 0,
                    expire: Date.now(),
                    bucket: {name: 'Bucket'},
                    timezone: {name: 'Timezone'},
                    skills: [{text: 'skill1'}, {text: 'skill2'}],
                    variables: [{key: 'Key', value: 'Value'},{key: 'Key', value: 'Value'},]
                },
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$tc('objects.lookups.communications.communications', 1),
                        value: 'communication',
                    },
                    {
                        text: this.$tc('objects.ccenter.queues.variables', 2),
                        value: 'variables',
                    },
                ],
            }
        },

        validations: {
            itemInstance: {

            }
        },

        mounted() {
            if (this.value) this.itemInstance = this.value;
        },

        methods: {
            addItem() {
                this.$emit('addItem', this.itemInstance);
            }
        }
    }
</script>

<style scoped>

</style>