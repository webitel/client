import generateUri from '../scripts/generateUri';

const defaultChatGateway = () => ({
  name: '',
  uri: generateUri(),
  flow: {},
  enabled: false,
  provider: '',
  metadata: {},
  updates: {
    title: '',
    close: '',
    join: '',
    left: '',
    // author @Lera24
    // https://webitel.atlassian.net/browse/WTEL-7461
    // temporarily to remove field filePolicyFail
    //
    //filePolicyFail: '',
  },
});

export default defaultChatGateway;
