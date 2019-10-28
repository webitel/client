<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.skills.skills', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.skills.allSkills')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="skillsList"
            >
                <template slot="skillName" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                        {{skillsList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="skillDescription" slot-scope="props">
                    <div>
                        {{skillsList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                        <i class="vuetable-action icon-icon_edit"
                           @click="edit(props.rowIndex)"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="remove(props.rowIndex)"
                        ></i>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '@/components/objects/the-object-header';

    export default {
        name: "the-agent-skills",
        components: {
            'object-header': objectHeader,
            vuetable,
        },
        data() {
            return {
                skillsList: [],
                // vuetable prop
                fields: [
                    {name: 'skillName', title: this.$t('objects.name')},
                    {name: 'skillDescription', title: this.$t('objects.description')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px'
                    },
                ],
            };
        },
        mounted() {
            this.loadSkillsList();
        },
        methods: {
            create() {
                this.$router.push('/lookups/lead-status/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'skills-lookup-edit',
                    params: {id: this.skillsList[rowId].id},
                });
            },

            remove(rowId) {
                const deletedSkill = this.skillsList.splice(rowId, 1)[0];
            },

            loadSkillsList() {
                for (let i = 0; i < 10; i++) {
                    this.skillsList.push({
                        name: 'Skill name ' + i,
                        description: 'Description',
                        id: i
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>