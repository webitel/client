<template>
    <div class="content-wrap">
        <object-header
                :primaryAction="create"
        >
            {{$t('objects.routing.routing')}} |
            {{$t('objects.routing.dialplan.dialplan')}}
        </object-header>

        <section class="object-content dialplan">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.routing.dialplan.dialplanRules')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadList"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            :title="$t('iconHints.deleteSelected')"
                            @click="deleteSelected"
                    ></i>
                    <i
                            class="icon-icon_reload icon-action"
                            :title="$t('iconHints.reload')"
                            @click="loadList"
                    ></i>
                </div>
            </header>

            <loader v-show="!isLoaded"></loader>

            <vuetable
                    v-show="isLoaded"
                    ref="vuetable"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="name" slot-scope="props">
                    <div>
                        <span class="nameLink" @click="edit(props.rowIndex)">
                        {{dataList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="pattern" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].pattern}}
                    </div>
                </template>

                <template slot="schema" slot-scope="props">
                    <div>
                        <span class="nameLink" @click="openFlow(dataList[props.rowIndex].schema.id)">
                        {{dataList[props.rowIndex].schema.name || 'schema IS EMPTY'}}
                        </span>
                    </div>
                </template>

                <template slot="enabled" slot-scope="props">
                    <switcher
                            :value="!dataList[props.rowIndex].disabled"
                            @input="patchProperty({index: props.rowIndex, prop: 'disabled', value: !$event})"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_draggable"
                       :title="$t('iconHints.draggable')"
                    ></i>
                    <i class="vuetable-action icon-icon_edit"
                       :title="$t('iconHints.edit')"
                       @click="edit(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       :title="$t('iconHints.delete')"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination
                    v-show="isLoaded"
                    v-model="size"
                    @loadDataList="loadList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
                    :page="page"
            ></pagination>
        </section>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import Sortable, { Swap } from 'sortablejs';
    import tableComponentMixin from '../../../mixins/tableComponentMixin';
    import { _checkboxTableField, _actionsTableField_3, _switcherWidth } from '../../../utils/tableFieldPresets';

    Sortable.mount(new Swap());
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const sortableConfig = {
        swap: true, // Enable swap mode
        swapClass: 'sortable-swap-highlight', // Class name for swap item (if swap mode is enabled)
        animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
        easing: 'cubic-bezier(1, 0, 0, 1)', // Easing for animation. Defaults to null. See https://easings.net/ for examples.
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder
        chosenClass: 'sortable-chosen', // Class name for the chosen item
        dragClass: 'sortable-drag', // Class name for the dragging item

        direction: 'vertical', // Direction of Sortable (will be detected automatically if not given)

        forceFallback: isFirefox, // ignore the HTML5 DnD behaviour and force the fallback to kick in
        fallbackClass: 'sortable-fallback', // Class name for the cloned DOM Element when using forceFallback

        setData: (dataTransfer, draggedElement) => {
            dataTransfer.setData('foo', 'bar'); // required by Firefox in order to DnD work: https://stackoverflow.com/a/19055350/1411105
        },
    };

    export default {
        name: 'the-dialplan',
        mixins: [tableComponentMixin],
        data() {
            return {
                sortableInstance: null,
                fields: [
                    _checkboxTableField,
                    { name: 'name', title: this.$t('objects.name') },
                    { name: 'pattern', title: this.$t('objects.routing.dialplan.pattern') },
                    { name: 'schema', title: this.$tc('objects.routing.schema', 1) },
                    { name: 'enabled', title: this.$t('objects.enabled'), width: _switcherWidth },
                    _actionsTableField_3,
                ],
            };
        },

        mounted() {
            this.initSortable();
        },

        watch: {
            dataList() {
                this.initSortable();
            },
        },

        computed: {
            ...mapState('routing/dialplan', {
                dataList: (state) => state.dataList,
                page: (state) => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: (state) => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.routing.dialplan.size;
                },
                set(value) {
                    this.setSize(value);
                },
            },

            search: {
                get() {
                    return this.$store.state.routing.dialplan.search;
                },
                set(value) {
                    this.setSearch(value);
                },
            },
        },

        methods: {

            openFlow(value) {
                this.$router.push({
                    name: 'flow-edit',
                    params: { id: value },
                });
            },

            initSortable() {
                if (this.sortableInstance) this.sortableInstance.destroy();

                // https://github.com/SortableJS/Sortable#options
                const vuetableBody = document.querySelector('.vuetable-body');
                this.sortableInstance = Sortable.create(vuetableBody, {
                    ...sortableConfig,

                    // Element dragging ended
                    onEnd: async (event) => {
                        if (event.oldIndex === event.newIndex) return;
                        const fromId = this.dataList[event.oldIndex].id;
                        const toId = this.dataList[event.newIndex].id;
                        await this.swapRows({ fromId, toId });
                    },
                });
            },

            create() {
                this.$router.push('/routing/dialplan/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'dialplan-edit',
                    params: { id: this.dataList[rowId].id },
                });
            },

            ...mapActions('routing/dialplan', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                patchProperty: 'PATCH_ITEM_PROPERTY',
                swapRows: 'SWAP_ROWS',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),
        },
    };
</script>

<style lang="scss">
    .dialplan .vuetable {
        .sortable-chosen {
            .icon-icon_draggable:before {
                color: #000;
            }
        }

        .icon-action.icon-icon_draggable {
            cursor: grab;
        }

        .sortable-drag {
            position: relative;
            border-radius: $border-radius;
        }

        // Firefox fallback
        .sortable-fallback {
            display: grid;
            grid-template-columns: 42px 1fr 1fr 1fr 10% 240px;
            grid-column-gap: 10px;
            align-items: center;
        }

        .sortable-swap-highlight {
            background: $accent-color;
        }
    }
</style>
