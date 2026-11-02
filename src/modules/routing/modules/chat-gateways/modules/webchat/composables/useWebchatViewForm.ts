import { computed, type Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { WebchatMetadata } from '../types/WebchatMetadata';

interface ViewOption {
	name: string;
	value: string;
}

/** [Claude] what the color picker emits */
interface PickedColor {
	hsl: {
		h: number;
		s: number;
		l: number;
	};
	a: number;
}

interface PickerColor {
	h: number;
	s: number | string;
	l: number | string;
	a?: number | string;
}

const DEFAULT_COLOR: PickerColor = {
	h: 42,
	s: 1,
	l: 0.5,
	a: 1,
};

/** [Claude] parses the `hsl(h, s%, l%)` the picker writes into the view settings */
const parseHslColor = (value: string): PickerColor => {
	const [h, s, l] = value.replace(/\s+|%|hsl|\(|\)/g, '').split(',');
	return {
		h: +h,
		s: (+s / 100).toFixed(2),
		l: (+l / 100).toFixed(2),
	};
};

/**
 * [Claude] The webchat "view" settings form: the selects map the stored values
 * to their options, and the color picker keeps its own state, as it works in
 * hsl + alpha while the settings keep a css color and an opacity.
 */
export const useWebchatViewForm = (metadata: Ref<WebchatMetadata>) => {
	const { t } = useI18n();

	const view = computed(() => metadata.value.view);

	const languages = computed<ViewOption[]>(() => [
		{
			name: t('reusable.lang.en'),
			value: 'en',
		},
		{
			name: t('reusable.lang.ru'),
			value: 'ru',
		},
		{
			name: t('reusable.lang.uk'),
			value: 'uk',
		},
		{
			name: t('reusable.lang.kz'),
			value: 'kz',
		},
	]);

	const borderRadiusOptions = computed<ViewOption[]>(() => [
		{
			name: t('objects.routing.chatGateways.webchat.view.square'),
			value: 'square',
		},
		{
			name: t('objects.routing.chatGateways.webchat.view.rounded'),
			value: 'rounded',
		},
	]);

	const positionOptions = computed<ViewOption[]>(() => [
		{
			name: t('objects.routing.chatGateways.webchat.view.right'),
			value: 'right',
		},
		{
			name: t('objects.routing.chatGateways.webchat.view.left'),
			value: 'left',
		},
		// Uncomment position static if needed. Not available until documentation is ready.
		// {
		// name: this.$t('objects.routing.chatGateways.metadata.static'),
		// value: 'static',
		// }
	]);

	/** [Claude] a select bound to one view setting, through its options */
	const viewOptionModel = (
		options: Ref<ViewOption[]>,
		prop: 'lang' | 'position' | 'borderRadiusStyle',
	) =>
		computed({
			get: () =>
				options.value.find(({ value }) => value === view.value[prop]) ?? {},
			set: (option: ViewOption) => {
				view.value[prop] = option.value;
			},
		});

	const language = viewOptionModel(languages, 'lang');
	const position = viewOptionModel(positionOptions, 'position');
	const borderRadius = viewOptionModel(
		borderRadiusOptions,
		'borderRadiusStyle',
	);

	const color = ref<PickerColor>(
		view.value.accentColor
			? {
					...parseHslColor(view.value.accentColor),
					a: view.value.btnOpacity || DEFAULT_COLOR.a,
				}
			: {
					...DEFAULT_COLOR,
					a: view.value.btnOpacity || DEFAULT_COLOR.a,
				},
	);

	const setColor = (value: PickedColor) => {
		color.value = value as unknown as PickerColor;
		const h = Math.floor(value.hsl.h);
		const s = +value.hsl.s.toFixed(2) * 100;
		const l = +value.hsl.l.toFixed(2) * 100;
		view.value.accentColor = `hsl(${h}, ${s}%, ${l}%)`;
		view.value.btnOpacity = `${value.a}`;
	};

	return {
		languages,
		borderRadiusOptions,
		positionOptions,
		language,
		position,
		borderRadius,
		color,
		setColor,
	};
};
