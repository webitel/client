import { shallowMount } from "@vue/test-utils";
import { reactive } from "vue";
import tableComponentComputedMock from "../../../../../../../tests/unit/mocks/tableComponentComputed.mock";
import { useDummy } from "../../../../../../app/composables/useDummy";
import TheMedia from "../the-media.vue";

vi.mock("../../../../../../app/composables/useDummy");
useDummy.mockImplementation(() => ({ store: reactive({}) }));

describe("TheMedia", () => {
	it("renders a component", () => {
		const wrapper = shallowMount(TheMedia, {
			computed: tableComponentComputedMock(),
		});
		expect(wrapper.exists()).toBe(true);
	});
});
