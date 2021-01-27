import QueueType from '../enums/QueueType.enum';

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
    case QueueType.TASK_QUEUE:
      return 'task-queue';
    default:
      return 'unknown';
  }
};
