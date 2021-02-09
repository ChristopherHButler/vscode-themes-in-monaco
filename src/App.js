import './styles/app.css';
import React, { useState } from 'react';

import ThemeUpload from './components/ThemeUpload';
import ThemeSelector from './components/ThemeSelector';
import DownloadButton from './components/DownloadButton';

import CodeEditor from './components/CodeEditor';

import { generateId } from './helpers/random';


const App = () => {

  // the converted themes
  const [themes, setThemes] = useState([]);

  const [themeData, setThemeData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('');

  const [themesConverted, setThemesConverted] = useState(false);

  // console.log('themes: ', themes);
  // console.log('selectedTheme: ', selectedTheme);

  const onThemeConverted = (theme) => {
    // add this theme to the list of themes
    const userTheme = { id: generateId(), theme };
    setThemes([ ...themes, userTheme ]);

    // set this theme to the selected theme
    setSelectedTheme(userTheme);
  };


  return (
    <div className="column">
      <h1>vscode themes in monaco</h1>
      <div className="row">
      <ThemeUpload selectedTheme={selectedTheme} onThemeConverted={onThemeConverted} />
      <div className="panel">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '15px 0px' }}>
          <ThemeSelector themes={themes} theme={selectedTheme} setTheme={setSelectedTheme} disabled={!themesConverted} />
          <DownloadButton theme={themeData} />
        </div>
        <div style={{ margin: '4px 0px' }}>Write some sample code to test your theme!</div>
        <CodeEditor
          themes={themes}
          setThemes={setThemes}
          selectedTheme={selectedTheme}
          setThemeData={setThemeData}
          setThemesConverted={setThemesConverted}
        />
      </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>Notes + Disclaimer</h4>
        <p style={{ margin: '5px' }}>
          This is a tiny app that lets you either choose a vscode theme from the drop down
          to select the monaco-editor friendly version. This will appear in the editor on the left when you select a theme.
        </p>
        <p style={{ margin: '5px' }}>
          Or you can write / copy in a vscode theme in the editor on the left, and generate a monaco friendly theme by clicking Convert Theme when you are done.
        </p>
        <p style={{ margin: '5px' }}>
          If there were no errors whlie converting the theme a download button will appear and you can download your theme as JSON.
        </p>
        <p style={{ margin: '5px' }}>
          One way of generating a vscode theme (so you dont have to do it from scratch) is by running shift + command + p in vscode and selecting Developer: Generate Color Theme From Current Settings
        </p>
        <p style={{ margin: '5px' }}>
          Disclaimer: I know the UI looks like shit. This was meant to be a a POC but at some point I realized someone might actually want to use it.
          I will re-write this and do a proper job.
        </p>
        <p style={{ margin: '5px' }}>
          Actual Disclaimer: There is no effort put into error handling at the moment so probably a good idea to run this with the console open.
          Also, there ARE bugs. Some thigns don't work. It is what it is right now o_0
        </p>
      </div>
    </div>
  );
}

export default App;