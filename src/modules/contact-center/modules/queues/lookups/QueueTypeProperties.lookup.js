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
                                                // params specific
                                                'originateTimeout',
                                                'recordings',
                                                'perNumbers',

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.processingRenewalSec',
                                              ],
                                            },
                                            [QueueType.INBOUND_QUEUE]: {
                                              locale: baseLocale.concat('.inboundQueue'),
                                              subpath: 'inbound-queue',
                                              controls: [
                                                // general specific
                                                'team',
                                                'ringtone',
                                                // params specific
                                                'maxWaitTime',
                                                'discardAbandonedAfter',
                                                'allowGreetingAgent',
                                                'stickyAgent',
                                                'stickyAgentSec',

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.processingRenewalSec',
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

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.processingRenewalSec',
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

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.processingRenewalSec',
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
                                                'endless',
                                                'stickyAgent',

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.processingRenewalSec',
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
                                                'discardAbandonedAfter',
                                                'maxIdleAgent',
                                                'maxIdleClient',
                                                'stickyAgent',
                                                'stickyAgentSec',

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.processingRenewalSec',
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
                                                // params specific
                                                'maxAttempts',
                                                'maxCalls',
                                                'waitBetweenRetries',
                                                'waitBetweenRetriesDesc',
                                                'stickyAgent',

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.processingRenewalSec',
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
