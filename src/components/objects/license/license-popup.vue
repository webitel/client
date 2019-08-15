<template>
    <popup
            class="license-popup"
            :title="'Import license'"
            @close="close"
    >
        <section class="license-popup-content">
            <form-input
                    :label="'Certificate'"
                    :placeholder="'Cerificate'"
            ></form-input>
        </section>
    </popup>
</template>

<script>
    import popup from '../../utils/popup';
    import formInput from '../../utils/form-input';

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
        padding: 0 44px;
        margin: 38px 0 18px;
    }
</style>