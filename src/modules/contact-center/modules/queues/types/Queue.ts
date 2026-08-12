import type { EngineQueue } from '@webitel/api-services/gen/models';
import type { queuePayloadSchema } from '@webitel/api-services/validations';
import type { z } from 'zod';

/**
 * `payload` is a `google.protobuf.Struct`, so it is absent from every generated
 * queue model — its shape lives in the Zod schema instead. And the form holds
 * `variables` as an editable pair list, while the wire format is a map;
 * `QueuesAPI` converts between the two.
 */
export type QueuePayload = z.infer<typeof queuePayloadSchema>;

export interface QueueVariablePair {
	key: string;
	value: string;
}

export type Queue = Omit<EngineQueue, 'variables'> & {
	payload?: QueuePayload;
	variables?: QueueVariablePair[];
};
