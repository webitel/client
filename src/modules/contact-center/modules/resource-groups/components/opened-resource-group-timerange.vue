<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.resGroups.timerange') }}</h3>
      <add-action
        v-if="!disableUserInput"
        @click="addVariable"
      ></add-action>
    </header>
    <div class="object-input-grid">
      <div>
        <div class="range" v-for="(range, key) in itemInstance.time">
          <wt-timepicker
            :value="range.start * 60"
            :label="$t('objects.ccenter.resGroups.timerangeFrom')"
            :v="v.itemInstance.range"
            format="hh:mm"
            :disabled="disableUserInput"
            @input="setVariableProp({index: key, prop: 'start', value: $event / 60 })"
            required
          >
          </wt-timepicker>
          <wt-timepicker
            :value="range.end * 60"
            :label="$t('objects.ccenter.resGroups.timerangeTo')"
            :v="v.itemInstance.range"
            format="hh:mm"
            :disabled="disableUserInput"
            @input="setVariableProp({index: key, prop: 'end', value: $event / 60 })"
            required
          >
          </wt-timepicker>
          <delete-action
            v-if="key !== 0"
            :disabled="disableUserInput"
            @click="deleteVariable(key)"
          ></delete-action>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-resource-group-timerange',
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
.range {
  display: flex;
  align-items: center;
  margin-top: 18px;

  .wt-timepicker {
    margin-right: 18px;
  }

  .wt-icon-btn {
    margin-top: 26px; // timepicker label height
  }
}
</style>
