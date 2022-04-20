import { QueueType } from 'webitel-sdk/esm2015/enums';

export default (queueType) => {
  switch (queueType) {
    case QueueType.OFFLINE_QUEUE:
      return 'offline-queue';
    case QueueType.INBOUND_QUEUE:
      return 'inbound-queue';
    case QueueType.OUTBOUND_IVR_QUEUE:
      return 'outbound-ivr';
    case QueueType.PREVIEW_DIALER:
      return 'preview-dialer';
    case QueueType.PROGRESSIVE_DIALER:
      return 'progressive-dialer';
    case QueueType.PREDICTIVE_DIALER:
      return 'predictive-dialer';
    case QueueType.CHAT_INBOUND_QUEUE:
      return 'chat-inbound-queue';
    case QueueType.INBOUND_TASK_QUEUE:
      return 'inbound-task-queue';
    default:
      return 'unknown';
  }
};
