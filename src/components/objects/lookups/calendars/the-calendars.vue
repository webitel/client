<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.calendars.calendars', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('objects.lookups.calendars.allCalendars')}}</h3>
                <div class="content-header__actions-wrap">
                    <div class="search-form">
                        <i class="icon-icon_search"></i>
                        <input
                                class="search-input"
                                type="text"
                                :placeholder="$t('objects.lookups.calendars.searchPlaceholder')"
                                v-model="search"
                                @keyup="filterData"
                        >
                        <i
                                class="icon-icon_delete icon-action"
                                :class="{'hidden': anySelected}"
                                @click="deleteSelected"
                        ></i>
                    </div>
                </div>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
            >
                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                        {{filteredDataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="description" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
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
    import {deleteCalendar, getCalendarList} from "../../../../api/objects/lookups/calendars";
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";

    export default {
        name: "the-calendars",
        mixins: [tableComponentMixin],

        data() {
            return {
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'description', title: this.$t('objects.description')},
                    _actionsTableField_2,
                ],
            };
        },
        methods: {
            create() {
                this.$router.push('/lookups/calendars/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'calendars-edit',
                    params: {id: this.filteredDataList[rowId].id},
                });
            },

            async remove(rowId) {
                const deletedCalendar = this.filteredDataList.splice(rowId, 1)[0];
                try {
                    await deleteCalendar(deletedCalendar.id)
                } catch (err) {
                    this.filteredDataList.splice(rowId, 0, deletedCalendar);
                }
            },

            async loadDataList() {
                this.dataList = await getCalendarList();
                this.filterData();
            },
        }
    }
</script>