<template>
  <wt-popup size="sm" min-width="480" @close="close">
    <template #title>
      {{ $t('objects.lookups.skills.skills', 2) }}
    </template>
    <template #main>
      <section>
        <wt-table :data="dataList" :grid-actions="false" :headers="headers" :selectable="false">
          <template #skill="{ item }">
            {{ item.name }}
          </template>
        </wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'OpenedQueueAgentSkillsPopup',
	props: {
		itemId: {
			required: true,
		},
	},

	computed: {
		...mapGetters('ccenter/queues/agents', {
			getSkills: 'GET_ITEM_SKILLS',
		}),
		dataList() {
			return this.getSkills(this.itemId);
		},
		headers() {
			return [
				{
					value: 'skill',
					text: this.$t('objects.lookups.skills.skills', 1),
				},
			];
		},
	},
	methods: {
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss" scoped></style>
