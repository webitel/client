<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.buckets.buckets', 2)}}</h3>
            <i class="action-icon icon-icon_plus" @click="addVariable"></i>
        </header>
        <form class="object-input-grid">
            <div class="variables">
                <div
                        class="value-pair"
                        v-for="(variable, key) in itemInstance.buckets"
                >
                    <dropdown-select
                            v-model="variable.key"
                            :label="$t('objects.directory.users.varKey')"
                            :placeholder="$t('objects.directory.users.varKey')"
                            hide-label
                            hide-details
                    ></dropdown-select>
                    <form-input
                            v-model="variable.value"
                            :placeholder="$t('objects.directory.users.varVal')"
                            hide-label
                            hide-details
                    ></form-input>
                    <i class="icon-action icon-icon_delete" @click="deleteVariable(key)"></i>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import DropdownSelect from "../../utils/dropdown-select";

    export default {
        name: "opened-queue-outbound-ivr-buckets",
        components: {DropdownSelect},
        mixins: [openedTabComponentMixin],
        data() {
            return {

            }
        },
        methods: {
            addVariable() {
                this.itemInstance.buckets.push({key: {name: 'new Bucket name as key'}, value: 'Value'});
            },

            deleteVariable(rowIndex) {
                this.itemInstance.buckets.splice(rowIndex, 1);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .value-pair {
        grid-template-columns: 1fr 1fr 24px;
        margin-bottom: 28px;
    }
</style>