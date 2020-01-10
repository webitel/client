<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.queues.variables')}}</h3>
            <i class="icon-action icon-icon_plus" @click="addVariable"></i>
        </header>
        <form class="object-input-grid">
            <div class="variables">
                <div
                        class="value-pair"
                        v-for="(variable, key) in itemInstance.variables"
                >
                    <form-input
                            v-model="variable.key"
                            :placeholder="$t('objects.directory.users.varKey')"
                            hideLabel
                            hideDetails
                    ></form-input>
                    <form-input
                            v-model="variable.value"
                            :placeholder="$t('objects.directory.users.varVal')"
                            hideLabel
                            hideDetails
                    ></form-input>
                    <i class="icon-action icon-icon_delete" @click="deleteVariable(key)"></i>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-queue-member-popup-variables",
        mixins: [openedTabComponentMixin],
        data() {
            return {

            }
        },
        methods: {
            addVariable() {
                this.itemInstance.variables.push({
                    key: '',
                    value: ''
                });
            },

            deleteVariable(rowIndex) {
                this.itemInstance.variables.splice(rowIndex, 1);
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