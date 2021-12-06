const StorageServiceOptions = Object.freeze({
  aws: {
    name: 'AWS S3 Bucket',
    value: 'aws',
    endpoint: 'amazonaws.com',
  },
  do: {
    name: 'Digital Ocean Spaces',
    value: 'do',
    endpoint: 'digitaloceanspaces.com',
  },
  custom: {
    name: 'Custom',
    value: 'custom',
    endpoint: '',
  },
});

export default StorageServiceOptions;
