<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid grid-w50">
            <dropdown-select
                    v-model="itemInstance.agent.user"
                    :v="v.itemInstance.agent.user"
                    :options="userList"
                    :label="$tc('objects.directory.users.users', 1)"
                    :placeholder="$tc('objects.directory.users.users', 1)"
                    required
            ></dropdown-select>

            <form-input
                    v-model="itemInstance.agent.description"
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
        name: "opened-agent-general",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                userList: [{
                    name: 'name 1'
                }, {
                    name: 'name 2'
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>