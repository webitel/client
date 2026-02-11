import Storage from '../enums/Storage.enum';

const storageTypes = {
	[Storage.LOCAL]: 'local',
	[Storage.S3]: 's3',
	[Storage.DROPBOX]: 'dropbox',
	[Storage.DRIVE]: 'drive',
};

export const enumToBackendAdapter = (enumType) => storageTypes[enumType];

export const backendToEnumAdapter = (backendType) =>
	Object.keys(storageTypes).find((key) => storageTypes[key] === backendType);

export default {
	backendToEnum: backendToEnumAdapter,
	enumToBackend: enumToBackendAdapter,
};
