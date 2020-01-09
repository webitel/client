<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.resGroup.name.$model"
                    :v="v.itemInstance.resGroup.name"
                    :label="$t('objects.name')"
                    :placeholder="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="itemInstance.resGroup.communication"
                    :v="v.itemInstance.resGroup.communication"
                    :options="dropdownOptionsList"
                    :displayProperty="'name'"
                    :label="$tc('objects.lookups.communications.communications', 1)"
                    :placeholder="$tc('objects.lookups.communications.communications', 1)"
                    @search="loadDropdownOptionsList"
                    required
            ></dropdown-select>

            <form-input
                    v-model="itemInstance.resGroup.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getCommunicationsList} from "../../../api/lookups/communications/communications";

    export default {
        name: "opened-resource-group-general",
        mixins: [openedTabComponentMixin],
        data() {
            return {}
        },

        methods: {
            async loadDropdownOptionsList() {
                const response = await getCommunicationsList();
                this.dropdownOptionsList = response.map(comm => {
                    return {
                        name: comm.name,
                        id: comm.id
                    };
                });
            }
        }
    }
</script>