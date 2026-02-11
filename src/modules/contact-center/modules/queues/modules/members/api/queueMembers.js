import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import deepCopy from 'deep-copy';
import { MemberServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const memberService = new MemberServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
	'queueId',
	'name',
	'priority',
	'bucket',
	'timezone',
	'communications',
	'variables',
	'expireAt',
	'minOfferingAt',
	'agent',
	'stopCause',
];

const communicationsFieldsToSend = [
	'destination',
	'display',
	'priority',
	'type',
	'resource',
	'description',
	'dtmf',
];

const defaultSingleObjectCommunication = {
	destination: '',
	display: '',
	priority: 0,
	type: {},
	resource: {},
	description: '',
	dtmf: '',
};

const mapDefaultCommunications = (item) => {
	const copy = deepCopy(item);
	return copy.communications
		? copy.communications.map((comm) => ({
				...defaultSingleObjectCommunication,
				...comm,
			}))
		: [];
};

const preRequestHandler = (item) => {
	const copy = deepCopy(item);
	copy.communications.forEach((copy) =>
		sanitize(copy, communicationsFieldsToSend),
	);
	const variables = copy.variables.reduce(
		(variables, variable) => ({
			...variables,
			[variable.key]: variable.value,
		}),
		{},
	);
	return {
		...copy,
		variables,
	};
};

const getMembersList = async (params) => {
	const defaultObject = {
		createdAt: 'unknown',
		priority: 0,
	};

	const listHandler = (items) => {
		const copy = deepCopy(items);
		return copy.map((item) => ({
			...item,
			communications: applyTransform(item, [
				mapDefaultCommunications,
			]),
		}));
	};

	const {
		page,
		size,
		search,
		sort,
		fields,
		id,
		parentId,
		from,
		to,
		bucket,
		priorityFrom,
		priorityTo,
		priority,
		cause,
		agent,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await memberService.searchMemberInQueue(
			parentId,
			page,
			size,
			search,
			sort,
			fields,
			id,
			bucket,
			undefined,
			from,
			to,
			undefined,
			undefined,
			cause,
			priorityFrom || priority?.from,
			priorityTo || priority?.to,
			undefined,
			undefined,
			undefined,
			agent,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel([
				'variables',
			]),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
				listHandler,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getMember = async ({ parentId, itemId: id }) => {
	const defaultObject = {
		createdAt: 'unknown',
		priority: '0',
		name: 'member',
		expireAt: 0,
		bucket: {},
		timezone: {},
		agent: {},
		communications: [],
		variables: [],
	};

	const responseHandler = (response) => {
		const copy = deepCopy(response);
		let variables = [];
		if (copy.variables) {
			variables = Object.keys(copy.variables).map((key) => ({
				key,
				value: copy.variables[key],
			}));
		}
		const communications = mapDefaultCommunications(copy);
		return {
			...response,
			variables,
			communications,
		};
	};

	try {
		const response = await memberService.readMember(parentId, id);
		return applyTransform(response.data, [
			snakeToCamel([
				'variables',
			]),
			merge(defaultObject),
			responseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addMember = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake([
			'variables',
		]),
	]);
	try {
		const response = await memberService.createMember(parentId, item);
		return applyTransform(response.data, [
			snakeToCamel([
				'variables',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateMember = async ({ itemInstance, itemId: id, parentId }) => {
	const body = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake([
			'variables',
		]),
	]);
	try {
		const response = await memberService.updateMember(parentId, id, body);
		return applyTransform(response.data, [
			snakeToCamel([
				'variables',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteMember = async ({ parentId, id }) => {
	try {
		const response = await memberService.deleteMember(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const resetMembers = async ({ parentId }) => {
	try {
		const response = await memberService.resetMembers(parentId, {});
		return applyTransform(response.data, [
			snakeToCamel([
				'variables',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const resetActiveAttempts = async (body) => {
	try {
		const response = await memberService.resetActiveAttempts(body);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addMembersBulk = async (parentId, fileName, items) => {
	const body = {
		parentId,
		fileName,
		items,
	};
	try {
		const response = await memberService.createMemberBulk(parentId, body);
		return applyTransform(response.data, [
			snakeToCamel([
				'variables',
			]),
			notify(({ callback }) =>
				callback({
					type: 'success',
					text: 'Successfully added',
				}),
			),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const deleteMembersBulk = async (
	parentId,
	{ search, id, from, to, bucket, priority, cause },
) => {
	let body = {
		id,
		q: search,
		createdAt:
			from || to
				? {
						from,
						to,
					}
				: undefined,
		priority,
		stopCause: cause,
		bucketId: bucket,
		withoutMembers: true,
	};

	body = applyTransform(body, [
		camelToSnake(),
	]);

	try {
		const response = await memberService.deleteMembers(parentId, body);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const QueueMembersAPI = {
	getList: getMembersList,
	get: getMember,
	add: addMember,
	addBulk: addMembersBulk,
	update: updateMember,
	delete: deleteMember,
	deleteBulk: deleteMembersBulk,
	resetMembers,
	resetActiveAttempts,
};

export default QueueMembersAPI;
