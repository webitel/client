<template>
    <popup
        :title="$t('objects.ccenter.queues.newQueue')"
        :primaryText="$t('objects.create')"
        :primaryAction="createItemInstance"
        :disableAction="!!this.selectedOption"
        @close="$emit('close')"
    >
        <section>
            <p class="popup-subheading">{{$t('objects.ccenter.queues.newQueueDescription')}}</p>

            <ul class="popup-options">

                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('outbound-ivr')}"
                        @click="selectPopupOption('outbound-ivr')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.ccenter.queues.outboundIVR')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.ccenter.queues.outboundIVRDescription')}}
                    </p>
                </li>

                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('inbound-queue')}"
                        @click="selectPopupOption('inbound-queue')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.ccenter.queues.inboundQueue')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.ccenter.queues.inboundQueueDescription')}}
                    </p>
                </li>

                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('offline-queue')}"
                        @click="selectPopupOption('offline-queue')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.ccenter.queues.offlineQueue')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.ccenter.queues.offlineQueueDescription')}}
                    </p>
                </li>

                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('preview-dialer')}"
                        @click="selectPopupOption('preview-dialer')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.ccenter.queues.previewDialer')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.ccenter.queues.previewDialerDescription')}}
                    </p>
                </li>

                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('progressive-dialer')}"
                        @click="selectPopupOption('progressive-dialer')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.ccenter.queues.progressiveDialer')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.ccenter.queues.progressiveDialerDescription')}}
                    </p>
                </li>

                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('predictive-dialer')}"
                        @click="selectPopupOption('predictive-dialer')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.ccenter.queues.predictiveDialer')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.ccenter.queues.predictiveDialerDescription')}}
                    </p>
                </li>
            </ul>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';

    export default {
        name: "create-queue-popup",
        components: {
            popup
        },

        data() {
            return {
                selectedOption: ''
            }
        },


        methods: {
            selectPopupOption(option) {
                this.selectedOption = option;
            },

            createItemInstance() {
                if(this.selectedOption) {
                    this.$router.push('/contact-center/queues/'+this.selectedOption+'/new');
                }
            },

            computeSelectedOption(option) {
                return option === this.selectedOption;
            },
        },

    }
</script>

<style lang="scss" scoped>
    .popup-subheading {
        @extend .typo-input-label;
        margin: 0 0 28px;
    }

    .popup-options {
        margin-bottom: 28px;

        .popup-options__item-wrap {
            position: relative;
            padding: 28px 50px 28px 28px;
            margin-bottom: 18px;
            border: 2px solid $input;
            border-radius: $border-radius;
            cursor: pointer;

            &:hover, &.active {
                border-color: $info-color;
            }
        }

        .popup-options__item-header {
            @extend .typo-btn;
            margin: 0 0 11px;
            /*font-size: 1em;*/
        }

        .popup-options__item-text {
            @extend .typo-body-md;
            margin: 0;
            /*font-size: 0.9em;*/
        }

        .popup-options__item-icon {
            position: absolute;
            top: 50%;
            right: 26px;
            transform: translateY(-50%);
            color: $info-color;
        }
    }
</style>