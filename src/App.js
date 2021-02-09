import './styles/app.css';
import React, { useState } from 'react';

import ThemeSelector from './components/ThemeSelector';
import DownloadButton from './components/DownloadButton';

import CodeEditor from './components/CodeEditor';



const App = () => {

  const [themeData, setThemeData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('');

  const [themesConverted, setThemesConverted] = useState(false);


  return (
    <div className="container">
      <div style={{ margin: '15px 0px' }}>
        <DownloadButton theme={themeData} />
        <ThemeSelector theme={selectedTheme} setTheme={setSelectedTheme} disabled={!themesConverted} />
      </div>
      <CodeEditor
        selectedTheme={selectedTheme}
        setThemeData={setThemeData}
        setThemesConverted={setThemesConverted}
      />
    </div>
  );
}

export default App;