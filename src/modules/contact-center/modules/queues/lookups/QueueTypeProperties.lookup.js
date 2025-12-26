import { QueueType } from 'webitel-sdk/esm2015/enums';

const baseLocale = 'objects.ccenter.queues';

const QueueTypeProperties = Object.freeze({
  [QueueType.OFFLINE_QUEUE]: {
    locale: baseLocale.concat('.offlineQueue'),
    subpath: 'offline-queue',
    controls: [
      // general specific
      'strategy',
      'team',
      'doSchema',
      'afterSchema',
      'grantee',
      // params specific
      'originateTimeout',
      'waitBetweenRetries',
      'maxAttempts',
      'recordings',
      'perNumbers',
      'minOnlineAgents',
      'stickyAgent',
      'maxMemberLimit',

      // processing specific
      'taskProcessing.enabled',
      'taskProcessing.formSchema',
      'taskProcessing.sec',
      'taskProcessing.renewalSec',
      'taskProcessing.prolongationOptions.enabled',
      'taskProcessing.prolongationOptions.renewalSec',
      'taskProcessing.prolongationOptions.repeatsNumber',
      'taskProcessing.prolongationOptions.prolongationTimeSec',
      'taskProcessing.prolongationOptions.isTimeoutRetry',
    ],
  },
  [QueueType.INBOUND_QUEUE]: {
    locale: baseLocale.concat('.inboundQueue'),
    subpath: 'inbound-queue',
    controls: [
      // general specific
      'team',
      'ringtone',
      'grantee',

      // params specific
      'maxWaitTime',
      'maxWaitingSize',
      'discardAbandonedAfter',
      'allowGreetingAgent',
      'stickyAgent',
      'stickyAgentSec',
      'stickyIgnoreStatus',
      'ignoreCalendar',
      'autoAnswerTone',
      'minOnlineAgents',
      'manualDistribution',
      'maxMemberLimit',

      // processing specific
      'taskProcessing.enabled',
      'taskProcessing.formSchema',
      'taskProcessing.sec',
      'taskProcessing.renewalSec',
      'taskProcessing.prolongationOptions.enabled',
      'taskProcessing.prolongationOptions.renewalSec',
      'taskProcessing.prolongationOptions.repeatsNumber',
      'taskProcessing.prolongationOptions.prolongationTimeSec',
    ],
  },
  [QueueType.OUTBOUND_IVR_QUEUE]: {
    locale: baseLocale.concat('.outboundIVRQueue'),
    subpath: 'outbound-ivr-queue',
    controls: [
      // general specific
      'strategy',
      'schema',
      'doSchema',
      'afterSchema',
      'grantee',

      // params specific
      'originateTimeout',
      'maxAttempts',
      'waitBetweenRetries',
      'minDuration',
      'maxCalls',
      'waitBetweenRetriesDesc',
      'strictCircuit',
      'recordings',
      'perNumbers',
      'resourceStrategy',
      'maxMemberLimit',
    ],
  },
  [QueueType.PREVIEW_DIALER]: {
    locale: baseLocale.concat('.previewDialer'),
    subpath: 'preview-dialer',
    controls: [
      // general specific
      'strategy',
      'team',
      'doSchema',
      'afterSchema',
      'grantee',

      // params specific
      'originateTimeout',
      'maxAttempts',
      'waitBetweenRetries',
      'maxCalls',
      'maxMemberLimit',
      'waitBetweenRetriesDesc',
      'strictCircuit',
      'recordings',
      'perNumbers',
      'allowGreetingAgent',
      'endless',
      'stickyAgent',
      'minOnlineAgents',
      'resourceStrategy',

      // processing specific
      'taskProcessing.enabled',
      'taskProcessing.formSchema',
      'taskProcessing.sec',
      'taskProcessing.renewalSec',
      'taskProcessing.prolongationOptions.enabled',
      'taskProcessing.prolongationOptions.renewalSec',
      'taskProcessing.prolongationOptions.repeatsNumber',
      'taskProcessing.prolongationOptions.prolongationTimeSec',
      'taskProcessing.prolongationOptions.isTimeoutRetry',
    ],
  },
  [QueueType.PROGRESSIVE_DIALER]: {
    locale: baseLocale.concat('.progressiveDialer'),
    subpath: 'progressive-dialer',
    controls: [
      // general specific
      'strategy',
      'team',
      'doSchema',
      'afterSchema',
      'ringtone',
      'grantee',

      // params specific
      'originateTimeout',
      'maxAttempts',
      'waitBetweenRetries',
      'maxCalls',
      'waitBetweenRetriesDesc',
      'strictCircuit',
      'recordings',
      'perNumbers',
      'allowGreetingAgent',
      'endless',
      'stickyAgent',
      'autoAnswerTone',
      'minOnlineAgents',
      'resourceStrategy',
      'maxMemberLimit',

      // processing specific
      'taskProcessing.enabled',
      'taskProcessing.formSchema',
      'taskProcessing.sec',
      'taskProcessing.renewalSec',
      'taskProcessing.prolongationOptions.enabled',
      'taskProcessing.prolongationOptions.renewalSec',
      'taskProcessing.prolongationOptions.repeatsNumber',
      'taskProcessing.prolongationOptions.prolongationTimeSec',
      'taskProcessing.prolongationOptions.isTimeoutRetry',
    ],
  },
  [QueueType.PREDICTIVE_DIALER]: {
    locale: baseLocale.concat('.predictiveDialer'),
    subpath: 'predictive-dialer',
    controls: [
      // general specific
      'strategy',
      'team',
      'ringtone',
      'doSchema',
      'afterSchema',
      'grantee',

      // params specific
      'originateTimeout',
      'maxWaitTime',
      'waitBetweenRetries',
      'statisticTime',
      'maxAttempts',
      'minAttempts',
      'maxAgentLose',
      'maxAgentLine',
      'maxAbandonedRate',
      'targetAbandonedRate',
      'loadFactor',
      'abandonRateAdjustment',
      'playbackSilence',
      'maxCalls',
      'dialingRate',
      'waitBetweenRetriesDesc',
      'strictCircuit',
      'retryAbandoned',
      'recordings',
      'perNumbers',
      'allowGreetingAgent',
      'endless',
      'stickyAgent',
      'stickyAgentSec',
      'autoAnswerTone',
      'minOnlineAgents',
      'resourceStrategy',
      'maxMemberLimit',

      // processing specific
      'taskProcessing.enabled',
      'taskProcessing.formSchema',
      'taskProcessing.sec',
      'taskProcessing.renewalSec',
      'taskProcessing.prolongationOptions.enabled',
      'taskProcessing.prolongationOptions.renewalSec',
      'taskProcessing.prolongationOptions.repeatsNumber',
      'taskProcessing.prolongationOptions.prolongationTimeSec',
      'taskProcessing.prolongationOptions.isTimeoutRetry',
    ],
  },
  [QueueType.CHAT_INBOUND_QUEUE]: {
    locale: baseLocale.concat('.chatInboundQueue'),
    subpath: 'chat-inbound-queue',
    controls: [
      // general specific
      'strategy',
      'team',
      // params specific
      'maxWaitTime',
      'maxWaitingSize',
      'discardAbandonedAfter',
      'maxIdleAgent',
      'maxIdleClient',
      'maxIdleDialog',
      'stickyAgent',
      'stickyAgentSec',
      'stickyIgnoreStatus',
      'ignoreCalendar',
      'minOnlineAgents',
      'manualDistribution',
      'lastMessageTimeout',
      'maxMemberLimit',

      // processing specific
      'taskProcessing.enabled',
      'taskProcessing.formSchema',
      'taskProcessing.sec',
      'taskProcessing.renewalSec',
      'taskProcessing.prolongationOptions.enabled',
      'taskProcessing.prolongationOptions.renewalSec',
      'taskProcessing.prolongationOptions.repeatsNumber',
      'taskProcessing.prolongationOptions.prolongationTimeSec',
    ],
  },
  [QueueType.INBOUND_JOB_QUEUE]: {
    locale: baseLocale.concat('.inboundJobQueue'),
    subpath: 'inbound-job-queue',
    controls: [
      // general specific
      'strategy',
      'team',
      'doSchema',
      'afterSchema',
      // params specific
      'maxAttempts',
      'maxCalls',
      'waitBetweenRetries',
      'waitBetweenRetriesDesc',
      'stickyAgent',
      'minOnlineAgents',
      'maxMemberLimit',

      // processing specific
      'taskProcessing.enabled',
      'taskProcessing.formSchema',
      'taskProcessing.sec',
      'taskProcessing.renewalSec',
      'taskProcessing.prolongationOptions.enabled',
      'taskProcessing.prolongationOptions.renewalSec',
      'taskProcessing.prolongationOptions.repeatsNumber',
      'taskProcessing.prolongationOptions.prolongationTimeSec',
      'taskProcessing.prolongationOptions.isTimeoutRetry',
    ],
  },
  [QueueType.OUTBOUND_JOB_QUEUE]: {
    locale: baseLocale.concat('.outboundJobQueue'),
    subpath: 'outbound-job-queue',
    controls: [
      // general specific
      'strategy',
      'schema',
      'doSchema',
      'afterSchema',
      // params specific
      'originateTimeout',
      'maxAttempts',
      'waitBetweenRetries',
      'maxCalls',
      'waitBetweenRetriesDesc',
      'strictCircuit',
      'perNumbers',
      'maxMemberLimit',
    ],
  },
});

export default QueueTypeProperties;
