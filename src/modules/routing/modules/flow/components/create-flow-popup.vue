<template>
  <selection-popup v-bind="$attrs" :selected="selected" :title="$t('objects.routing.flow.createFlowSelectionPopup')"
    overflow @close="close" @select="create">
    <!--Main flow popup content deed to make in "after-section"
     because in another case a tooltip will display incorrectly,
     and in general this is a specific case-->
    <template #after-section>
      <div class="create-flow-popup__main-wrapper">
        <section class="popup-flows">
          <button v-for="(editor) of editorOptions" :class="{ 'active': editor.value === selected.value }"
            class="popup-flow-editor" @click="selected = editor">
            <div class="popup-flow-editor__img-wrapper">
              <img :alt="editor.alt" :src="editor.image">
            </div>
            <p class="popup-flow-editor__title typo-subtitle-2">
              {{ editor.title }}
              <wt-hint>{{ editor.description }}</wt-hint>
            </p>
          </button>
        </section>
        <wt-select v-model="type" :clearable="false" :label="$t('vocabulary.type')" :options="typeOptions"
          track-by="value" />
      </div>
    </template>
  </selection-popup>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import CodeSectionDark from '../assets/code-section-dark.svg';
import CodeSectionLight from '../assets/code-section-light.svg';
import DiagramSectionDark from '../assets/diagram-section-dark.svg';
import DiagramSectionLight from '../assets/diagram-section-light.svg';
import FlowEditor from '../enums/FlowEditor.enum';

export default {
	name: 'CreateFlowPopup',
	components: {
		SelectionPopup,
	},

	data: () => ({
		namespace: 'routing/flow',
		selected: {},
		type: {},
		typeOptions: Object.values(EngineRoutingSchemaType)
			.filter((type) => type !== EngineRoutingSchemaType.Default)
			.map((value) => ({
				value,
				locale: `objects.flow.type.${value}`,
			})),
	}),

	computed: {
		...mapState('appearance', {
			theme: (state) => state.theme,
		}),
		editorOptions() {
			const diagram = {
				value: FlowEditor.DIAGRAM,
				title: this.$t('objects.routing.flow.diagram.diagram'),
				description: this.$t('objects.routing.flow.diagram.description'),
				image: this.theme === 'dark' ? DiagramSectionDark : DiagramSectionLight,
				alt: this.$t('objects.routing.flow.diagram.diagram'),
			};
			const code = {
				value: FlowEditor.CODE,
				title: this.$t('objects.routing.flow.code.code'),
				description: this.$t('objects.routing.flow.code.description'),
				image: this.theme === 'dark' ? CodeSectionDark : CodeSectionLight,
				alt: this.$t('objects.routing.flow.code.code'),
			};
			return [
				diagram,
				code,
			];
		},
	},

	methods: {
		...mapActions({
			setItemProp(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_ITEM_PROPERTY`, payload);
			},
		}),

		create() {
			if (this.selected.value === 'diagram') {
				this.setItemProp({
					prop: 'editor',
					value: true,
				});
			} else {
				this.setItemProp({
					prop: 'editor',
					value: false,
				});
			}
			const route = this.$router.resolve({
				name: `${RouteNames.FLOW}-card`,
				params: {
					id: 'new',
				},
				query: {
					editor: this.selected.value,
					type: this.type.value,
				},
			});
			window.open(route.href, '_blank');
			this.close();
		},

		close() {
			this.$emit('close');
			this.setBasicFields();
		},

		setBasicFields() {
			[this.selected] = this.editorOptions;
			[this.type] = this.typeOptions;
		},
	},

	mounted() {
		this.setBasicFields();
	},
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;
// setup pic width and height to prevent layout shift after pic load
$pic-width: 150px;
$pic-height: 80px;

//Change some selection-popup styles
.selection-popup {
  :deep(.popup-options) {
    display: none;
  }

  :deep(.wt-button) {
    flex: 1;
  }
}

.create-flow-popup__main-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 var(--spacing-xs);
  gap: var(--spacing-sm);
}

//Create new specific styles
.popup-flows {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); // https://stackoverflow.com/a/61240964
  gap: var(--spacing-xs);
}

.popup-flow-editor {
  padding: var(--spacing-xs) 0;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid var(--secondary-color-50);
  border-radius: var(--border-radius);

  &:hover,
  &.active {
    border-color: var(--primary-color);
  }

  .popup-flow-editor__img-wrapper {
    box-sizing: content-box;
    width: $pic-width;
    height: $pic-height;
    margin: 0 auto;
    padding: var(--spacing-md);
  }

  &__title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: calc(var(--icon-md-size) + var(--spacing-xs)); // visually center text
    gap: var(--spacing-xs);
  }

  &__title {
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    color: var(--text-main-color);
    grid-column-start: 2;
  }
}
</style>
