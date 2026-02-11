import path from 'path';

import CopyInput from '../../../../../app/components/utils/copy-input.vue';

export default {
	components: {
		CopyInput,
	},
	methods: {
		modifyUriCopy(value) {
			const base = window.location.origin;
			return new URL(
				path.join(import.meta.env.VITE_CHAT_URL, value),
				base,
			).toString();
		},
	},
};
