import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import CalendarRouteNames from "./_internals/CalendarRouteNames.enum.js";

const Calendars = () => import('../components/the-calendars.vue');
const OpenedCalendar = () => import('../components/opened-calendar.vue');

const OpenedCalendarGeneral = () => import('../components/opened-calendar-general.vue');
const OpenedCalendarHolidays = () => import('../components/opened-calendar-holidays.vue');
const OpenedCalendarWorkingWeek = () => import('../components/opened-calendar-work-week.vue');
const PermissionsTab = () => import("../../../../_shared/permissions-tab/components/permissions-tab.vue");

const CalendarsRoutes = [
  {
    path: '/lookups/calendars',
    name: RouteNames.CALENDARS,
    component: Calendars,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/calendars/:id',
    name: `${RouteNames.CALENDARS}-card`,
    redirect: {name: CalendarRouteNames.GENERAL},
    component: OpenedCalendar,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: CalendarRouteNames.GENERAL,
        component: OpenedCalendarGeneral,
      },{
        path: 'working-week',
        name: CalendarRouteNames.WORKING_WEEK,
        component: OpenedCalendarWorkingWeek,
      },{
        path: 'holidays/:holidayIndex?',
        name: CalendarRouteNames.HOLIDAYS,
        component: OpenedCalendarHolidays,
      },{
        path: 'permissions/:permissionId?',
        name: CalendarRouteNames.PERMISSIONS,
        component: PermissionsTab,
      }
    ],
  },
];
export default CalendarsRoutes;
