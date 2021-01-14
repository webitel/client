import queue from './defaults/defaultQueue';

const offlineQueue = () => ({
  ...queue(),
  type: 0,
  schema: {},
  team: {},
  strategy: {},
  ringtone: {},
  timeout: 10,
  payload: {
    waitBetweenRetries: 60,
    originateTimeout: 60,
    waitForResultStatus: true,
    maxAttempts: 3,
    recordings: false,
  },
});

export default offlineQueue;
