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
                                                'formSchema',
                                                // params specific
                                                'originateTimeout',
                                                'recordings',
                                                'perNumbers',
                                                'processing',
                                                'processingSec',
                                                'processingRenewalSec',
                                              ],
                                            },
                                            [QueueType.INBOUND_QUEUE]: {
                                              locale: baseLocale.concat('.inboundQueue'),
                                              subpath: 'inbound-queue',
                                              controls: [
                                                // general specific
                                                'team',
                                                'ringtone',
                                                'formSchema',
                                                // params specific
                                                'maxWaitTime',
                                                'discardAbandonedAfter',
                                                'allowGreetingAgent',
                                                'processing',
                                                'processingSec',
                                                'processingRenewalSec',
                                                'stickyAgent',
                                                'stickyAgentSec',
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
                                                'formSchema',
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
                                                'processing',
                                                'processingSec',
                                                'processingRenewalSec',
                                                'endless',
                                                'stickyAgent',
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
                                                'formSchema',
                                                'ringtone',
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
                                                'processing',
                                                'processingSec',
                                                'processingRenewalSec',
                                                'endless',
                                                'stickyAgent',
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
                                                'formSchema',
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
                                                'abandonRateAdjustment',
                                                'playbackSilence',
                                                'maxCalls',
                                                'waitBetweenRetriesDesc',
                                                'strictCircuit',
                                                'retryAbandoned',
                                                'recordings',
                                                'perNumbers',
                                                'allowGreetingAgent',
                                                'processing',
                                                'processingSec',
                                                'processingRenewalSec',
                                                'endless',
                                                'stickyAgent',
                                              ],
                                            },
                                            [QueueType.CHAT_INBOUND_QUEUE]: {
                                              locale: baseLocale.concat('.chatInboundQueue'),
                                              subpath: 'chat-inbound-queue',
                                              controls: [
                                                // general specific
                                                'strategy',
                                                'team',
                                                'formSchema',
                                                // params specific
                                                'maxWaitTime',
                                                'discardAbandonedAfter',
                                                'maxIdleAgent',
                                                'maxIdleClient',
                                                'processing',
                                                'processingSec',
                                                'processingRenewalSec',
                                                'stickyAgent',
                                                'stickyAgentSec',
                                              ],
                                            },
                                            [QueueType.INBOUND_TASK_QUEUE]: {
                                              locale: baseLocale.concat('.inboundTaskQueue'),
                                              subpath: 'inbound-task-queue',
                                              controls: [
                                                // general specific
                                                'strategy',
                                                'team',
                                                'doSchema',
                                                'afterSchema',
                                                'formSchema',
                                                // params specific
                                                'maxAttempts',
                                                'maxCalls',
                                                'waitBetweenRetries',
                                                'waitBetweenRetriesDesc',
                                                'processing',
                                                'processingSec',
                                                'processingRenewalSec',
                                                'stickyAgent',
                                              ],
                                            },
                                            [QueueType.OUTBOUND_TASK_QUEUE]: {
                                              locale: baseLocale.concat('.outboundTaskQueue'),
                                              subpath: 'outbound-task-queue',
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
                                              ],
                                            },
                                          });

export default QueueTypeProperties;
