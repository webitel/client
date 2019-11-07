<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.permissions.permissionsRole')}}</h3>
        </header>
        <form class="object-input-grid">
            <div>
                <div class="tags-input-wrap">
                    <div class="tags-input__label">
                        {{$tc('objects.permissions.permissionsRole')}}
                    </div>

                    <tags-input
                            v-model="roleTag"
                            :tags="itemInstance.roleTags"
                            :autocomplete-items="dropdownOptionsList"
                            :autocomplete-min-length="0"
                            :placeholder="$tc('objects.permissions.permissionsRole')"
                            @tags-changed="newTags => this.itemInstance.roleTags = newTags"
                            add-only-from-autocomplete
                            autocomplete-filter-duplicates
                    >
                    </tags-input>
                </div>

                <div class="tags-input-wrap">
                    <div class="tags-input__label">
                        {{$t('objects.usersObject.roleAdmin')}}
                    </div>

                    <tags-input
                            v-model="roleAdminTag"
                            :tags="itemInstance.roleAdmin"
                            :autocomplete-items="itemInstance.roleTags"
                            :autocomplete-min-length="0"
                            :placeholder="$t('objects.usersObject.roleAdmin')"
                            @tags-changed="newTags => this.itemInstance.admin = newTags"
                            add-only-from-autocomplete
                            autocomplete-filter-duplicates
                    >
                    </tags-input>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getRoleList} from "../../../../api/objects/permissions/roles";

    export default {
        name: "opened-user-roles",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                roleTag: '',
                roleList: [],
                roleAdminTag: '',
            }
        },

        watch: {
            roleTag: function (newVal) {
                this.searchList(newVal);
            }
        },

        methods: {
            async loadDropdownOptionsList() {
                const response = await getRoleList();
                this.dropdownOptionsList = response.map(item => {
                    return {
                        text: item.role,
                        id: item.id,
                    }
                });
            }
        }
    }
</script>