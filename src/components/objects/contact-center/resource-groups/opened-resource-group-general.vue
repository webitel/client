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
                    :placeholder="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="itemInstance.communication"
                    :v="v.itemInstance.communication"
                    :label="$tc('objects.lookups.communications.communications', 1)"
                    :placeholder="$tc('objects.lookups.communications.communications', 1)"
                    required
            ></dropdown-select>

            <form-input
                    v-model="itemInstance.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-resource-group-general",
        mixins: [openedTabComponentMixin],

    }
</script>