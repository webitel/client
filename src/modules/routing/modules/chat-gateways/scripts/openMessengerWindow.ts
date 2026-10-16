// modified version of https://dev.to/dinkydani21/how-we-use-a-popup-for-google-and-outlook-oauth-oci
// note: code from this site doesnt clear windowRef after window.close()

export interface MessengerWindowMessage {
	status?: 'success' | 'error';
	detail?: string;
}

let windowRef: Window | null = null;

const openMessengerWindow = ({
	url,
	name = 'Add or remove pages',
	listener,
}: {
	url: string;
	name?: string;
	listener: (msg: MessageEvent<MessengerWindowMessage>) => void;
}) => {
	const windowFeatures =
		'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

	if (windowRef) windowRef.close();
	windowRef = window.open(url, name, windowFeatures);
	if (!windowRef) return;
	windowRef.focus();

	const opener: Window = windowRef.opener;
	const _listener = (msg: MessageEvent<MessengerWindowMessage>) => {
		listener(msg);
		if (msg.data.detail === 'canceled') {
			opener.removeEventListener('message', _listener);
		}
	};
	opener.addEventListener('message', _listener, false);
};

export default openMessengerWindow;
