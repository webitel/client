import Storage from '../enums/Storage.enum';
import Service from '../lookups/Service.lookup';
import defaultStorage from './defaults/defaultStorage';

const s3Storage = () => ({
	...defaultStorage(),
	type: Storage.S3,
	properties: {
		keyId: '',
		accessKey: '',
		bucketName: '',
		region: {},
		endpoint: Service.AWS.endpoint,
		pathPattern: '$DOMAIN/$Y/$M/$D',
	},
});

export default s3Storage;
