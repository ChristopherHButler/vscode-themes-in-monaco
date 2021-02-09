import React, { useState, useEffect } from 'react';
import { convertTheme } from 'monaco-vscode-textmate-theme-converter/lib/cjs';

import DownloadButton from './DownloadButton';
import JSONEditor from './JSONEditor';



const ThemeUpload = ({ selectedTheme, onThemeConverted }) => {

  const [value, setValue] = useState('');

  const [convertedTheme, setConvertedTheme] = useState(null);

  useEffect(() => {
    setValue(JSON.stringify(selectedTheme.theme, null, 2));
  }, [selectedTheme]);

  const onConvertTheme = () => {
    try {
      // const theme = value;
      // console.log('theme: ', theme);
      const theme = { ...convertTheme(JSON.parse(value)), inherit: true };
      setConvertedTheme(theme);
      onThemeConverted(theme);
    } catch (err) {
      setConvertedTheme(null);
      console.log('Oh shit! We fucked up!: ', err.message);
      throw err;
    }
  };

  return (
    <div className="panel">
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '15px 0px' }}>
      <div className="row">
        <button disabled>Upload Theme File</button>
      </div>
      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <button onClick={onConvertTheme}>Convert Theme</button>
        {convertedTheme && <><div style={{ marginLeft: '15px' }} /><DownloadButton theme={convertedTheme} /></>}
      </div>
    </div>
    <div style={{ margin: '4px 0px' }}>Enter your vscode theme to convert here, then click convert.</div>
    <div style={{ height: '75%', width: '100%', border: '1px solid red' }}>
      <JSONEditor value={value} onChange={setValue} />
    </div>
  </div>
  );
};

export default ThemeUpload;
