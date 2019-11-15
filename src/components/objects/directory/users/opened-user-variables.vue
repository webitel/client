<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.users.variables')}}</h3>
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
                    ></form-input>
                    <form-input
                            v-model="variable.value"
                            :placeholder="$t('objects.directory.users.varVal')"
                    ></form-input>
                    <i class="icon-action icon-icon_delete" @click="deleteVariable(key)"></i>
                </div>
                <i class="icon-action icon-icon_plus" @click="addVariable"></i>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-user-variables",
        mixins: [openedTabComponentMixin],
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

<style scoped>

</style>