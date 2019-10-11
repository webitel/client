<template>
    <popup
            class="license-popup"
            :title="$t('objects.license.importLicense')"
            @close="close"
    >
        <section class="license-popup-content">
            <form-input
                    :label="$t('objects.license.licenseKey')"
                    :placeholder="$t('objects.license.licenseKey')"
            ></form-input>
        </section>
    </popup>
</template>

<script>
    import popup from '../../../utils/popup';
    import formInput from '../../../utils/form-input';

    export default {
        name: "license-popup",
        components: {
            'form-input': formInput,
            popup
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .license-popup-content {
        margin: 38px 0 18px;
    }
</style>