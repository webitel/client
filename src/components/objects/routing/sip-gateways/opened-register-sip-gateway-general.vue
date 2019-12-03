<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.name.$model"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="v.itemInstance.registrar.$model"
                    :v="v.itemInstance.registrar"
                    :label="$t('objects.routing.gateways.hostnameRegister')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="v.itemInstance.expires.$model"
                    :v="v.itemInstance.expires"
                    :label="$t('objects.routing.gateways.expire')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="v.itemInstance.password.$model"
                    :v="v.itemInstance.password"
                    :label="$t('objects.password')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="itemInstance.description"
                    :label="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-register-sip-gateway-general",
        mixins: [openedTabComponentMixin],
    }
</script>