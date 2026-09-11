import { CommunicationsAPI, QueueMembersAPI } from '@webitel/api-services/api';
import { EngineCommunicationChannels } from '@webitel/api-services/gen/models';
import {
	memberCommunicationSchema,
	phoneNumberSchema,
} from '@webitel/api-services/validations';
import type { Ref } from 'vue';

const { dtmf: dtmfSchema } = memberCommunicationSchema.shape;
const destinationSchemaByChannel = {
	[EngineCommunicationChannels.Phone]: phoneNumberSchema,
} as const;

interface MappingField {
	name: string;
	/** the csv column tags this field maps to; absent until the user picks them */
	csv?: string | string[];
}

// biome-ignore lint/suspicious/noExplicitAny: rows come from a user-supplied csv
type CsvRow = Record<string, any>;

const findCommunicationByCode = (communications: CsvRow[], code: string) =>
	communications.find((communication) => communication.code === code);

/**
 * Turns parsed csv rows into queue members.
 *
 * A row carries its communications as parallel arrays — destinations, codes,
 * priorities and so on — which are zipped back together here. Rows with a
 * destination but no code (or the reverse) cannot form a communication, so the
 * shorter of the two decides how many are built.

 */
export const useNormalizeCsvMembers = ({
	parentId,
	file,
	mappingFields,
}: {
	parentId: Ref<string>;
	file: Ref<File | null>;
	mappingFields: Ref<MappingField[]>;
}) => {
	const normalizeData = async (data: CsvRow[]) => {
		const { items: allCommunications } = await CommunicationsAPI.getList({
			size: 5000,
			// `channel` decides which rule a destination is held to
			fields: [
				'id',
				'code',
				'channel',
			],
		});

		return data.map((item) => {
			const normalized: CsvRow = {
				...item,
			};

			for (const [key, target] of [
				[
					'timezoneId',
					'timezone',
				],
				[
					'bucketId',
					'bucket',
				],
				[
					'agentId',
					'agent',
				],
			] as const) {
				if (normalized[key]) {
					normalized[target] = {
						id: item[key],
					};
					normalized[key] = undefined;
				}
			}

			if (normalized.variables) {
				const mapping = mappingFields.value.find(
					(field) => field.name === 'variables',
				);
				normalized.variables = item.variables.reduce(
					(variables: CsvRow, variable: string, index: number) => {
						// `csv` is the list of column tags mapped onto variables
						variables[mapping?.csv?.[index]] = variable;
						return variables;
					},
					{},
				);
			}

			if (!normalized.priority) normalized.priority = 0;

			normalized.communications = [];

			const communicationCount = Math.min(
				normalized.destination.length,
				normalized.code.length,
			);

			for (let index = 0; index < communicationCount; index += 1) {
				const type = findCommunicationByCode(
					allCommunications,
					normalized.code[index],
				);

				if (!type) {
					console.error(`cannot find communication: ${normalized.code[index]}`);
				}
				const id = type?.id;
				const destination = normalized.destination[index];

				// a communication needs both a type and somewhere to reach
				if (!id || !destination) continue;

				const destinationSchema =
					destinationSchemaByChannel[
						type.channel as keyof typeof destinationSchemaByChannel
					];
				const checked = destinationSchema?.safeParse(destination);

				if (checked && !checked.success) {
					// already localized: `configureZod` installs a global error map
					throw new SyntaxError(checked.error.issues[0].message);
				}

				const communication: CsvRow = {
					destination,
					type: {
						id,
					},
				};

				if (normalized.commPriority?.[index]) {
					communication.priority = normalized.commPriority[index];
				}
				if (normalized.description?.[index]) {
					communication.description = normalized.description[index];
				}
				if (normalized.dtmf?.[index]) {
					if (!dtmfSchema.safeParse(normalized.dtmf[index]).success) {
						throw new SyntaxError('No valid DTMF were passed!');
					}
					communication.dtmf = normalized.dtmf[index];
				}

				normalized.communications.push(communication);
			}

			if (!normalized.communications.length) {
				throw new RangeError('No valid communications were passed!');
			}

			normalized.destination = undefined;
			normalized.code = undefined;
			normalized.commPriority = undefined;
			normalized.description = undefined;
			normalized.dtmf = undefined;

			return normalized;
		});
	};

	const saveBulkData = async (data: CsvRow[]) =>
		QueueMembersAPI.addBulk({
			parentId: parentId.value,
			fileName: file.value?.name ?? '',
			items: await normalizeData(data),
		});

	return {
		normalizeData,
		saveBulkData,
	};
};
