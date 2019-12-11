<template>
    <div class="invalid input__details">
        {{computeErrorText}}
    </div>
</template>

<script>
    export default {
        name: "validation-message",
        props: {
            v: {
                // type: Object,
                // required: true
            }
        },
        computed: {
            computeErrorText() {
                if (this.v && this.v.$dirty) {
                    if (this.v.required === false) {
                        return this.$t('validation.required');
                    } else if (this.v.numeric === false) {
                        return this.$t('validation.numeric');
                    } else if (this.v.email === false) {
                        return this.$t('validation.email');
                    } else if (this.v.sameAs === false) {
                        return this.$t('validation.sameAs');
                    } else if (this.v.minValue === false) {
                        return this.$t('validation.minValue');
                    } else if (this.v.requiredArrayValue === false) {
                        return this.$t('validation.requiredArrayValue');
                    } else if (this.v.maxValue === false) {
                        return this.$t('validation.maxValue');
                    } else if (this.v.gatewayHostValidator === false) {
                        return this.$t('validation.gatewayHostValidator');
                    } else if (this.v.ipValidator === false) {
                        return this.$t('validation.ipValidator');
                    } else if (this.v.macValidator === false) {
                        return this.$t('validation.macValidator');
                    }
                }
                return ''
            },
        }
    }
</script>

<style lang="scss" scoped>

    .input__details {
        @extend .typo-body-md;

        height: 14px;
        margin-top: 8px;
    }

</style>