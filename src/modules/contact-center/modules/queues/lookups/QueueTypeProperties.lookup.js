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
                                                'recordings',
                                                'perNumbers',

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.renewalSec',
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
                                                'autoAnswerTone',

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.renewalSec',
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
                                                'taskProcessing.renewalSec',
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

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.renewalSec',
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

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.renewalSec',
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

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.renewalSec',
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

                                                // processing specific
                                                'taskProcessing.enabled',
                                                'taskProcessing.formSchema',
                                                'taskProcessing.sec',
                                                'taskProcessing.renewalSec',
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
                                              ],
                                            },
                                          });

export default QueueTypeProperties;
