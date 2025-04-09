import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import CalendarRouteNames from "./_internals/CalendarRouteNames.enum.js";

const Calendars = () => import('../components/the-calendars.vue');
const OpenedCalendar = () => import('../components/opened-calendar.vue');

const OpenedCalendarGeneral = () => import('../components/opened-calendar-general.vue');
const OpenedCalendarHolidays = () => import('../components/opened-calendar-holidays.vue');
const OpenedCalendarWorkingWeek = () => import('../components/opened-calendar-work-week.vue');
const OpenedCalendarSpecialTime = () => import('../components/opened-calendar-special-time.vue');
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
        path: 'special-time',
        name: CalendarRouteNames.SPECIAL_TIME,
        component: OpenedCalendarSpecialTime,
      },{
        path: 'permissions/:permissionId?',
        name: CalendarRouteNames.PERMISSIONS,
        component: PermissionsTab,
      }
    ],
  },
];
export default CalendarsRoutes;
