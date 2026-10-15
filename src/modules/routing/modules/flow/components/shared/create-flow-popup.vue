<template>
  <wt-popup
    class="create-flow-popup"
    size="sm"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.routing.flow.createFlowSelectionPopup') }}
    </template>
    <template #main>
      <div class="create-flow-popup__main-wrapper">
        <section class="create-flow-popup__editors">
          <button
            v-for="editor of editorOptions"
            :key="editor.value"
            :class="{ 'create-flow-popup__editor--active': editor.value === selected.value }"
            class="create-flow-popup__editor"
            type="button"
            @click="selected = editor"
          >
            <img
              :alt="editor.title"
              :src="editor.image"
              class="create-flow-popup__editor-img"
            >
            <p class="create-flow-popup__editor-title typo-subtitle-2">
              {{ editor.title }}
              <wt-hint>{{ editor.description }}</wt-hint>
            </p>
          </button>
        </section>
        <wt-single-select
          v-model:model-value="type"
          :show-clear="false"
          :label="t('vocabulary.type')"
          :options="typeOptions"
          data-key="value"
        />
      </div>
    </template>
    <template #actions>
      <wt-button
        wide
        @click="create"
      >
        {{ t('objects.create') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        wide
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { EngineRoutingSchemaType } from '@webitel/api-services/gen/models';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import RouteNames from '../../../../../../app/router/_internals/RouteNames.enum';
import { useAppearanceStore } from '../../../../../appearance/store/appearanceStore';
import CodeSectionDark from '../../assets/code-section-dark.svg';
import CodeSectionLight from '../../assets/code-section-light.svg';
import DiagramSectionDark from '../../assets/diagram-section-dark.svg';
import DiagramSectionLight from '../../assets/diagram-section-light.svg';
import { FlowEditor } from '../../enums/FlowEditor.enum';

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const router = useRouter();

const appearanceStore = useAppearanceStore();
const { darkMode } = storeToRefs(appearanceStore);

const typeOptions = Object.values(EngineRoutingSchemaType)
	.filter((type) => type !== EngineRoutingSchemaType.Default)
	.map((value) => ({
		value,
		locale: `objects.flow.type.${value}`,
	}));

const editorOptions = computed(() => [
	{
		value: FlowEditor.Diagram,
		title: t('objects.routing.flow.diagram.diagram'),
		description: t('objects.routing.flow.diagram.description'),
		image: darkMode.value ? DiagramSectionDark : DiagramSectionLight,
	},
	{
		value: FlowEditor.Code,
		title: t('objects.routing.flow.code.code'),
		description: t('objects.routing.flow.code.description'),
		image: darkMode.value ? CodeSectionDark : CodeSectionLight,
	},
]);

const [defaultEditor] = editorOptions.value;
const [defaultType] = typeOptions;

const selected = ref(defaultEditor);
const type = ref(defaultType);

const close = () => {
	emit('close');
	selected.value = defaultEditor;
	type.value = defaultType;
};

/** [Claude] the card reads the editor and type from the query, so nothing is stored here */
const create = () => {
	const { href } = router.resolve({
		name: `${RouteNames.FLOW}-card`,
		params: {
			id: 'new',
		},
		query: {
			editor: selected.value.value,
			type: type.value.value,
		},
	});
	window.open(href, '_blank');
	close();
};
</script>

<style scoped>
.create-flow-popup__main-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 var(--spacing-xs);
  gap: var(--spacing-sm);
}

.create-flow-popup__editors {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* https://stackoverflow.com/a/61240964 */
  gap: var(--spacing-xs);
}

.create-flow-popup__editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--spacing-xs) + var(--spacing-md)) 0 var(--spacing-xs);
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid var(--secondary-color-50);
  border-radius: var(--border-radius);
  gap: var(--spacing-md);
}

.create-flow-popup__editor:hover,
.create-flow-popup__editor--active {
  border-color: var(--primary-color);
}

/* fixed pic size prevents a layout shift once the pic loads */
.create-flow-popup__editor-img {
  width: 150px;
  height: 80px;
}

.create-flow-popup__editor-title {
  display: flex;
  align-items: center;
  margin-left: calc(var(--icon-md-size) + var(--spacing-xs)); /* offsets the hint, so the text sits centered */
  color: var(--text-main-color);
  gap: var(--spacing-xs);
}
</style>
