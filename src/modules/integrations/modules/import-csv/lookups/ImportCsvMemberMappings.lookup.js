const ImportCsvMemberMappings = {
  name: {
    locale: 'reusable.name',
    required: true,
    csv: '',
  },
  timezoneId: {
    locale: 'objects.lookups.calendars.timezone',
    required: false,
    csv: '',
  },
  priority: {
    locale: 'vocabulary.priority',
    required: false,
    csv: '',
  },
  expireAt: {
    locale: 'objects.ccenter.queues.expire',
    required: false,
    csv: '',
  },
  bucketId: {
    locale: ['objects.lookups.buckets.buckets', 1],
    required: false,
    csv: '',
  },
  agentId: {
    locale: ['objects.ccenter.agents.agents', 1],
    required: false,
    csv: '',
  },
  variables: {
    locale: ['vocabulary.variables', 2],
    required: false,
    multiple: true,
    csv: [],
  },
  destination: {
    locale: [
      ['objects.lookups.communications.communications', 1],
      'objects.ccenter.members.destination',
    ],
    required: true,
    multiple: true,
    csv: [],
  },
  commPriority: {
    locale: [['objects.lookups.communications.communications', 1], 'vocabulary.priority'],
    required: false,
    multiple: true,
    csv: [],
  },
  code: {
    locale: [
      ['objects.lookups.communications.communications', 1],
      'objects.lookups.communications.code',
    ],
    required: true,
    multiple: true,
    csv: [],
  },
  description: {
    locale: [['objects.lookups.communications.communications', 1], 'objects.description'],
    required: false,
    multiple: true,
    csv: [],
  },
  dtmf: {
    locale: ['objects.ccenter.members.dtmf', 1],
    required: false,
    multiple: true,
    csv: [],
  },
};

export default ImportCsvMemberMappings;
