<template>
    <div class="table-status">
        <img
                class="table-status__icon"
                :src="computeStatusIcon"
                :alt="'status: ' + value"
        >
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
            computeStatusIcon() {
                return this.value ? require('../../../assets/img/modules/table/circle-true.svg')
                    : require('../../../assets/img/modules/table/circle-false.svg');
            },
            computeStatusText() {
                return this.text[this.value];
            }
        }
    }
</script>

<style scoped>

    .table-status {
        display: flex;
        align-items: center;
    }

    .table-status__text {
        margin-left: 8px;
    }
</style>