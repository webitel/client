<template>
    <popup
            :title="$t('objects.routing.flow.newFlow')"
            :primaryText="$t('objects.create')"
            :primaryAction="createItemInstance"
            :disableAction="!!selectedOption"
            @close="$emit('close')"
    >
        <section>
            <p class="popup-subheading">{{$t('objects.routing.flow.newFlowDescription')}}</p>

            <ul class="popup-options">
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('general')}"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.routing.flow.generalFlow')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.routing.flow.generalFlowDescription')}}
                    </p>
                    <ul class="radio-wrap">
                        <li class="radio-wrap__item">
                            <radio-button
                                    v-model="selectedOption"
                                    :option="'generalVisual'"
                                    :label="$t('objects.routing.flow.visual')"
                            ></radio-button>
                            <p class="radio-wrap__item-description">{{$t('objects.routing.flow.visualDescription')}}</p>
                        </li>
                        <li class="radio-wrap__item">
                            <radio-button
                                    v-model="selectedOption"
                                    :option="'generalJson'"
                                    :label="$t('objects.routing.flow.json')"
                            ></radio-button>
                            <p class="radio-wrap__item-description">{{$t('objects.routing.flow.jsonDescription')}}</p>
                        </li>
                    </ul>
                </li>
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('call')}"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.routing.flow.callFlow')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.routing.flow.callFlowDescription')}}
                    </p>
                    <ul class="radio-wrap">
                        <li class="radio-wrap__item">
                            <radio-button
                                    v-model="selectedOption"
                                    :option="'callVisual'"
                                    :label="$t('objects.routing.flow.visual')"
                            ></radio-button>
                            <p class="radio-wrap__item-description">{{$t('objects.routing.flow.visualDescription')}}</p>
                        </li>
                        <li class="radio-wrap__item">
                            <radio-button
                                    v-model="selectedOption"
                                    :option="'callJson'"
                                    :label="$t('objects.routing.flow.json')"
                            ></radio-button>
                            <p class="radio-wrap__item-description">{{$t('objects.routing.flow.jsonDescription')}}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import radioButton from '@/components/utils/radio-button';

    export default {
        name: 'create-gateway-popup',
        components: {
            popup,
            radioButton,
        },

        data() {
            return {
                selectedOption: '',
            };
        },


        methods: {
            createItemInstance() {
                this.$router.push({ path: '/routing/flow/new', query: { type: 'json' } });
            },

            computeSelectedOption(option) {
                return this.selectedOption.includes(option);
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
    }

    .radio-wrap {
        margin-top: 18px;

        .radio-wrap__item {
            margin-bottom: 8px;
        }

        .radio-button-label {
            @extend .typo-btn;
        }

        .radio-wrap__item-description {
            @extend .typo-body-md;
            margin: 0;
        }
    }
</style>
