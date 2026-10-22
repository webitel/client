const StorageServiceOptions = Object.freeze({
	AWS: {
		name: 'AWS S3 Bucket',
		value: 'aws',
		endpoint: 'amazonaws.com',
	},
	DO: {
		name: 'Digital Ocean Spaces',
		value: 'do',
		endpoint: 'digitaloceanspaces.com',
	},
	CUSTOM: {
		name: 'Custom',
		value: 'custom',
		endpoint: '',
	},
});

/** [Claude] the service of an s3 storage, told by its endpoint */
export const getStorageService = (endpoint?: string) =>
	Object.values(StorageServiceOptions).find(
		(service) => service.endpoint && service.endpoint === endpoint,
	) ?? StorageServiceOptions.CUSTOM;

export default StorageServiceOptions;
