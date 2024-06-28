import { QueueType } from "webitel-sdk/esm2015/enums";

export default Object.keys(QueueType)
  // eslint-disable-next-line no-restricted-globals
  .filter((key) => Number.isNaN(+key))
  .map((key) => ({
    name: key,
    value: `${QueueType[key]}`,
    locale: `objects.queue.type.${QueueType[key]}`,
  }));
