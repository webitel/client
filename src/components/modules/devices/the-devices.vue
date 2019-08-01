<template>
    <div class="content-wrap">

        <module-header
                :primaryAction="create"
        >
            Devices
        </module-header>

        <section class="module-content">
            <header class="module-content__header">
                <h3 class="module-content__title">All devices</h3>
                <div class="module-content__actions">
                    <div class="search-form">
                        <input type="text" placeholder="Name, user, auth ID & desk ID" v-model="filter"
                               @keyup="filterData">
                        <i class="icon-icon_deny"></i>
                    </div>
                    <div class="action-buttons">
                        <i class="icon-icon_delete" v-show="anySelected"></i>
                        <i class="icon-icon_approve"></i>
                        <i class="icon-icon_approve"></i>
                    </div>
                </div>
            </header>

            <vuetable
                    class="devices-table"
                    ref="vuetable"
                    :api-mode="false"
                    :fields="fields"
                    :data="filtered"
            >

                <template slot="checkbox" slot-scope="props">
                    <checkbox
                            :value="test[props.rowIndex].isSelected"
                            @toggleCheckbox="toggleCheckbox($event, props.rowIndex)"
                    >
                    </checkbox>
                </template>

                <template slot="name" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].head"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="authId" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].authId"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="user" slot-scope="props">
                    <edit-field
                            class="form__input"
                            :text="filtered[props.rowIndex].user"
                            :disabled="true"
                    ></edit-field>
                </template>

                <template slot="presence" slot-scope="props">
                    <div class="devices-table__presence">
                        <div class="presence-icon"></div>
                        <div class="presence-text">{{filtered[0].presence}}</div>
                    </div>
                </template>


                <template slot="image" slot-scope="props">
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                           @click="action('edit')"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="action('delete')"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import moduleHeader from '../module-header';
    import editField from '../utils/edit-field';
    import checkbox from '../utils/table-checkbox';


    export default {
        name: 'the-devices',
        components: {
            'module-header': moduleHeader,
            'edit-field': editField,
            vuetable,
            checkbox
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    // TODO: UNITED 'NAME' TRANSLATION
                    {
                        name: '__slot:checkbox',
                        title: '',
                        titleClass: 'vuetable-td-checkbox',
                        dataClass: 'vuetable-td-checkbox',
                    },
                    {name: '__slot:name', title: this.$t('modules.permissions.name')},
                    {name: '__slot:authId', title: 'Auth ID'},
                    {name: '__slot:user', title: 'User'},
                    {name: '__slot:presence', title: 'Presence'},
                    {
                        name: '__slot:image',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                    },
                ],
                test: [],
                filtered: [],
                filter: '',
                propertiesToFilter: ['head', 'authId', 'user']
            };
        },
        mounted() {
            // FIXME: delete test data
            for (let i = 0; i < 5; i++) {
                this.test.push({
                    isSelected: false,
                    head: `head${i}`,
                    authId: (i * Math.round(Math.random() * 10)) + '',
                    user: 'user ' + Math.round(Math.random() * 10),
                    presence: 'Offline',
                    id: i,
                });
            }
            this.filterData();
        },
        methods: {
            create() {
                // this.$router.push('/permissions/new');
            },
            action(action) {
                if (action === 'edit') {
                    // this.$router.push({path: '/permissions/new', query: {edit: 'true'}});
                }
            },
            toggleCheckbox(newValue, id) {
                this.test[id].isSelected = newValue;
            },
            filterData() {
                this.filtered = [];
                if (!this.filter) {
                    this.filtered = [...this.test];
                } else {
                    this.test.filter((item) => {
                        for (let i = 0; i < this.propertiesToFilter.length; i++) {
                            const key = this.propertiesToFilter[i];
                            if (item[key].includes(this.filter)) {
                                this.filtered.push(item);
                                console.log(key, item[key], this.filter, item[key].includes(this.filter), this.filtered);
                                break;
                            }
                        }
                    });
                }
            }
        },
        computed: {
            anySelected() {
                return this.filtered.some((item) => item.isSelected);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../../assets/css/main';

    .devices-table__presence {
        display: flex;

        .presence-icon {
            width: 15px;
            height: 15px;
            background: $icon-color;
            border-radius: 50%;
        }

        .presence-text {
            @extend .typo-body-md;

            margin-left: 13px;
        }
    }
</style>
