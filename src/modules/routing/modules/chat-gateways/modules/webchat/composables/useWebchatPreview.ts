import { onMounted, type Ref, watch } from 'vue';

import type { WebchatMetadata } from '../types/WebchatMetadata';

type PreviewMode = 'chat' | 'button';

interface WtOmniWidgetInstance {
	setConfig: (config: object) => void;
}

type WtOmniWidgetConstructor = new (
	selector: string,
	config: object,
) => WtOmniWidgetInstance;

declare global {
	interface Window {
		WtOmniWidget?: WtOmniWidgetConstructor;
	}
}

/**
 * [Claude] The live widget previews of the "view" tab: the omni widget bundle is
 * loaded from the app's widget url and re-rendered on every metadata change.
 */
export const useWebchatPreview = (
	metadata: Ref<WebchatMetadata>,
	{
		chatSelector,
		buttonSelector,
	}: {
		chatSelector: string;
		buttonSelector: string;
	},
) => {
	let chatPreview: WtOmniWidgetInstance | null = null;
	let buttonPreview: WtOmniWidgetInstance | null = null;

	const getPreviewConfig = (previewMode: PreviewMode) => ({
		view: {
			...metadata.value.view,
			position: 'static',
			_previewMode: previewMode,
		},
		chat: {}, // show chat btn
	});

	const loadWidgetScript = (
		onLoad: (Widget: WtOmniWidgetConstructor) => void,
	) => {
		const script = document.createElement('script');
		script.src = `${import.meta.env.VITE_OMNI_WIDGET_URL}/WtOmniWidget.umd.js`;
		script.onload = () => {
			if (window.WtOmniWidget) onLoad(window.WtOmniWidget);
		};
		document.head.appendChild(script);
	};

	const initWidgetPreview = () => {
		loadWidgetScript((Widget) => {
			chatPreview = new Widget(chatSelector, getPreviewConfig('chat'));
		});
		loadWidgetScript((Widget) => {
			buttonPreview = new Widget(buttonSelector, getPreviewConfig('button'));
		});

		const link = document.createElement('link');
		link.href = `${import.meta.env.VITE_OMNI_WIDGET_URL}/WtOmniWidget.css`;
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.media = 'screen,print';
		document.head.appendChild(link);
	};

	watch(
		metadata,
		() => {
			chatPreview?.setConfig(getPreviewConfig('chat'));
			buttonPreview?.setConfig(getPreviewConfig('button'));
		},
		{
			deep: true,
		},
	);

	onMounted(initWidgetPreview);
};
