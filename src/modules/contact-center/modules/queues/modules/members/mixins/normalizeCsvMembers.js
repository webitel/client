import CommunicationsAPI from '../../../../../../lookups/modules/communications/api/communications';
import QueueMembersAPI from '../api/queueMembers';
import { digitsDtmfOnly } from '../validation/dtmf';

const findCommunicationIdByCode = ({ communications, code }) =>
	communications.find((communication) => communication.code === code).id;

export default {
	methods: {
		async saveBulkData(data) {
			try {
				const normalizedData = await this.normalizeData(data);
				return QueueMembersAPI.addBulk(
					this.parentId,
					this.file.name,
					normalizedData,
				);
			} catch (err) {
				throw err;
			}
		},

		async getCommunicationTypes() {
			const communications = await CommunicationsAPI.getList({
				size: 5000,
			});
			this.allCommunications = communications.items;
		},

		async normalizeData(data) {
			await this.getCommunicationTypes();

			return data.map((item) => {
				const normalizedItem = {
					...item,
				};

				if (normalizedItem.timezoneId) {
					normalizedItem.timezone = {
						id: item.timezoneId,
					};
					normalizedItem.timezoneId = undefined;
				}
				if (normalizedItem.bucketId) {
					normalizedItem.bucket = {
						id: item.bucketId,
					};
					normalizedItem.bucketId = undefined;
				}
				if (normalizedItem.agentId) {
					normalizedItem.agent = {
						id: item.agentId,
					};
					normalizedItem.agentId = undefined;
				}
				if (normalizedItem.variables) {
					const variablesMappings = this.mappingFields.find(
						(field) => field.name === 'variables',
					);
					normalizedItem.variables = item.variables.reduce(
						(variables, variable, index) => ({
							...variables,
							[variablesMappings.csv[index]]: variable, // csv is arr of tags
						}),
						{},
					);
				}
				if (!normalizedItem.priority) {
					normalizedItem.priority = 0;
				}

				// start filling communications from parsed item
				normalizedItem.communications = [];

				// decide how many communications we should fill
				// if there's destination without code or code without destination,
				// there's no point to even try to fill it because it would be an error,
				// so we find minimum communications count
				const commLength = Math.min(
					normalizedItem.destination.length,
					normalizedItem.code.length,
				);

				// now fill each communication one by one
				for (let index = 0; index < commLength; index += 1) {
					let id;
					try {
						// try to get the communication type Id
						id = findCommunicationIdByCode({
							communications: this.allCommunications,
							code: normalizedItem.code[index],
						});
					} catch (err) {
						// if there's no id, show console error
						console.error(
							`cannot find communication: ${normalizedItem.code[index]}`,
						);
					}

					// if there's no (required) id or destination, skip to the next one
					if (!id || !normalizedItem.destination[index]) continue;

					// if there's actually an Id, continue processing
					const communication = {
						destination: normalizedItem.destination[index],
						type: {
							id,
						},
					};

					// fill communication priority, if present
					if (normalizedItem.commPriority?.[index]) {
						communication.priority = normalizedItem.commPriority[index];
					}

					// fill communication description, if present
					if (normalizedItem.description?.[index]) {
						communication.description = normalizedItem.description[index];
					}

					// fill communication dtmf, if present
					if (normalizedItem.dtmf?.[index]) {
						if (!digitsDtmfOnly(normalizedItem.dtmf[index])) {
							throw new SyntaxError('No valid DTMF were passed!');
						}
						communication.dtmf = normalizedItem.dtmf[index];
					}

					// and add this communication to list
					normalizedItem.communications.push(communication);
				}

				/* in the end, check if there's any communications
          remember: we skip communications where's no destination or code
         */
				if (!normalizedItem.communications.length) {
					throw new RangeError('No valid communications were passed!');
				}

				normalizedItem.destination = undefined;
				normalizedItem.code = undefined;
				normalizedItem.commPriority = undefined;
				normalizedItem.description = undefined;
				normalizedItem.dtmf = undefined;

				return normalizedItem;
			});
		},
	},
};
