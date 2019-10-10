<template>
    <section class="value-pair-wrap">
        <span class="label">{{label}}</span>
        <div
                class="value-pair"
                v-for="pair in pairs"
        >
            <form-input
                    v-for="(v, posIndex) in pair"
                    v-model="pair[posIndex]"
                    :placeholder="placeholders[v]"
            ></form-input>

            <i class="icon-icon_delete icon-action" @click="deleteValuePair(key)"></i>
        </div>
        <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
    </section>
</template>

<script>
    import formInput from './form-input';

    export default {
        name: "key-value-pair",
        components: {
            'form-input': formInput,
        },

        props: {
            pairs: {
                type: Array,
                required: true
            },

            label: {
                type: String,
                default: 'Key value pair'
            },

            placeholders: {
                type: Array,
                default: () => ['Key', 'Value']
            },

            addValuePair: {
                type: Function,
                required: true
            }
        },

        methods: {
            deleteValuePair(valuePairId) {
                this.pairs.splice([valuePairId], 1);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .value-pair-wrap {
        position: relative;
    }

    .value-pair {
        @extend .object-input-grid;

        align-items: center;
        grid-template-columns: 1fr 1fr 24px;

        .label {
            position: absolute;
            top: 0;
            //@extend .label;
        }

        .icon-icon_delete {
            margin-bottom: 10px;
            cursor: pointer;

            &:hover {
                color: #000;
            }
        }
    }
</style>