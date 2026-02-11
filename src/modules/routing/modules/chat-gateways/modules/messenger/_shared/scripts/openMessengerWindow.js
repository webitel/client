// modified version of https://dev.to/dinkydani21/how-we-use-a-popup-for-google-and-outlook-oauth-oci
// note: code from this site doesnt clear windowRef after window.close()

let windowRef = null;

const openMessengerWindow = ({
	url,
	name = 'Add or remove pages',
	listener,
}) => {
	const windowFeatures =
		'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

	if (windowRef) windowRef.close();
	windowRef = window.open(url, name, windowFeatures);
	windowRef.focus();

	const _listener = (msg) => {
		listener(msg);
		if (msg.data.detail === 'canceled') {
			windowRef.opener.removeEventListener('message', _listener);
		}
	};
	windowRef.opener.addEventListener('message', _listener, false);
};

export default openMessengerWindow;
