<template>
    <popup
            class="license-popup"
            :title="$t('objects.directory.license.importLicense')"
            :primaryAction="save"
            @close="close"
    >
        <section class="license-popup-content">
            <form-input
                    v-model="key"
                    :label="$t('objects.directory.license.licenseKey')"
            ></form-input>
        </section>
    </popup>
</template>

<script>
    import { mapActions } from 'vuex';
    import popup from '../../utils/popup';
    import formInput from '../../utils/form-input';

    export default {
        name: 'license-popup',
        components: {
            formInput,
            popup,
        },

        computed: {
            key: {
                get() {
                    return this.$store.state.directory.license.key;
                },
                set(value) {
                    this.setKey(value);
                },
            },
        },

        methods: {
            async save() {
                await this.updateItem();
                this.close();
            },

            close() {
                this.$emit('close');
            },

            ...mapActions('directory/license', {
                setKey: 'SET_KEY_PROPERTY',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .license-popup-content {
        margin: 38px 0 18px;
    }
</style>
