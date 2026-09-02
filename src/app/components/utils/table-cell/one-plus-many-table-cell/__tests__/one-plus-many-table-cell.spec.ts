import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import Cell from '../one-plus-many-table-cell.vue';

/** `wt-chip` and `adm-item-link` stay unresolved under @vue/compat — stubs do
 * not reach the SFC, so assertions target plain DOM. */

interface Item {
	id?: string;
	name?: string;
}

const cell = (
	collection: Item[],
	options: {
		routeName?: string;
	} = {},
) =>
	mount(Cell, {
		props: {
			collection,
			routeName: options.routeName ?? null,
		},
	});

const value = (wrapper: ReturnType<typeof cell>) =>
	wrapper.find('.one-plus-many-table-cell__value');

const counter = (wrapper: ReturnType<typeof cell>) =>
	wrapper.find('.one-plus-many-table-cell__chip');

const lookup = (name: string, id?: string): Item => ({
	id,
	name,
});

describe('one plus many table cell', () => {
	it('renders the first item as the cell value', () => {
		const wrapper = cell([
			lookup('First team'),
			lookup('Second team'),
		]);

		expect(value(wrapper).text()).toBe('First team');
	});

	it('counts the items it does not show', () => {
		const wrapper = cell([
			lookup('a'),
			lookup('b'),
			lookup('c'),
			lookup('d'),
		]);

		expect(counter(wrapper).text()).toBe('+3');
	});

	/** a single item is the whole cell value; the wrapper used to stay clickable */
	it('draws no counter for a single item', async () => {
		const wrapper = cell([
			lookup('Only team'),
		]);

		expect(counter(wrapper).exists()).toBe(false);
		expect(value(wrapper).text()).toBe('Only team');

		await value(wrapper).trigger('click');

		expect(wrapper.emitted('input')).toBeUndefined();
	});

	it('renders nothing at all for an empty collection', () => {
		expect(cell([]).find('.one-plus-many-table-cell').exists()).toBe(false);
	});

	/** the handler used to sit on `wt-chip`, where a `@click` never reached the DOM */
	it('asks to open the list when the counter is clicked', async () => {
		const wrapper = cell([
			lookup('a'),
			lookup('b'),
		]);

		await counter(wrapper).trigger('click');

		expect(wrapper.emitted('input')).toEqual([
			[],
		]);
	});

	/** `tabindex` and `keydown` used to sit on different elements */
	it('opens the list from the keyboard too', async () => {
		const wrapper = cell([
			lookup('a'),
			lookup('b'),
		]);

		expect(counter(wrapper).attributes('tabindex')).toBe('0');

		await counter(wrapper).trigger('keydown.enter');

		expect(wrapper.emitted('input')).toEqual([
			[],
		]);
	});

	it('links the shown item when it has an id and a route', () => {
		const wrapper = cell(
			[
				lookup('First team', '42'),
				lookup('Second team', '43'),
			],
			{
				routeName: 'teams',
			},
		);

		const link = wrapper.find('adm-item-link');

		expect(link.text()).toBe('First team');
		expect(link.attributes('id')).toBe('42');
		expect(link.attributes('route-name')).toBe('teams');
	});

	/** an item without a route is not a link — the other branch of the same v-if */
	it('renders plain text when no route is given', () => {
		const wrapper = cell([
			lookup('First team', '42'),
		]);

		expect(wrapper.find('adm-item-link').exists()).toBe(false);
		expect(value(wrapper).find('span').text()).toBe('First team');
	});
});
