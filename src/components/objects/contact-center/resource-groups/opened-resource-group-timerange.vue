<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.resGroups.timerange')}}</h3>
            <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
        </header>
        <form class="object-input-grid">
            <div>
                <div class="range" v-for="range in itemInstance.timerange">
                    <timepicker
                            v-model="range.start"
                            :label="$t('objects.ccenter.resGroups.timerangeFrom')"
                            :v="v.itemInstance.range"
                            required
                    >
                    </timepicker>
                    <timepicker
                            v-model="range.finish"
                            :label="$t('objects.ccenter.resGroups.timerangeTo')"
                            :v="v.itemInstance.range"
                            required
                    >
                    </timepicker>
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
                this.itemInstance.timerange.push({
                    start: 540,
                    finish: 1200,
                    limit: 10,
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .range {
        display: flex;
        .timepicker {
            margin-right: 18px;
        }
    }
</style>