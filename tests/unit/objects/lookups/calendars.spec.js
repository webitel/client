import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theCalendars from '@/components/objects/lookups/calendars/the-calendars';
import openedCalendar from '@/components/objects/lookups/calendars/opened-calendar';
import openedCalendarWorkWeek from '@/components/objects/lookups/calendars/opened-calendar-work-week';
import openedCalendarHolidays from '@/components/objects/lookups/calendars/opened-calendar-holidays';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';
import {getCalendarList, getHolidayList, getWorkdayList} from "../../../../src/api/lookups/calendars/calendars";
import {getCommunicationsList} from "../../../../src/api/lookups/communications/communications";

const $t = () => {
};
const $tc = () => {
};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();

describe('opened calendar', () => {
    const wrapper = mount(openedCalendar, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new calendar', async (done) => {
        // set new item data
        wrapper.setData({
            itemInstance: {
                calendar: {
                    name: 'jest-calendar',
                    timezone: {id: '1', name: 'jest'},
                    description: '11calendar',
                    start: Date.now(),
                    end: Date.now(),
                    expires: false,
                },
                workWeek: [{
                    day: 0,
                    enabled: true,
                    start: 9 * 60,
                    end: 20 * 60,
                }],
                holidays: [{
                    name: 'Jest Year',
                    date: new Date('01.01.2020').getTime(),
                    repeat: true
                }],
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const dataList = await getCalendarList(10, 'jest');
            expect(dataList.findIndex(item => item.name.includes('jest'))).not.toBe(-1);
            done();
        }, 500);
    });

    it('creates new temporary calendar', async (done) => {
        // set new item data
        wrapper.setData({
            itemInstance: {
                calendar: {
                    name: 'jest-temp-calendar',
                    timezone: {id: '1', name: 'jest'},
                    description: '11calendar',
                    start: Date.now(),
                    end: Date.now(),
                    expires: true,
                },
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const dataList = await getCalendarList(10, 'jest');
            expect(dataList.findIndex(item => item.name.includes('jest-temp'))).not.toBe(-1);
            done();
        }, 500);
    });

    it('updates calendar general info', async (done) => {
        const dataList = await getCalendarList();

        // to find created item id
        const createdItem = dataList.find(item => {
            return item.name.includes('jest-calendar');
        });

        // emulate route path by setting id
        wrapper.setData({id: createdItem.id});

        // load item by its id
        await wrapper.vm.loadItem();

        // set updated item data
        const newItemInstance = {
            itemInstance: {
                calendar: {
                    name: 'upd-jest-calendar',
                    timezone: {id: '2', name: 'jest'},
                    description: '11calendar',
                    start: Date.now(),
                    end: Date.now(),
                    expires: false,
                },
            },
        };
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newDataList = await getCalendarList(10, '*jest');
            const newItem = newDataList.find(item => {
                return item.name.includes('upd-jest-calendar');
            });
            expect(newItem).toBeTruthy();
            done();
        }, 100);
    });

    it('updates calendar existing workday, and adds a new one', async (done) => {
        const dataList = await getCalendarList();

        // to find created item id
        const createdItem = dataList.find(item => {
            return item.name.includes('upd-jest-calendar');
        });

        // emulate route path by setting id
        wrapper.setData({id: createdItem.id});
        // load item by its id
        await wrapper.vm.loadItem();

        // set updated item data
        let updatedWorkday = wrapper.vm.itemInstance.workWeek.find(workday => {
            return workday.id;
        });

        updatedWorkday.start += 120;
        updatedWorkday.enabled = false;

        wrapper.setData({
            itemInstance: {
                workWeek: [updatedWorkday, {
                    day: 0,
                    enabled: true,
                    start: 1 * 60,
                    end: 2 * 60,
                }],
            }
        });

        console.log('1', wrapper.vm.id);
        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');
        console.log('1', wrapper.vm.id);
        const id = wrapper.vm.id;
        // wait promise response
        await setTimeout(async () => {
            console.log('1', id);
            const newWorkWeek = await getWorkdayList(id);
            const newWorkdayItem = newWorkWeek.find(workday => {
                return workday.day == 0 && workday.start === 1 * 60;
            });
            const updatedWorkdayItem = newWorkWeek.find(workday => {
                return workday.start === 11 * 60 && workday.enabled === false;
            });
            expect(newWorkdayItem).toBeTruthy();
            expect(updatedWorkdayItem).toBeTruthy();
            done();
        }, 300);
    });

    it('updates calendar existing holiday, and adds a new one', async (done) => {
        const dataList = await getCalendarList();
        // to find created item id
        const createdItem = dataList.find(item => {
            return item.name === 'upd-jest-calendar'
        });
        // emulate route path by setting id
        wrapper.setData({id: createdItem.id});
        // load item by its id
        await wrapper.vm.loadItem();

        // set updated item data
        let updatedHoliday = wrapper.vm.itemInstance.holidays.find(holiday => {
            return holiday.id;
        });

        updatedHoliday.name = 'upd jest year';

        wrapper.setData({
            itemInstance: {
                holidays: [updatedHoliday, {
                    name: 'new jest year',
                    date: Date.now() + 10**4,
                    repeat: false,
                }],
            }
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newHolidays = await getHolidayList(wrapper.vm.id);
            const newHolidayItem = newHolidays.find(holiday => {
                return holiday.name === 'new jest year';
            });
            const updatedHolidayItem = newHolidays.find(holiday => {
                return holiday.name === 'upd jest year';
            });

            expect(newHolidays).toHaveLength(2);
            expect(newHolidayItem).toBeTruthy();
            expect(updatedHolidayItem).toBeTruthy();
            done();
        }, 500);
    });
});

