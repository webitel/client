import { StorageProviderType } from 'webitel-sdk';
import defaultCognitiveProfile from './defaultCognitiveProfile';

const elevenlabsCognitiveProfile = () => ({
  ...defaultCognitiveProfile(),
  provider: StorageProviderType.Elevenlabs,
  properties: {
    key: '',
  },
});

export default elevenlabsCognitiveProfile;
