const baseLocale = 'objects.ccenter.members.csvMappingFields';

const ImportCsvMemberMappings = {
  name: {
    locale: `${baseLocale}.name`,
    required: true,
    csv: '',
  },
  timezoneId: {
    locale: `${baseLocale}.timezoneId`,
    required: false,
    csv: '',
  },
  priority: {
    locale: `${baseLocale}.priority`,
    required: false,
    csv: '',
  },
  expireAt: {
    locale: `${baseLocale}.expireAt`,
    required: false,
    csv: '',
  },
  bucketId: {
    locale: `${baseLocale}.bucketId`,
    required: false,
    csv: '',
  },
  agentId: {
    locale: `${baseLocale}.agentId`,
    required: false,
    csv: '',
  },
  variables: {
    locale: `${baseLocale}.variables`,
    required: false,
    multiple: true,
    csv: [],
  },
  destination: {
    locale: `${baseLocale}.destination`,
    required: true,
    multiple: true,
    csv: [],
  },
  commPriority: {
    locale: `${baseLocale}.commPriority`,
    required: false,
    multiple: true,
    csv: [],
  },
  code: {
    locale: `${baseLocale}.code`,
    required: true,
    multiple: true,
    csv: [],
  },
  description: {
    locale: `${baseLocale}.description`,
    required: false,
    multiple: true,
    csv: [],
  },
  dtmf: {
    locale: `${baseLocale}.dtmf`,
    required: false,
    multiple: true,
    csv: [],
  },
};

export default ImportCsvMemberMappings;
