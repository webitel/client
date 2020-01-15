<template>
    <div class="content-wrap">
        <object-header
            close
        >
            {{$t('objects.directory.directory')}} |
            {{$t('objects.directory.license.license')}}
        </object-header>

        <license-popup
            v-if="popupTriggerIf"
            @close="popupTriggerIf = false"
        ></license-popup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.directory.license.allLicenses')}}
                </h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadDataList"
                    ></search>
                    <i
                            class="icon-icon_upload icon-action"
                            @click="popupTriggerIf = true"
                    ></i>
                    <i
                            class="icon-icon_nav-integrations icon-action"
                            @click="loadDataList"
                    ></i>
                </div>
            </header>


            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="product" slot-scope="props">
                    <div>{{dataList[props.rowIndex].product}}</div>
                </template>

                <template slot="valid-from" slot-scope="props">
                    <div>{{dataList[props.rowIndex].validFrom.toLocaleDateString('ru-RU')}}</div>
                </template>

                <template slot="valid-till" slot-scope="props">
                    <div>{{dataList[props.rowIndex].validTill.toLocaleDateString('ru-RU')}}</div>
                </template>

                <template slot="used" slot-scope="props">
                    <div>{{dataList[props.rowIndex].used}}</div>
                </template>

                <template slot="limit" slot-scope="props">
                    <div>{{dataList[props.rowIndex].limit}}</div>
                </template>

                <template slot="status" slot-scope="props">
                    <div
                            class="license-status"
                            :class="computeStatusClass(dataList[props.rowIndex].validTill)"
                    >
                        {{computeStatusText(dataList[props.rowIndex].validTill)}}
                    </div>
                </template>
            </vuetable>
            <pagination
                    v-model="size"
                    @loadDataList="loadDataList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
            ></pagination>
        </section>
    </div>
</template>

<script>
    import licensePopup from './license-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {mapActions, mapState} from "vuex";

    export default {
        name: "the-license",
        mixins: [tableComponentMixin],
        components: {
            licensePopup,
        },
        data() {
            return {
                fields: [
                    {name: 'product', title: this.$t('objects.directory.license.product')},
                    {name: 'valid-from', title: this.$t('objects.directory.license.validFrom')},
                    {name: 'valid-till', title: this.$t('objects.directory.license.validTill')},
                    {name: 'used', title: this.$t('objects.directory.license.used')},
                    {name: 'limit', title: this.$t('objects.directory.license.limit')},
                    {name: 'status', title: this.$t('objects.directory.license.status')},

                ],
              };
        },computed: {
            ...mapState('directory/license', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {return this.$store.state.ccenter.skills.size},
                set(value) {this.setSize(value)}
            },

            search: {
                get() {return this.$store.state.ccenter.skills.search},
                set(value) {this.setSearch(value)}
            },
        },

        methods: {
            computeStatusText(endDate) {
                const daysLeft = Math.floor(((new Date(endDate)- Date.now())/1000/60/60/24));

                if (daysLeft <= 0) {
                    return this.$t('objects.directory.license.daysToExpire.0');
                } else if(daysLeft < 30) {
                    return this.$t('objects.directory.license.daysToExpire.30');
                } else if(daysLeft < 90) {
                    return this.$t('objects.directory.license.daysToExpire.90');
                }
            },

            computeStatusClass(endDate) {
                const daysLeft = Math.floor(((new Date(endDate)- Date.now())/1000/60/60/24));

                if (daysLeft <= 0) {
                    return 'days0';
                } else if(daysLeft < 30) {
                    return 'days30';
                } else if(daysLeft < 90) {
                    return 'days90';
                }
            },


            ...mapActions('directory/license', {
                loadDataList: 'LOAD_DATA_LIST',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
            }),
        },

    }
</script>

<style lang="scss" scoped>
    $license-90: rgba(255, 234, 0, 0.3);
    $license-30: rgba(255, 68, 68, 0.3);
    $license-0: rgba(0, 0, 0, 0.1);

    .license-status {
        text-align: center;
        width: 93px;
        padding: 5px 8px 3px;
        border-radius: $border-radius;

        &.days90 {
            background: $license-90;
        }

        &.days30 {
            background: $license-30;
        }

        &.days0 {
            background: $license-0;
        }
    }
</style>