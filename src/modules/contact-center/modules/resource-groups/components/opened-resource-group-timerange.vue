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
            :custom-validators="hourRangeValidators"
            :disabled="disableUserInput"
            :label="$t('objects.ccenter.resGroups.timerangeFrom')"
            :v="getFieldValidation(key, 'start')"
            :model-value="range.start * 60"
            format="hh:mm"
            required
            @update:model-value="setVariableProp({index: key, prop: 'start', value: $event / 60 })"
          />
          <wt-timepicker
            :custom-validators="hourRangeValidators"
            :disabled="disableUserInput"
            :label="$t('objects.ccenter.resGroups.timerangeTo')"
            :v="getFieldValidation(key, 'end')"
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
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { getForEachHourRangeValidation } from '../../../../../app/utils/validators';

export default {
	name: 'OpenedResourceGroupTimerange',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	computed: {
		hourRangeValidators() {
			return [
				{
					name: 'hourRange',
					text: this.$t('validation.hourRange'),
				},
			];
		},
	},
	methods: {
		getFieldValidation(index, prop) {
			return getForEachHourRangeValidation(
				this.v.itemInstance.time.$each.$response,
				index,
				prop,
			);
		},
	},
};
</script>

<style
  lang="scss"
  scoped
>
.range {
  display: flex;
  align-items: start;
  margin-top: 18px;

  .wt-timepicker {
    margin-right: 18px;
  }

  .wt-icon-btn {
    margin-top: 26px; // timepicker label height
  }
}
</style>
