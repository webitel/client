import deepmerge from 'deepmerge';
import {
    AdminSections as AdminSectionsNew,
    AuditorSections as AuditorSectionsNew,
    CrmSections as CrmSectionsNew,
    SupervisorSections as SupervisorSectionsNew,
} from '@webitel/ui-sdk/enums';
import AdminSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AdminSections.enum';
import AuditorSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AuditorSections.enum';
import CrmSections from '@webitel/ui-sdk/src/enums/WebitelApplications/CrmSections.enum';
import SupervisorSections from '@webitel/ui-sdk/src/enums/WebitelApplications/SupervisorSections.enum';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';

const applicationsLocales = {
    [WebitelApplications.AGENT]: {
        _locale: `WebitelApplications.${WebitelApplications.AGENT}.name`,
    },
    [WebitelApplications.HISTORY]: {
        _locale: `WebitelApplications.${WebitelApplications.HISTORY}.name`,
    },
    [WebitelApplications.ANALYTICS]: {
        _locale: `WebitelApplications.${WebitelApplications.ANALYTICS}.name`,
    },
    [WebitelApplications.SUPERVISOR]: {
        _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.name`,
        [SupervisorSections.QUEUES]: {
            _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSectionsNew.Queues}`,
        },
        [SupervisorSections.AGENTS]: {
            _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSectionsNew.Agents}`,
        },
        [SupervisorSections.ACTIVE_CALLS]: {
            _locale: `WebitelApplications.${WebitelApplications.SUPERVISOR}.sections.${SupervisorSectionsNew.ActiveCalls}`,
        },
    },
    [WebitelApplications.ADMIN]: {
        _locale: `WebitelApplications.${WebitelApplications.ADMIN}.name`,
        [AdminSections.LICENSE]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.License}`,
        },
        [AdminSections.USERS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Users}`,
        },
        [AdminSections.DEVICES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Devices}`,
        },
        [AdminSections.FLOW]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Flow}`,
        },
        [AdminSections.DIALPLAN]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Dialplan}`,
        },
        [AdminSections.GATEWAYS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Gateways}`,
        },
        [AdminSections.CHATPLAN]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Chatplan}`,
        },
        [AdminSections.CHAT_GATEWAYS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.ChatGateways}`,
        },
        [AdminSections.SKILLS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Skills}`,
        },
        [AdminSections.BUCKETS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Buckets}`,
        },
        [AdminSections.BLACKLIST]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Blacklist}`,
        },
        [AdminSections.REGIONS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Regions}`,
        },
        [AdminSections.CALENDARS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Calendars}`,
        },
        [AdminSections.COMMUNICATIONS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Communications}`,
        },
        [AdminSections.PAUSE_CAUSE]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.PauseCause}`,
        },
        [AdminSections.MEDIA]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Media}`,
        },
        [AdminSections.SHIFT_TEMPLATES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.ShiftTemplates}`,
        },
        [AdminSections.PAUSE_TEMPLATES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.PauseTemplates}`,
        },
        [AdminSections.WORKING_CONDITIONS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.WorkingConditions}`,
        },
        [AdminSections.QUICK_REPLIES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.QuickReplies}`,
        },
        [AdminSections.AGENTS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Agents}`,
        },
        [AdminSections.TEAMS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Teams}`,
        },
        [AdminSections.RESOURCES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Resources}`,
        },
        [AdminSections.RESOURCE_GROUPS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.ResourceGroups}`,
        },
        [AdminSections.QUEUES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Queues}`,
        },
        [AdminSections.STORAGE]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Storage}`,
        },
        [AdminSections.STORAGE_POLICIES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.StoragePolicies}`,
        },
        [AdminSections.COGNITIVE_PROFILES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.CognitiveProfiles}`,
        },
        [AdminSections.EMAIL_PROFILES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.EmailProfiles}`,
        },
        [AdminSections.SINGLE_SIGN_ON]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.SingleSignOn}`,
        },
        [AdminSections.IMPORT_CSV]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.ImportCsv}`,
        },
        [AdminSections.TRIGGERS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Triggers}`,
        },
        [AdminSections.ROLES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Roles}`,
        },
        [AdminSections.OBJECTS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Objects}`,
        },
        [AdminSections.CHANGELOGS]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Changelogs}`,
        },
        [AdminSections.CONFIGURATION]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.Configuration}`,
        },
        [AdminSections.GLOBAL_VARIABLES]: {
            _locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSectionsNew.GlobalVariables}`,
        },
    },
    [WebitelApplications.AUDIT]: {
        _locale: `WebitelApplications.${WebitelApplications.AUDIT}.name`,
        [AuditorSections.SCORECARDS]: {
            _locale: `WebitelApplications.${WebitelApplications.AUDIT}.sections.${AuditorSectionsNew.Scorecards}`,
        },
    },
    [WebitelApplications.CRM]: {
        _locale: `WebitelApplications.${WebitelApplications.CRM}.name`,
        [CrmSections.CONTACTS]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Contacts}`,
        },
        [CrmSections.CASES]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Cases}`,
        },
        [CrmSections.SLAS]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Slas}`,
        },
        [CrmSections.SOURCES]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Sources}`,
        },
        [CrmSections.SERVICE_CATALOGS]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.ServiceCatalogs}`,
        },
        [CrmSections.CLOSE_REASON_GROUPS]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.CloseReasonGroups}`,
        },
        [CrmSections.CONTACT_GROUPS]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.ContactGroups}`,
        },
        [CrmSections.PRIORITIES]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Priorities}`,
        },
        [CrmSections.STATUSES]: {
            _locale: `WebitelApplications.${WebitelApplications.CRM}.sections.${CrmSectionsNew.Statuses}`,
        },
        [CrmSectionsNew.CasesExtensions]: {
            _locale: `WebitelApplications.overrideApplicationsAccess.${WebitelApplications.CRM}.sections.${CrmSectionsNew.CasesExtensions}`,
        },
        [CrmSectionsNew.ContactsExtensions]: {
            _locale: `WebitelApplications.overrideApplicationsAccess.${WebitelApplications.CRM}.sections.${CrmSectionsNew.ContactsExtensions}`,
        },
        [CrmSectionsNew.CustomLookups]: {
            _locale: `WebitelApplications.overrideApplicationsAccess.${WebitelApplications.CRM}.sections.${CrmSectionsNew.CustomLookups}`,
        },
    },
};

/**
 * Merges locales with access object using deepmerge
 * @param access - The access object to merge locales with
 * @param locales - The locales object (defaults to applicationsLocales)
 * @returns The merged object with locales
 */
const mergeLocalesWithAccess = (access: any, locales: any = applicationsLocales): any => {
    return deepmerge(locales, access);
};

/**
 * Fills access object with locale information
 * @param access - The access object to fill with locales
 * @returns The access object with locales merged
 */
export const fillAccessLocale = (access: any) => {
    return mergeLocalesWithAccess(access);
};