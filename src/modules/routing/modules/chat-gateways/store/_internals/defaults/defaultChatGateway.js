import generateUri from '../scripts/generateUri';

const defaultChatGateway = () => ({
  name: '',
  uri: generateUri(),
  flow: {},
  enabled: false,
  provider: '',
  metadata: {},
});

export default defaultChatGateway;
