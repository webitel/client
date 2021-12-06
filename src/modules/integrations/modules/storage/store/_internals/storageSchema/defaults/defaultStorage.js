import Service from '../../lookups/Service.lookup';

const defaultStorage = () => ({
  name: Service.aws.endpoint,
  maxSize: 0,
  expireDays: 0,
  priority: 0,
});

export default defaultStorage;
