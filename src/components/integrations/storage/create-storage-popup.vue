<template>
    <popup
        :title="$t('objects.integrations.storage.newStorage')"
        :primaryText="$t('objects.create')"
        :primaryAction="createItemInstance"
        :disableAction="!!this.selectedOption"
        @close="$emit('close')"
    >
        <section>
            <p class="popup-subheading">{{$t('objects.integrations.storage.newStorageDescription')}}</p>
            <ul class="popup-options">
<!--                <li-->
<!--                        class="popup-options__item-wrap"-->
<!--                        :class="{'active': computeSelectedOption('local')}"-->
<!--                        @click="selectPopupOption('local')"-->
<!--                >-->
<!--                    <h4 class="popup-options__item-header">-->
<!--                        {{$t('objects.integrations.storage.local')}}-->
<!--                    </h4>-->
<!--                </li>-->
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('s3')}"
                        @click="selectPopupOption('s3')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.integrations.storage.s3')}}
                    </h4>
                </li>
<!--                <li-->
<!--                        class="popup-options__item-wrap"-->
<!--                        :class="{'active': computeSelectedOption('backblaze')}"-->
<!--                        @click="selectPopupOption('backblaze')"-->
<!--                >-->
<!--                    <h4 class="popup-options__item-header">-->
<!--                        {{$t('objects.integrations.storage.backblaze')}}-->
<!--                    </h4>-->
<!--                </li>-->
               <!-- <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('dropbox')}"
                        @click="selectPopupOption('dropbox')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.integrations.storage.dropbox')}}
                    </h4>
                </li>
                <li
                        class="popup-options__item-wrap"
                        :class="{'active': computeSelectedOption('drive')}"
                        @click="selectPopupOption('drive')"
                >
                    <h4 class="popup-options__item-header">
                        {{$t('objects.integrations.storage.drive')}}
                    </h4>
                </li>-->
            </ul>
        </section>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import RouteNames from '../../../router/_internals/RouteNames.enum';

    export default {
        name: 'create-storage-popup',
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
                    this.$router.push({
                        name: `${RouteNames.STORAGE}-new`,
                        params: { type: this.selectedOption },
                    });
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
            padding: 14px;
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
            margin: 0;
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
