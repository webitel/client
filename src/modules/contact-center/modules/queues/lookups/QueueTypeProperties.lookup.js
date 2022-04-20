import { QueueType } from 'webitel-sdk/esm2015/enums';

const baseLocale = 'objects.ccenter.queues';

const QueueTypeProperties = Object.freeze({
                                            [QueueType.OFFLINE_QUEUE]: {
                                              locale: baseLocale.concat('.offlineQueue'),
                                              subpath: 'offline-queue',
                                            },
                                            [QueueType.INBOUND_QUEUE]: {
                                              locale: baseLocale.concat('.inboundQueue'),
                                              subpath: 'inbound-queue',
                                            },
                                            [QueueType.OUTBOUND_IVR_QUEUE]: {
                                              locale: baseLocale.concat('.outboundIVRQueue'),
                                              subpath: 'outbound-ivr-queue',
                                            },
                                            [QueueType.PREVIEW_DIALER]: {
                                              locale: baseLocale.concat('.previewDialer'),
                                              subpath: 'preview-dialer',
                                            },
                                            [QueueType.PROGRESSIVE_DIALER]: {
                                              locale: baseLocale.concat('.progressiveDialer'),
                                              subpath: 'progressive-dialer',
                                            },
                                            [QueueType.PREDICTIVE_DIALER]: {
                                              locale: baseLocale.concat('.predictiveDialer'),
                                              subpath: 'predictive-dialer',
                                            },
                                            [QueueType.CHAT_INBOUND_QUEUE]: {
                                              locale: baseLocale.concat('.chatInboundQueue'),
                                              subpath: 'chat-inbound-queue',
                                            },
                                            [QueueType.INBOUND_TASK_QUEUE]: {
                                              locale: baseLocale.concat('.inboundTaskQueue'),
                                              subpath: 'inbound-task-queue',
                                            },
                                            [QueueType.OUTBOUND_TASK_QUEUE]: {
                                              locale: baseLocale.concat('.outboundTaskQueue'),
                                              subpath: 'outbound-task-queue',
                                            },
                                          });

export default QueueTypeProperties;
