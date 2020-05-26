export const downloadAsJSON = (obj, name) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, 4))}`;
    download(dataStr, `${name}-schema.json`);
};

export const downloadAsCSV = (dataStr, name) => {
    download(dataStr, name);
};

export const download = (dataStr, name) => {
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', name);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};
