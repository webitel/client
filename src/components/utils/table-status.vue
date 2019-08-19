<template>
    <div class="table-status">
        <i
                class="table-status__icon icon-icon_allow"
                v-if="value"
        ></i>
        <i
                class="table-status__icon icon-icon_deny"
                v-if="!value"
        ></i>
        <span class="table-status__text">
            {{computeStatusText}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "table-status",
        props: {
            value: {
                type: Boolean,
                required: true
            },
            //  Object with true/false properties
            text: {
                type: Object,
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
                return this.text[this.value];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .table-status {
        display: flex;
        align-items: center;
        position: relative;
        padding: $input-padding;

        .table-status__icon {
            position: absolute; // icon absolute position for text vertical alligning
            // too big fsz stretches table-status conteiner and text can't allign as all text fields
            top: 50%;
            font-size: 20px;
            transform: translateY(-50%);
        }
    }

    .table-status__text {
        padding-left: 28px;
    }

    .icon-icon_allow {
       color: $true-color;
    }

    .icon-icon_deny {
       color: $false-color;
    }
</style>