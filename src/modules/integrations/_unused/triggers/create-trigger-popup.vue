<template>
    <popup
            :title="$t('objects.integrations.triggers.newTrigger')"
            :primaryBtnText="$t('objects.create')"
            :primaryBtnAction="createItemInstance"
            :disableAction="!!this.selectedOption"
            @close="$emit('close')"
    >
        <section>
            <p class="popup-subheading">{{$t('objects.integrations.triggers.newTriggerDescription')}}</p>

            <ul class="popup-options">
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('on-event')}"
                        @click="selectPopupOption('on-event')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.integrations.triggers.onEvent')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.integrations.triggers.onEventDescription')}}
                    </p>
                </li>

                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('at-time')}"
                        @click="selectPopupOption('at-time')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.integrations.triggers.atTime')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.integrations.triggers.atTimeDescription')}}
                    </p>
                </li>
            </ul>
        </section>
    </popup>
</template>

<script>
    import popup from '@/app/components/utils/popup';

    export default {
        name: 'create-trigger-popup',
        components: {
            popup,
        },

        data() {
            return {
                selectedOption: '',
            };
        },


        methods: {
            selectPopupOption(option) {
                this.selectedOption = option;
            },

            createItemInstance() {
                if (this.selectedOption) {
                    this.$router.push(`/integrations/triggers/${this.selectedOption}/new`);
                }
            },

            computeSelectedOption(option) {
                return option === this.selectedOption;
            },
        },

    };
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
