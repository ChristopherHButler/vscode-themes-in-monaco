import React, { useEffect, useState, useRef } from 'react';
// import Editor from '@monaco-editor/react';
import MonacoEditor from 'react-monaco-editor';
import { convertTheme } from 'monaco-vscode-textmate-theme-converter/lib/cjs';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';

import Select from './Select';

import darkPlusTheme from '../themes/dark_plus.json';
import lightPlusTheme from '../themes/light_plus.json';



const registry = new Registry({
  getGrammarDefinition: async (scopeName) => {
    console.log('scopeName: ', scopeName);
    if(scopeName == 'source.ts'){
      return {
        format: 'json',
        content: await (await fetch('./TypeScript.tmLanguage.json')).text()
      }
    } else if (scopeName == 'source.js'){
      return {
        format: 'json',
        content: await (await fetch('./JavaScript.tmLanguage.json')).text()
      }
    } else {
      return null;
    }

  }
})


const CodeEditor = ({ setTheme }) => {
  const monacoRef = useRef(null);
  const editorRef = useRef();

  const [value, setValue] = useState(
`
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  function test() {
    return;
  }
  test();

  var abc = 123;
  abc++;
  console.log(abc);
};
`
);

  const [darkPlus, setDarkPlus] = useState(null);

  const [currentTheme, setCurrentTheme] = useState('');

  const themeOptions = () => {
    return (
      <>
        <option id="0">Dark+ (default dark)</option>
        <option id="1">Light+ (default light)</option>
      </>
    );
  }

  const onThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  console.log('darkPlus: ', darkPlus);

  useEffect(() => {
    const theme = {
      ...convertTheme(darkPlusTheme),
      inherit: true,
    };

    setDarkPlus(theme);
    // hook to get access to theme
    setTheme(theme);
  }, [setTheme]);


  const liftOff = async(monaco) => {
    // map of monaco "language id's" to TextMate scopeNames
    const grammars = new Map();

    // grammars.set('css', 'source.css');
    // grammars.set('html', 'text.html.basic');
    // grammars.set('typescript', 'source.ts');

    grammars.set('typescript', 'source.ts');
    grammars.set('javascript', 'source.js');

    monaco.languages.register({id: 'typescript'});
    monaco.languages.register({id: 'javascript'});

    console.log('grammars set... wiring next');

    await wireTmGrammars(monaco, registry, grammars, editorRef.current);
  };

  const onButtonClick = () => {
    if (darkPlus && monacoRef.current) {
      console.log('defining theme, theme: ', darkPlus);
      monacoRef.current.editor.defineTheme('dark-plus', darkPlus);

      liftOff(monacoRef.current).then(() => {
        console.log('setting theme...');
        monacoRef.current.editor.setTheme("dark-plus");
      });
    }
  };


  const onEditorDidMount = (editor, monaco) => {
    console.log('editor did mount');
    monacoRef.current = monaco;
    editorRef.current = editor;
  };

  const onEditorChange = (value, event) => {
    setValue(value);
  };

  return (
    <div id="monaco-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '75%', border: '1px solid red' }}>
      <button onClick={() => onButtonClick()}>Set Theme</button>
      <Select
        name="Theme Select"
        options={themeOptions()}
        value={currentTheme}
        onChange={onThemeChange}
      />
      <MonacoEditor
        value={value}
        editorDidMount={onEditorDidMount}
        onChange={onEditorChange}
        language="javascript"
        height="100%"
      />
    </div>
  );
};

export default CodeEditor;
