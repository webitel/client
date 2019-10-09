<template>
    <div class="table-status">
        <span
                class="table-status__icon"
        ></span>
        <div class="table-status__text">
            {{computeStatusText}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "table-status",
        props: {
            value: {
                type: Boolean,
            },

            text: {
                default: () => {
                    return {
                        true: 'On',
                        false: 'Off'
                    }
                }
            }
        },
        computed: {
            computeStatusText() {
                return this.text;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .table-status {
        display: flex;
        align-items: center;
        //padding: $input-padding;

        .table-status__icon {
            width: 10px;
            height: 10px;
            margin-right: 14px;
            background: $icon-color;
            border-radius: 50%;
        }
    }

    .status__true .table-status__icon {
        background: $true-color;
    }

    .status__false .table-status__icon {
        background: $false-color;
    }

    .status__info .table-status__icon {
        background: $info-color;
    }

    .presence {
        &.available .table-status__icon {
            background: $true-color;
        }

        &.ringing .table-status__icon {
            background: #FF9C07;
        }

        &.on-a-call .table-status__icon {
            background: $false-color;
        }

        &.on-hold .table-status__icon {
            background: #FFEA00;
        }
    }

</style>