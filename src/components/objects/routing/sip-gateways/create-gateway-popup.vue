<template>
    <popup
        :title="$t('objects.routing.gateways.newGateway')"
        :primaryBtnText="$t('objects.create')"
        :primaryBtnAction="createItemInstance"
        :disableAction="!!this.chosenOption"
        @close="$emit('close')"
    >
        <section>
            <p class="popup-subheading">{{$t('objects.routing.gateways.newGatewayDescription')}}</p>

            <ul class="popup-options">
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeChosenOption('register')}"
                        @click="choosePopupOption('register')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.routing.gateways.SIPregistrations')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.routing.gateways.SIPregistrationsDescription')}}
                    </p>
                    <i
                            class="popup-options__item-icon icon-icon_allow"
                            v-show="computeChosenOption('register')"
                    ></i>
                </li>
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeChosenOption('trunking')}"
                        @click="choosePopupOption('trunking')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.routing.gateways.SIPtrunking')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.routing.gateways.SIPtrunkingDescription')}}
                    </p>
                    <i
                            class="popup-options__item-icon icon-icon_allow"
                            v-show="computeChosenOption('trunking')"
                    ></i>
                </li>
            </ul>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';

    export default {
        name: "create-gateway-popup",
        components: {
            popup
        },

        data() {
            return {
                chosenOption: ''
            }
        },


        methods: {
            choosePopupOption(option) {
                this.chosenOption = option;
            },

            createItemInstance() {
                if(this.chosenOption) this.$router.push('/routing/gateways/'+this.chosenOption+'/new');
            },

            computeChosenOption(option) {
                return option === this.chosenOption;
            },
        },

    }
</script>

<style lang="scss" scoped>
    .popup-subheading {
        @extend .typo-input-label;
        margin: 0 0 24px;
    }

    .popup-options {

        .popup-options__item-wrap {
            position: relative;
            padding: 26px 50px 26px 26px;
            margin-bottom: 28px;
            border: 1px solid $input;
            border-radius: $border-radius;
            transition: $transition;
            cursor: pointer;

            &:hover, &.active {
                border-color: $info-color;
            }
        }

        .popup-options__item-header {
            @extend .typo-btn;
            margin: 0 0 11px*1.2;
            font-size: 1em;
        }

        .popup-options__item-text {
            @extend .typo-body-md;
            margin: 0;
            font-size: 0.9em;
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