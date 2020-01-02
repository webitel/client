<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.resGroups.timerange')}}</h3>
            <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
        </header>
        <form class="object-input-grid">
            <div>
                <div class="range" v-for="(range, key) in itemInstance.resGroup.time">
                    <timepicker
                            v-model="range.start"
                            :label="$t('objects.ccenter.resGroups.timerangeFrom')"
                            :v="v.itemInstance.range"
                            :format="'mm:ss'"
                            required
                    >
                    </timepicker>
                    <timepicker
                            v-model="range.end"
                            :label="$t('objects.ccenter.resGroups.timerangeTo')"
                            :v="v.itemInstance.range"
                            :format="'mm:ss'"
                            required
                    >
                    </timepicker>
                    <i
                            class="icon-icon_delete icon-action"
                            v-if="key !== 0"
                            @click="deleteValuePair(key)"
                    ></i>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import timepicker from '@/components/utils/timepicker';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-resource-group-timerange",
        mixins: [openedTabComponentMixin],
        components: {
            timepicker
        },

        methods: {
            addValuePair() {
                this.itemInstance.resGroup.time.push({
                    start: 540,
                    end: 1200,
                });
            },

            deleteValuePair(rowIndex) {
                this.itemInstance.resGroup.time.splice(rowIndex, 1);
            },
        }
    }
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