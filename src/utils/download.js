
export const downloadAsJSON = (obj, name) => {
    const dataStr = 'data:text/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(obj, null, 4));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', name+'-schema.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};