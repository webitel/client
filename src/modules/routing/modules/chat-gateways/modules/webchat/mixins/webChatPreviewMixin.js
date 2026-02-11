export default {
	data: () => ({
		chatPreview: null,
		buttonPreview: null,
	}),
	watch: {
		'itemInstance.metadata': {
			handler() {
				this.updateChatPreview();
				this.updateButtonPreview();
			},
			deep: true,
		},
	},
	methods: {
		getPreviewConfig(previewMode) {
			return {
				view: {
					...this.itemInstance.metadata.view,
					position: 'static',
					_previewMode: previewMode,
				},
				chat: {}, // show chat btn
			};
		},
		initWidgetPreview() {
			const baseUrl = import.meta.env.VITE_OMNI_WIDGET_URL;

			let script = document.createElement('script');
			script.src = `${baseUrl}/WtOmniWidget.umd.js`;
			script.onload = () => {
				this.chatPreview = new WtOmniWidget(
					'#chat-preview',
					this.getPreviewConfig('chat'),
				);
			};
			document.head.appendChild(script);

			script = document.createElement('script');
			script.src = `${baseUrl}/WtOmniWidget.umd.js`;
			script.onload = () => {
				this.buttonPreview = new WtOmniWidget(
					'#chat-button-preview',
					this.getPreviewConfig('button'),
				);
			};
			document.head.appendChild(script);

			const link = document.createElement('link');
			link.href = `${baseUrl}/WtOmniWidget.css`;
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.media = 'screen,print';
			document.head.appendChild(link);
		},
		updateChatPreview() {
			this.chatPreview.setConfig(this.getPreviewConfig('chat'));
		},
		updateButtonPreview() {
			this.buttonPreview.setConfig(this.getPreviewConfig('button'));
		},
	},
	created() {
		this.initWidgetPreview();
	},
};
