<template>
    <popup
            :title="$t('objects.directory.devices.newDevice')"
            :primaryText="$t('objects.create')"
            :primaryAction="createItemInstance"
            :disableAction="!!this.selectedOption"
            @close="$emit('close')"
    >
        <section>
            <p class="popup-subheading">{{$t('objects.directory.devices.newDeviceDescription')}}</p>

            <ul class="popup-options">
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('hotdesk')}"
                        @click="selectPopupOption('hotdesk')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.directory.devices.hotDeskingDevice')}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$t('objects.directory.devices.hotdeskingDevicsSettings')}}
                    </p>
                </li>
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('default')}"
                        @click="selectPopupOption('default')"
                >
                    <h4 class="popup-options__item-header">
                        {{$tc('objects.directory.devices.devices', 1)}}
                    </h4>
                    <p class="popup-options__item-text">
                        {{$tc('objects.directory.devices.deviceSettings', 1)}}
                    </p>
                </li>
            </ul>
        </section>
    </popup>
</template>

<script>
    import popup from '../../utils/popup';

    export default {
        name: "create-device-popup",
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
                if(this.selectedOption === 'hotdesk') {
                    this.$router.push('/directory/devices/hotdesk/new');
                }
                else {
                    this.$router.push('/directory/devices/new');
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
        margin: 0 0 13px;
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