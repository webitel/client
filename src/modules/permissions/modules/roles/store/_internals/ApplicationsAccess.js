import deepmerge from 'deepmerge';
import deepCopy from 'deep-copy';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import SupervisorSections from '@webitel/ui-sdk/src/enums/WebitelApplications/SupervisorSections.enum';
import AdminSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AdminSections.enum';

const applicationsAccess = (value = true) => ({
  [WebitelApplications.AGENT]: {
    _enabled: value,
    _locale: 'applicationHub.agent',
  },
  [WebitelApplications.SUPERVISOR]: {
    _enabled: value,
    _locale: 'applicationHub.supervisor',
    [SupervisorSections.QUEUES]: {
      _enabled: value,
      _locale: 'objects.permissions.roles.applicationsAccess.supervisor.sections.queues',
    },
    [SupervisorSections.AGENTS]: {
      _enabled: value,
      _locale: 'objects.permissions.roles.applicationsAccess.supervisor.sections.agents',
  },
    [SupervisorSections.ACTIVE_CALLS]: {
      _enabled: value,
      _locale: 'objects.permissions.roles.applicationsAccess.supervisor.sections.activeCalls',
    },
  },
  [WebitelApplications.HISTORY]: {
    _enabled: value,
    _locale: 'applicationHub.history',
  },
  [WebitelApplications.ADMIN]: {
    _enabled: value,
    _locale: 'applicationHub.admin',
    [AdminSections.LICENSE]: {
      _enabled: value,
      _locale: 'nav.directory.license',
    },
    [AdminSections.USERS]: {
      _enabled: value,
      _locale: 'nav.directory.users',
    },
    [AdminSections.DEVICES]: {
      _enabled: value,
      _locale: 'nav.directory.devices',
    },
    [AdminSections.FLOW]: {
      _enabled: value,
      _locale: 'nav.routing.flow',
    },
    [AdminSections.DIALPLAN]: {
      _enabled: value,
      _locale: 'nav.routing.dialplan',
    },
    [AdminSections.GATEWAYS]: {
      _enabled: value,
      _locale: 'nav.routing.gateways',
    },
    [AdminSections.SKILLS]: {
      _enabled: value,
      _locale: 'nav.lookups.agentSkills',
    },
    [AdminSections.BUCKETS]: {
      _enabled: value,
      _locale: 'nav.lookups.buckets',
    },
    [AdminSections.BLACKLIST]: {
      _enabled: value,
      _locale: 'nav.lookups.blacklists',
    },
    [AdminSections.REGIONS]: {
      _enabled: value,
      _locale: 'nav.lookups.regions',
    },
    [AdminSections.CALENDARS]: {
      _enabled: value,
      _locale: 'nav.lookups.calendars',
    },
    [AdminSections.COMMUNICATIONS]: {
      _enabled: value,
      _locale: 'nav.lookups.communications',
    },
    [AdminSections.PAUSE_CAUSE]: {
      _enabled: value,
      _locale: 'nav.lookups.agentPauseCause',
    },
    [AdminSections.MEDIA]: {
      _enabled: value,
      _locale: 'nav.lookups.media',
    },
    [AdminSections.AGENTS]: {
      _enabled: value,
      _locale: 'nav.ccenter.agents',
    },
    [AdminSections.TEAMS]: {
      _enabled: value,
      _locale: 'nav.ccenter.teams',
    },
    [AdminSections.RESOURCES]: {
      _enabled: value,
      _locale: 'nav.ccenter.res',
    },
    [AdminSections.RESOURCE_GROUPS]: {
      _enabled: value,
      _locale: 'nav.ccenter.resGroups',
    },
    [AdminSections.QUEUES]: {
      _enabled: value,
      _locale: 'nav.ccenter.queues',
    },
    [AdminSections.STORAGE]: {
      _enabled: value,
      _locale: 'nav.administration.storage',
    },
    [AdminSections.ROLES]: {
      _enabled: value,
      _locale: 'nav.permissions.roles',
    },
    [AdminSections.OBJECTS]: {
      _enabled: value,
      _locale: 'nav.permissions.objects',
    },
  },
  [WebitelApplications.ANALYTICS]: {
    _enabled: value,
    _locale: 'applicationHub.grafana',
  },
});

/**
 */
export default class ApplicationsAccess {
  // value param could be passed to set same value for all options
  constructor({ access, value } = { value: true }) {
    /* if access, deeply merge with falsy values schema
     if no access, "not configured => full permissions" */
    this.access = access ? ApplicationsAccess.restore(access) : applicationsAccess(value);
  }

  getAccess() {
    return this.access;
  }

  // minify schema for API sending
  static minify(access) {
    const rmEmptyKeys = (obj) => {
      Object.keys(obj).forEach((key) => {
        // eslint-disable-next-line no-param-reassign
        if (!obj[key] || key === '_locale') delete obj[key];
        if (typeof obj[key] === 'object') {
          rmEmptyKeys(obj[key]);
          // eslint-disable-next-line no-param-reassign
          if (!Object.keys(obj[key]).length) delete obj[key];
        }
      });
      return obj;
    };
    return rmEmptyKeys(deepCopy(access));
  }

  // restore minified schema from API response
  static restore(access) {
    return deepmerge(applicationsAccess(false), access);
    // return deepmerge(access, applicationsAccess(false));
  }
}
