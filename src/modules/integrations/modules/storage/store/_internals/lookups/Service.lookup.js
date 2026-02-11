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

export default StorageServiceOptions;
