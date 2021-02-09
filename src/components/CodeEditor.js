import React, { useEffect, useState, useRef } from 'react';
// import Editor from '@monaco-editor/react';
import MonacoEditor from 'react-monaco-editor';
import { convertTheme } from 'monaco-vscode-textmate-theme-converter/lib/cjs';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';

import { sampleCode } from '../helpers/data';
import { Themes } from '../constants';

import darkPlusTheme from '../themes/dark_plus.json';
import lightPlusTheme from '../themes/light_plus.json';



const registry = new Registry({
  getGrammarDefinition: async (scopeName) => {
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


const CodeEditor = ({ selectedTheme, setThemeData, setThemesConverted }) => {
  const monacoRef = useRef(null);
  const editorRef = useRef();

  // code in editor
  const [value, setValue] = useState(sampleCode);

  // the converted themes
  const [themes, setThemes] = useState([]);

  // initialize all themes. Ideally move this out but I want to keep it simple for now.
  useEffect(() => {
    const dpt = { ...convertTheme(darkPlusTheme), inherit: true };
    const lpt = { ...convertTheme(lightPlusTheme), inherit: true };
    setThemes([
      { id: Themes.DARK_PLUS.value, theme: dpt},
      { id: Themes.LIGHT_PLUS.value, theme: lpt }
    ]);
    setThemesConverted(true);
  }, []);

  // update the current theme
  useEffect(() => {
    if (monacoRef.current && themes.length > 0) {

      const theme = themes.find(t => t.id === selectedTheme.id);

      monacoRef.current.editor.defineTheme('custom-theme', theme.theme);

      liftOff(monacoRef.current).then(() => monacoRef.current.editor.setTheme('custom-theme'));

      // this is to be able to download the theme as json
      setThemeData(theme.theme);
    }
  }, [selectedTheme]);


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

    await wireTmGrammars(monaco, registry, grammars, editorRef.current);
  };


  const onEditorDidMount = (editor, monaco) => {
    // console.log('editor did mount');
    monacoRef.current = monaco;
    editorRef.current = editor;
  };


  const onEditorChange = (value, event) => {
    setValue(value);
  };


  return (
    <div id="monaco-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '75%', border: '1px solid red' }}>
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
