import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

import SettingsGeneralDebugRecorder from '../settings-general-debug-recorder.vue';

const recorder = {
	available: ref(true),
	recording: ref(false),
	enabledUntil: ref<number | null>(null),
	records: ref<number | null>(null),
	busy: ref(false),
	setRecording: vi.fn(async () => {}),
	download: vi.fn(async () => {}),
};

vi.mock('@webitel/ui-sdk/modules/DebugRecorder/composables', () => ({
	useDebugRecorder: () => recorder,
}));

const mountSection = () =>
	mount(SettingsGeneralDebugRecorder, {
		global: {
			stubs: {
				WtHint: {
					template: '<span class="hint-stub"><slot /></span>',
				},
				WtButton: {
					template: '<button class="download-stub"><slot /></button>',
				},
				WtSwitcher: {
					props: [
						'modelValue',
					],
					emits: [
						'update:modelValue',
					],
					template:
						'<input type="checkbox" class="switcher-stub" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" />',
				},
			},
		},
	});

describe('SettingsGeneralDebugRecorder', () => {
	beforeEach(() => {
		recorder.available.value = true;
		recorder.recording.value = false;
		recorder.enabledUntil.value = null;
		recorder.records.value = null;
		recorder.setRecording.mockClear();
	});

	it('renders nothing when the app has no recorder', () => {
		recorder.available.value = false;
		expect(mountSection().text()).toBe('');
	});

	it('off: one label with the details in a hint, no status or download', () => {
		const wrapper = mountSection();
		expect(wrapper.text()).toContain('Record debug logs');
		expect(wrapper.find('.hint-stub').text()).toContain('24 hours');
		expect(wrapper.find('.download-stub').exists()).toBe(false);
	});

	it('on: shows until when and how many events, with download', () => {
		recorder.enabledUntil.value = Date.now() + 60_000;
		recorder.records.value = 42;
		const wrapper = mountSection();
		expect(wrapper.text()).toContain('42 events');
		expect(wrapper.find('.download-stub').text()).toBe('Download archive');
	});

	it('the switch turns recording on and off', async () => {
		const wrapper = mountSection();
		const switcher = wrapper.find('.switcher-stub');
		(switcher.element as HTMLInputElement).checked = true;
		await switcher.trigger('change');
		expect(recorder.setRecording).toHaveBeenCalledWith(true);
	});
});
