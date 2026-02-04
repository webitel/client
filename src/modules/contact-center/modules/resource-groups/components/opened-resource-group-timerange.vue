<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.ccenter.resGroups.timerange') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addVariable"
      />
    </header>
    <div class="object-input-grid">
      <div>
        <div
          v-for="(range, key) in itemInstance.time"
          class="range"
        >
          <wt-timepicker
            :disabled="disableUserInput"
            :label="$t('objects.ccenter.resGroups.timerangeFrom')"
            :v="v.itemInstance.range"
            :model-value="range.start * 60"
            format="hh:mm"
            required
            @update:model-value="setVariableProp({index: key, prop: 'start', value: $event / 60 })"
          />
          <wt-timepicker
            :disabled="disableUserInput"
            :label="$t('objects.ccenter.resGroups.timerangeTo')"
            :v="v.itemInstance.range"
            :model-value="range.end * 60"
            format="hh:mm"
            required
            @update:model-value="setVariableProp({index: key, prop: 'end', value: $event / 60 })"
          />
          <wt-icon-action
            v-if="key !== 0"
            :disabled="disableUserInput"
            action="delete"
            @click="deleteVariable(key)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedResourceGroupTimerange',
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
