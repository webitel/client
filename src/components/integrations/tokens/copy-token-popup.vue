<template>
    <div class="popup-wrap">
        <aside class="popup">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.integrations.tokens.tokenCreated')}}</h3>
            </header>

            <section class="popup-body">
                <p>{{$t('objects.integrations.tokens.popupMessage')}}</p>
                <input
                        ref="input"
                        class="copy-input"
                        :value="value"
                        type="text">
            </section>
            <divider/>

            <div class="control-wrap">
                <i class="icon-icon_allow"></i>

                <div class="btn-controls">
                    <btn class="secondary-btn" @click.native="copy">{{$t('objects.copy')}}</btn>
                    <btn
                            @click.native="close">{{$t('objects.ok')}}
                    </btn>
                </div>
            </div>
        </aside>
        <div class="popup-bg"></div>
    </div>
</template>

<script>
    import btn from '@/components/utils/btn';
    import divider from '@/components/utils/divider';

    export default {
        name: 'copy-token-popup',
        components: {
            divider,
            btn,
        },

        data() {
            return {
                value: 'Hoho-haha!',
            };
        },


        methods: {
            copy() {
                this.$refs.input.select();
                console.log(this.$refs.input.value);
                document.execCommand('copy');
            },

            close() {
                this.$emit('close');
            },
        },

    };
</script>

<style lang="scss" scoped>
    .popup {
        text-align: center;

        .content-title {
            display: block;
            margin: auto;
        }
    }

    .popup-subheading {
        @extend .typo-input-label;
        margin: 0 0 28px;
    }

    .popup-body {
        margin: 0 44px 26px;

        .copy-input {
            display: block;
            position: absolute;
            opacity: 0;
            pointer-events: none;
        }
    }

    .control-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 26px 44px 0;


        .btn-controls {
            margin: 0;
        }
    }
</style>
