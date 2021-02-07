import './styles/app.css';
import React, { useState } from 'react';

import CodeEditor from './components/CodeEditor';
import { downloadAsJson } from './helpers/download';


const App = () => {

  const [theme, setTheme] = useState(null);

  return (
    <div className="container">
      <div style={{ margin: '15px 0px' }}>
        <button
          className="row"
          onClick={() => downloadAsJson(theme)}
          disabled={theme === null}
        >
          Download Theme
        </button>
      </div>
      <CodeEditor
        setTheme={setTheme}
      />
    </div>
  );
}

export default App;