import React from 'react';

import { downloadAsJson } from '../helpers/download';



const DownloadButton = ({ theme }) => {
  return (
    <button
      className="row"
      onClick={() => downloadAsJson(theme, 'theme')}
      disabled={theme === null}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px' }}
    >
      Download Theme
    </button>
  );
};

export default DownloadButton
