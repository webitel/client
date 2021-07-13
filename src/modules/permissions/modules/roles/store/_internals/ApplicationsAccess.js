import deepmerge from 'deepmerge';
import deepCopy from 'deep-copy';
import Objects from '../../../../../userinfo/store/_internals/enums/Objects.enum';

const applicationsAccess = (value = true) => ({
  agent: {
    _enabled: value,
    _locale: 'applicationHub.agent',
  },
  supervisor: {
    _enabled: value,
    _locale: 'applicationHub.supervisor',
    queues: {
      _enabled: value,
      _locale: 'objects.permissions.roles.applicationsAccess.supervisor.sections.queues',
    },
    agents: {
      _enabled: value,
      _locale: 'objects.permissions.roles.applicationsAccess.supervisor.sections.agents',
  },
    activeCalls: {
      _enabled: value,
      _locale: 'objects.permissions.roles.applicationsAccess.supervisor.sections.activeCalls',
    },
  },
  history: {
    _enabled: value,
    _locale: 'applicationHub.history',
  },
  admin: {
    _enabled: value,
    _locale: 'applicationHub.admin',
    [Objects.LICENSE]: {
      _enabled: value,
      _locale: 'nav.directory.license',
    },
    [Objects.USERS]: {
      _enabled: value,
      _locale: 'nav.directory.users',
    },
    [Objects.DEVICES]: {
      _enabled: value,
      _locale: 'nav.directory.devices',
    },
    [Objects.FLOW]: {
      _enabled: value,
      _locale: 'nav.routing.flow',
    },
    [Objects.DIALPLAN]: {
      _enabled: value,
      _locale: 'nav.routing.dialplan',
    },
    [Objects.GATEWAYS]: {
      _enabled: value,
      _locale: 'nav.routing.gateways',
    },
    [Objects.SKILLS]: {
      _enabled: value,
      _locale: 'nav.lookups.agentSkills',
    },
    [Objects.BUCKETS]: {
      _enabled: value,
      _locale: 'nav.lookups.buckets',
    },
    [Objects.BLACKLIST]: {
      _enabled: value,
      _locale: 'nav.lookups.blacklists',
    },
    [Objects.REGIONS]: {
      _enabled: value,
      _locale: 'nav.lookups.regions',
    },
    [Objects.CALENDARS]: {
      _enabled: value,
      _locale: 'nav.lookups.calendars',
    },
    [Objects.COMMUNICATIONS]: {
      _enabled: value,
      _locale: 'nav.lookups.communications',
    },
    [Objects.PAUSE_CAUSE]: {
      _enabled: value,
      _locale: 'nav.lookups.agentPauseCause',
    },
    [Objects.MEDIA]: {
      _enabled: value,
      _locale: 'nav.lookups.media',
    },
    [Objects.AGENTS]: {
      _enabled: value,
      _locale: 'nav.ccenter.agents',
    },
    [Objects.TEAMS]: {
      _enabled: value,
      _locale: 'nav.ccenter.teams',
    },
    [Objects.RESOURCES]: {
      _enabled: value,
      _locale: 'nav.ccenter.res',
    },
    [Objects.RESOURCE_GROUPS]: {
      _enabled: value,
      _locale: 'nav.ccenter.resGroups',
    },
    [Objects.QUEUES]: {
      _enabled: value,
      _locale: 'nav.ccenter.queues',
    },
    [Objects.STORAGE]: {
      _enabled: value,
      _locale: 'nav.administration.storage',
    },
    [Objects.ROLES]: {
      _enabled: value,
      _locale: 'nav.permissions.roles',
    },
    [Objects.OBJECTS]: {
      _enabled: value,
      _locale: 'nav.permissions.objects',
    },
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
