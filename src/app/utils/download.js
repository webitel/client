export const download = (dataStr, name) => {
	const downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute('href', dataStr);
	downloadAnchorNode.setAttribute('download', name);
	document.body.appendChild(downloadAnchorNode);
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
};

export const downloadAsJSON = (obj, filename) => {
	const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, 4))}`;
	download(dataStr, `${filename}.json`);
};

export const downloadAsTXT = (text, filename) => {
	const dataStr = `data:text/plain;charset=utf-8,${text}`;
	download(dataStr, `${filename}.txt`);
};

export const downloadAsCSV = (dataStr, name) => {
	download(dataStr, name);
};
