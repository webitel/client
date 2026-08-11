import { CalendarsAPI } from '@webitel/api-services/api';
import type { EngineCalendar } from '@webitel/api-services/gen/models';
import { calendarSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { CalendarsNamespace } from '../namespace';

export type CalendarAcceptOfDayUi = {
	day: number;
	disabled: boolean;
	start: number;
	end: number;
};

export type CalendarExceptUi = {
	name?: string;
	date?: number | string;
	repeat?: boolean;
	working?: boolean;
	workStart?: number | null;
	workStop?: number | null;
};

/** Card draft: UI uses start/end minutes + expires (not wire EngineCalendar). */
export type CalendarCard = Omit<
	EngineCalendar,
	'accepts' | 'specials' | 'excepts'
> & {
	expires?: boolean;
	accepts?: CalendarAcceptOfDayUi[];
	specials?: CalendarAcceptOfDayUi[];
	excepts?: CalendarExceptUi[];
};

export const useCalendarsCardStore = createCardStore<CalendarCard>({
	namespace: `${CalendarsNamespace}/card`,
	apiModule: CalendarsAPI,
	standardValidationSchema,
});
