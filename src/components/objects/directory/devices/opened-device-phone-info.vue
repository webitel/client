<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.devices.phoneInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model="itemInstance.phone"
                    :label="$t('objects.directory.devices.phone')"
                    :placeholder="$t('objects.directory.devices.phone')"
            ></form-input>
            <form-input
                    v-model="itemInstance.ip"
                    :label="$t('objects.directory.devices.ipv4')"
                    :placeholder="$t('objects.directory.devices.ipv4')"
                    :hintText="'lorem ipsum'"
            ></form-input>
            <dropdown-select
                    v-model="itemInstance.vendor"
                    :label="$t('objects.directory.devices.vendor')"
                    :placeholder="$t('objects.directory.devices.vendor')"
            ></dropdown-select>
            <dropdown-select
                    v-model="itemInstance.model"
                    :label="$t('objects.directory.devices.model')"
                    :placeholder="$t('objects.directory.devices.model')"
            ></dropdown-select>
            <form-input
                    v-model="itemInstance.mac"
                    :label="$t('objects.directory.devices.mac')"
                    :placeholder="$t('objects.directory.devices.mac')"
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-device-phone-info",
        mixins: [openedTabComponentMixin],
    }
</script>

<style lang="scss" scoped>

</style>