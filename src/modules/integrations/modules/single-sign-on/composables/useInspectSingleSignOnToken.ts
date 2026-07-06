const TIMEOUT = 120_000;
const INTERVAL = 300;
const STORAGE_KEY = 'ssoInspectToken';

export const useInspectSingleSignOnToken = () => {
  const getUrl = (id: number) => `/api/login/${id}/inspect`;

  const parseTokenData = (tab)=> {
    const bodyText = tab.document.body?.textContent?.trim();
    if (!bodyText) return null;

    return JSON.parse(bodyText);
  };

  const getTokenDataFromStorage = ()=> {
    const tokenData = localStorage.getItem(STORAGE_KEY);
    if (!tokenData) return null;
    return JSON.parse(tokenData);
  };

  const setTokenDataToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const inspectToken = (id: number) => {
      const tab = window.open(getUrl(id), '_blank');
      if (!tab) return;

      let sawCrossOrigin = false;
      const startTime = Date.now();

      const checkTabInterval = setInterval(() => {
        if (tab.closed) {
          clearInterval(checkTabInterval);
          console.log('tab closed');
          return;
        }

        if (Date.now() - startTime > TIMEOUT) {
          clearInterval(checkTabInterval);
          tab.close();
          console.log('timeout');
          return;
        }

        try {
          tab.location.origin;
        } catch {
          console.log('cross origin');
          sawCrossOrigin = true;
          return;
        }

        if (!sawCrossOrigin) return;

        try {
          const data = parseTokenData(tab);
          if (!data) return;

          clearInterval(checkTabInterval);
          setTokenDataToStorage(data);
        } catch (error) {
          clearInterval(checkTabInterval);
          throw error;
        } finally {
          tab.close();
        }
      }, INTERVAL);
  };

  return {
    getTokenDataFromStorage,
    setTokenDataToStorage,
    inspectToken,
  };
};
