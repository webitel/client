export interface MessengerWindowMessage {
	status?: 'success' | 'error';
	detail?: string;
}

let popup: Window | null = null;
let removeListener: (() => void) | null = null;

/**
 * [Claude] opens the messenger's setup page in a popup, which reports back with postMessage;
 * only one popup and one listener live at a time, and only the popup's messages are passed on
 */
const openMessengerWindow = ({
	url,
	listener,
}: {
	url: string;
	listener: (msg: MessageEvent<MessengerWindowMessage>) => void;
}) => {
	popup?.close();
	removeListener?.();

	popup = window.open(
		url,
		'messenger-setup',
		'popup, width=600, height=700, top=100, left=100',
	);
	if (!popup) return;

	const onMessage = (msg: MessageEvent<MessengerWindowMessage>) => {
		if (msg.source === popup) listener(msg);
	};
	window.addEventListener('message', onMessage);
	removeListener = () => window.removeEventListener('message', onMessage);
};

export default openMessengerWindow;
