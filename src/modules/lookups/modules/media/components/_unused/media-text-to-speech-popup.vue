<template>
    <div class="popup-wrap">
        <aside class="popup">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.media.textToSpeech')}}</h3>
            </header>

            <section
                    class="content-body no-gutters"
            >
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

            <divider/>

            <footer class="popup-footer">
                <i class="icon-icon_delete"></i>
                <div class="btn-controls">
                    <btn class="secondary-btn" @click.native="close">{{$t('objects.close')}}</btn>
                    <btn
                            @click.native="primaryBtnAction">{{$t('objects.save')}}
                    </btn>
                </div>
            </footer>
        </aside>
        <div class="popup-bg"></div>
    </div>
</template>

<script>
    import editComponentMixin from '@/app/mixins/baseMixins/baseObjectMixin/baseObjectMixin';
    import divider from '@/app/components/utils/divider';
    import { required } from 'vuelidate/lib/validators';
    import mediaTextToSpeechPopupSettings from './media-text-to-speech-popup-settings';
    import mediaTextToSpeechPopupGeneral from './media-text-to-speech-popup-general';

    export default {
        name: 'media-text-to-speech-popup',
        mixins: [editComponentMixin],
        components: {
            mediaTextToSpeechPopupGeneral,
            mediaTextToSpeechPopupSettings,
            divider,
        },
        props: {
            primaryBtnAction: {
                type: Function,
                default: () => this.close(),
            },
        },
        data() {
            return {
                itemInstance: {
                    name: '',
                    type: {
                        name: 'text',
                    },
                    text: 'lorem ipsum',
                    settings: {
                        provider: {
                            name: 'provider name',
                        },
                        lang: {
                            name: 'En (en-US)',
                        },
                        voice: {
                            name: 'JOey (wale)',
                        },
                        token: '',
                        key: '',
                    },
                },
                currentTab: { value: 'general' },
                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$t('objects.lookups.media.popupSettings'),
                        value: 'settings',
                    },
                ],
            };
        },
        validations: {
            itemInstance: {
                name: {
                    required,
                },
            },
        },
        methods: {
            close() {
                this.$emit('close');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .popup-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
    }

    .popup-bg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.25);
        z-index: 0;
    }

    .popup {
        @extend .scrollbar;
        @extend .box-shadow;

        position: absolute;
        top: 50%;
        left: 50%;
        width: 534px;
        max-height: 80vh;
        padding: 27px 0;
        background: #fff;
        transform: translate(-50%, -50%);
        border-radius: var(--border-radius);
        overflow-y: auto;
        z-index: 10;
    }

    .content-header {
        margin: 0 44px 28px;
    }

    .content-body {
        .tabs {
            padding: 0 44px;
        }

        .tabs-inner-component {
            margin: 0 44px 28px;
        }
    }

    .popup-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 26px 44px 0;
    }
</style>
