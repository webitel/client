<template>
    <div class="filter">
        <i
                class="icon-icon_filter"
                :class="{'active': filterShowTrigger}"
                @click.stop="toggleFilter"
        ></i>


        <div
                class="filter__list"
                v-show="filterShowTrigger"
                v-clickaway="closeFilter"
        >
            <ul
                    v-for="object in filterObjects"
            >
                <li
                        class="filter__list-item filter__list-header"
                        v-if="Object.keys(filterObjects).length > 1"
                >{{object.name}}</li>
                <li
                        class="filter__list-item"
                        v-for="(item, key) in object.fields"
                >
                    <checkbox
                            :value="item.value"
                            :label="item.name"
                            :key="key"
                            @toggleCheckbox="item.value = $event"
                    ></checkbox>
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
    import checkbox from '../../utils/checkbox';
    import clickaway from '../../../directives/clickaway';

    export default {
        name: "table-filter",
        components: {
            checkbox,
        },
        directives: {
            clickaway
        },
        props: {
            filterObjects: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                filterShowTrigger: false,
            }
        },
        methods: {
            toggleFilter() {
                this.filterShowTrigger = !this.filterShowTrigger;
            },
            closeFilter() {
                this.filterShowTrigger = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .filter {
        display: flex;

        .filter__list {
            @extend .typo-body-md;
            @extend .box-shadow;

            position: absolute;
            top: 24px; //icon height
            right: 0;
            min-width: 196px;
            padding: 13px 16px 14px;
            margin-top: 8px; //margin to icon
            color: #000;
            background: #fff;
            z-index: 1;

            .filter__list-header {
                margin-top: 18px;
                color: rgba(0, 0, 0, 0.4);

                &:first-child {
                    margin-top: 0;
                }
            }

            .filter__list-item {
                height: 24px;
                padding: 3px;
                margin-bottom: 13px;
            }
        }
    }
</style>