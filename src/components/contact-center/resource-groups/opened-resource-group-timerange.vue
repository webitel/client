<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.resGroups.timerange')}}</h3>
            <i
              v-if="!disableUserInput"
              class="icon-icon_plus icon-action"
                    :title="$t('iconHints.add')"
                    @click="addValuePair"
            ></i>
        </header>
        <form class="object-input-grid">
            <div>
                <div class="range" v-for="(range, key) in time">
                    <timepicker
                            :value="range.start"
                            :label="$t('objects.ccenter.resGroups.timerangeFrom')"
                            :v="v.itemInstance.range"
                            :format="'hh:mm'"
                            :disabled="disableUserInput"
                            @input="setVariableProp({index: key, prop: 'start', value: $event})"
                            required
                    >
                    </timepicker>
                    <timepicker
                            :value="range.end"
                            :label="$t('objects.ccenter.resGroups.timerangeTo')"
                            :v="v.itemInstance.range"
                            :format="'hh:mm'"
                            :disabled="disableUserInput"
                            @input="setVariableProp({index: key, prop: 'end', value: $event})"
                            required
                    >
                    </timepicker>
                    <i
                      v-if="key !== 0"
                      class="icon-icon_delete icon-action"
                            :title="$t('iconHints.delete')"
                            :disabled="disableUserInput"
                            @click="deleteValuePair(key)"
                    ></i>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import timepicker from '@/components/utils/timepicker';
    import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'opened-resource-group-timerange',
        mixins: [openedTabComponentMixin],
        components: {
            timepicker,
        },

        computed: {
            ...mapState('ccenter/resGroups', {
                time: (state) => state.itemInstance.time,
            }),
        },

        methods: {
            ...mapActions('ccenter/resGroups', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addValuePair: 'ADD_VARIABLE_PAIR',
                setVariableProp: 'SET_VARIABLE_PROP',
                deleteValuePair: 'DELETE_VARIABLE_PAIR',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .range {
        display: flex;
        align-items: center;
        margin-top: 18px;

        .timepicker {
            margin-right: 18px;
        }

        .icon-action {
            margin-top: 26px; // timepicker label height
        }
    }
</style>
