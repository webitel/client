import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from "@webitel/ui-sdk/src/api/defaults";
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from "@webitel/ui-sdk/src/api/transformers";
import { SystemSettingServiceApiFactory } from "webitel-sdk";
import instance from "../../../../../app/api/instance";
import configuration from "../../../../../app/api/openAPIConfig";

const service = new SystemSettingServiceApiFactory(configuration, "", instance);

const getList = async (params) => {
	const { page, size, search, sort, fields } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch("search"),
	]);

	try {
		const response = await service.searchSystemSetting(
			page,
			size,
			search,
			sort,
			fields,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const get = async ({ itemId: id }) => {
	try {
		const response = await service.readSystemSetting(id);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const fieldsToSend = ["id", "name", "value"];

const add = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await service.createSystemSetting(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const update = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await service.updateSystemSetting(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getLookup = (params) =>
	getList({
		...params,
		fields: params.fields || ["name"],
	});

const deleteItem = async ({ id }) => {
	try {
		const response = await service.deleteSystemSetting(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getObjectsList = async (params) => {
	const { page, size, search, sort, fields } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch("search"),
	]);

	try {
		const response = await service.searchAvailableSystemSetting(
			page,
			size,
			search,
			sort,
			fields,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const ConfigurationAPI = {
	getList,
	get,
	add,
	update,
	delete: deleteItem,
	getLookup,
	getObjectsList,
};

export default ConfigurationAPI;
