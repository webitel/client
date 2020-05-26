<template>
    <section class="value-pair-wrap">
        <span class="label">{{label}}</span>
        <div
                class="value-pair"
                v-for="(pair, key) in pairs"
        >
            <form-input
                    v-for="(v, prop, i) in pair"
                    v-model="pair[prop]"
                    :placeholder="placeholders[i]"
            ></form-input>

            <i
                    class="icon-icon_delete icon-action"
                    v-if="!(required && key === 0)"
                    @click="deleteValuePair(key)"
            ></i>
        </div>
        <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
    </section>
</template>

<script>
    import formInput from './form-input';

    export default {
        name: 'key-value-pair',
        components: {
            'form-input': formInput,
        },

        props: {
            pairs: {
                type: Array,
                required: true,
            },

            label: {
                type: String,
                default: 'Key value pair',
            },

            placeholders: {
                type: Array,
                default: () => ['Key', 'Value'],
            },

            required: {
              type: Boolean,
              default: false,
            },

            addValuePair: {
                type: Function,
                required: true,
            },
        },

        methods: {
            deleteValuePair(valuePairId) {
                this.pairs.splice([valuePairId], 1);
            },
        },
    };
</script>

<style lang="scss" scoped>

</style>