describe('opened calendar work week', () => {
    const wrapper = mount(openedCalendarWorkWeek, {
        mocks: {$t, $tc},
        propsData: {
            itemInstanceProp: {
                workWeek: []
            }
        },
        localVue,
        router,
        i18n,
    });

    beforeAll(async () => {
        const dataList = await getCalendarList();
        // find tested item
        const dataItem = dataList.find(item => {
            return item.name === 'upd-jest-calendar'
        });

        wrapper.vm.id = dataItem.id;
        wrapper.vm.itemInstance.workWeek = await getWorkdayList(dataItem.id);
    });



    it('removes workday from list', async (done) => {
        // find all delete icons and choose tested item by index
        wrapper.findAll('.vuetable-action.icon-icon_delete').at(0)
            .trigger('click');

        // wait for async response
        await setTimeout(async () => {
            // remove item and check if it removed from list
            expect(wrapper.vm.itemInstance.workWeek).toHaveLength(1);

            // check if it removed from database
            expect(await getWorkdayList(wrapper.vm.id)).toHaveLength(1);
            done();
        }, 300);
    });
});

describe('opened calendar holidays', () => {
    const wrapper = mount(openedCalendarHolidays, {
        mocks: {$t, $tc},
        propsData: {
            itemInstanceProp: {
                holidays: []
            }
        },
        localVue,
        router,
        i18n,
    });

    beforeAll(async () => {
        const dataList = await getCalendarList();
        // find tested item
        const dataItem = dataList.find(item => {
            return item.name === 'upd-jest-calendar'
        });

        wrapper.vm.id = dataItem.id;
        wrapper.vm.itemInstance.holidays = await getHolidayList(dataItem.id);
    });

    it('fills holidayList with data', () => {
        expect(wrapper.vm.itemInstance.holidays.length).toBeGreaterThan(0);
    });

    it('draws table with holidayList', () => {
        expect(wrapper.findAll('tr'))
            .toHaveLength(wrapper.vm.itemInstance.holidays.length + 1);
    });

    it('removes item from holidayList', async (done) => {
        // find all delete icons and choose tested item by index
        wrapper.findAll('.vuetable-action.icon-icon_delete').at(0)
            .trigger('click');

        // wait for async response
        await setTimeout(async () => {
            // remove item and check if it removed from list
            expect(wrapper.vm.itemInstance.holidays).toHaveLength(1);

            // check if it removed from database
            expect(await getHolidayList(wrapper.vm.id)).toHaveLength(1);
            done();
        }, 300);
    });
});

describe('the calendars', () => {
    const wrapper = mount(theCalendars, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    let createdItem;
    let createdItemIndex;
    // initially load all items
    beforeAll(async () => {
        await wrapper.vm.loadDataList();

        // find tested item
        createdItem = wrapper.vm.dataList.find(item => {
            return item.name === 'upd-jest-calendar' || item.name === 'jest-calendar'
        });

        // and its index
        createdItemIndex = wrapper.vm.dataList.indexOf(createdItem);
    });


    it('fills calendarList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('draws table with calendarList', () => {
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.dataList.length + 1);
    });

    it('removes calendar from list', async (done) => {
        // test if there's initially a item
        expect(createdItem).toBeTruthy();

        // find all delete icons and choose tested item by index
        wrapper.findAll('.vuetable-action.icon-icon_delete').at(createdItemIndex)
            .trigger('click');

        // wait for async response
        await setTimeout(async () => {
            // remove item and check if it removed from list
            expect(wrapper.vm.dataList).not.toContain(createdItem);

            // check if it removed from database
            expect(await getCalendarList()).not.toContain(createdItem);
            done();
        }, 300);
    });
});
