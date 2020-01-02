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
                    <search
                            v-model="search"
                            @filterData="loadDataList"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                </div>
            </header>

                <vuetable
                        :api-mode="false"
                        :fields="fields"
                        :data="dataList"
                >
                    <template slot="name" slot-scope="props">
                        <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                        {{dataList[props.rowIndex].name}}
                        </span>
                        </div>
                    </template>

                    <template slot="description" slot-scope="props">
                        <div>
                            {{dataList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
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
    import {deleteCalendar, getCalendarList} from "../../../api/lookups/calendars";
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
                    params: {id: this.dataList[rowId].id},
                });
            },

            async deleteItem(item) {
                try {
                    await deleteCalendar(item.id);
                } catch (err) {
                    throw err;
                }
            },

            async loadDataList() {
                this.dataList = await getCalendarList(this.size, this.search);
            },
        }
    }
</script>