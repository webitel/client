<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.resGroups.timerange') }}</h3>
      <i
        v-if="!disableUserInput"
        class="icon-icon_plus icon-action"
        :title="$t('iconHints.add')"
        @click="addVariable"
      ></i>
    </header>
    <form class="object-input-grid">
      <div>
        <div class="range" v-for="(range, key) in itemInstance.time">
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
            @click="deleteVariable(key)"
          ></i>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import timepicker from '../../../../../app/components/utils/timepicker';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-resource-group-timerange',
  mixins: [openedTabComponentMixin],
  components: { timepicker },
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
