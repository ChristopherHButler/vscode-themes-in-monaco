import React from 'react';

import { downloadAsJson } from '../helpers/download';



const DownloadButton = ({ theme }) => {
  return (
    <button
      className="row"
      onClick={() => downloadAsJson(theme)}
      disabled={theme === null}
    >
      Download Theme
    </button>
  );
};

export default DownloadButton
