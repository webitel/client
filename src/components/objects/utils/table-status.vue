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

        .table-status__icon {
            font-size: 20px;
        }
    }

    .icon-icon_allow {
       color: $true-color;
    }


    .icon-icon_deny {
       color: $false-color;
    }

    .table-status__text {
        margin-left: 8px;
    }
</style>