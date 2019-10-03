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
                                @keyup=""
                        >
                    </div>
                </div>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="calendarsList"
            >
                <template slot="calendarName" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                        {{calendarsList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="calendarDescription" slot-scope="props">
                    <div>
                        {{calendarsList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                           @click="edit(props.rowIndex)"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="remove(props.rowIndex)"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '@/components/objects/object-header';

    import {getCalendarList} from "../../../../api/objects/lookups/calendars";

    export default {
        name: "the-calendars",
        components: {
            vuetable,
        },
        data() {
            return {
                calendarsList: [],
                search: '',
                // vuetable prop
                fields: [
                    {name: 'calendarName', title: this.$t('objects.name')},
                    {name: 'calendarDescription', title: this.$t('objects.description')},
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
            this.loadCalendarsList();
        },
        methods: {
            create() {
                this.$router.push('/lookups/calendars/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'calendars-edit',
                    params: {id: this.calendarsList[rowId].id},
                });
            },

            remove(rowId) {
                const deletedCalendar = this.calendarsList.splice(rowId, 1)[0];
            },

            async loadCalendarsList() {
                // for (let i = 0; i < 10; i++) {
                //     this.calendarsList.push({
                //         name: 'Calendar name ' + i,
                //         description: 'Description',
                //         id: i
                //     });
                // }
                this.calendarsList = await getCalendarList();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>