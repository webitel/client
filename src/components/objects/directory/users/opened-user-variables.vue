<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.usersObject.variables')}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="variables">
                <div
                        class="value-pair"
                        v-for="(variable, key) in variables"
                >
                    <form-input
                            v-model="variable.key"
                            :placeholder="$t('objects.usersObject.varKey')"
                    ></form-input>
                    <form-input
                            v-model="variable.value"
                            :placeholder="$t('objects.usersObject.varVal')"
                    ></form-input>
                    <i class="icon-icon_delete" @click="deleteVariable(key)"></i>
                </div>
                <i class="icon-icon_plus" @click="addVariable"></i>
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
                this.variables.push({
                    key: '',
                    value: ''
                });
            },

            deleteVariable(id) {
                this.variables.splice(id, 1);
            },
        }
    }
</script>

<style scoped>

</style>