

export const downloadAsJson = async (objectData, filename) => {
  const _filename = `${filename}.json`;
  const contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData, null, 2)))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, _filename);
  } else {
    const a = document.createElement('a');
    a.download = _filename;
    a.href = `data:${contentType},${encodeURIComponent(JSON.stringify(objectData, null, 2))}`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};