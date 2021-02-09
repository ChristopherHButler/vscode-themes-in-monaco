import React, { useEffect, useState, useRef } from 'react';
// import Editor from '@monaco-editor/react';
import MonacoEditor from 'react-monaco-editor';
import { convertTheme } from 'monaco-vscode-textmate-theme-converter/lib/cjs';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';

import { sampleCode } from '../helpers/data';
import { Themes, MONACO_DEFAULT_OPTIONS } from '../constants';

import darkPlusTheme from '../themes/dark_plus.json';
import lightPlusTheme from '../themes/light_plus.json';

import chbTheme from '../themes/chb.json';

// csb themes
import csbDefaultTheme from '../themes/csb/csb.json';
import csbCobaltTheme from '../themes/csb/csb_cobalt.json';
import csbDarkPlusTheme from '../themes/csb/csb_dark_plus.json';
import csbDraculaTheme from '../themes/csb/csb_dracula.json';
import csbGithubDarkTheme from '../themes/csb/csb_github_dark.json';
import csbGithubLightTheme from '../themes/csb/csb_github_light.json';
import csbGloomTheme from '../themes/csb/csb_gloom.json';
import csbLightPlus from '../themes/csb/csb_light_plus.json';
import csbLightVs from '../themes/csb/csb_light_vs.json';
import csbSolarizedLightTheme from '../themes/csb/csb_solarized_light.json';






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


const CodeEditor = ({ themes, setThemes, selectedTheme, setThemeData, setThemesConverted }) => {
  const monacoRef = useRef(null);
  const editorRef = useRef();

  // code in editor
  const [value, setValue] = useState(sampleCode);

  // initialize all themes. Ideally move this out but I want to keep it simple for now.
  useEffect(() => {
    setThemes([
      // working!
      { 
        id: Themes.DARK_PLUS.value,
        name: Themes.DARK_PLUS.display,
        theme: { ...convertTheme(darkPlusTheme), inherit: true, }
      },
      // not working
      // { 
      //   id: Themes.LIGHT_PLUS.value,
      //   name: Themes.LIGHT_PLUS.display,
      //   theme: { ...convertTheme(lightPlusTheme), inherit: true }
      // },
      // not working
      // {
      //   id: Themes.CHB.value,
      //   name: Themes.CHB.display,
      //   theme: { ...convertTheme(chbTheme), inherit: false }
      // },
      { 
        id: Themes.CSB_DEFAULT.value,
        name: Themes.CSB_DEFAULT.display,
        theme: { ...convertTheme(csbDefaultTheme), inherit: true, }
      },
      { 
        id: Themes.CSB_COBALT.value,
        name: Themes.CSB_COBALT.display,
        theme: { ...convertTheme(csbCobaltTheme), inherit: true }
      },
      // not working
      // {
      //   id: Themes.CSB_DARK_PLUS.value,
      //   name: Themes.CSB_DARK_PLUS.display,
      //   theme: { ...convertTheme(csbDarkPlusTheme), inherit: false }
      // },
      { 
        id: Themes.CSB_DRACULA.value,
        name: Themes.CSB_DRACULA.display,
        theme: { ...convertTheme(csbDraculaTheme), inherit: true, }
      },
      { 
        id: Themes.CSB_GITHUB_DARK.value,
        name: Themes.CSB_GITHUB_DARK.display,
        theme: { ...convertTheme(csbGithubDarkTheme), inherit: true }
      },
      {
        id: Themes.CSB_GITHUB_LIGHT.value,
        name: Themes.CSB_GITHUB_LIGHT.display,
        theme: { ...convertTheme(csbGithubLightTheme), inherit: false }
      },
      { 
        id: Themes.CSB_GLOOM.value,
        name: Themes.CSB_GLOOM.display,
        theme: { ...convertTheme(csbGloomTheme), inherit: true, }
      },
      { 
        id: Themes.CSB_LIGHT_PLUS.value,
        name: Themes.CSB_LIGHT_PLUS.display,
        theme: { ...convertTheme(csbLightPlus), inherit: true }
      },
      {
        id: Themes.CSB_VS_LIGHT.value,
        name: Themes.CSB_VS_LIGHT.display,
        theme: { ...convertTheme(csbLightVs), inherit: false }
      },
      {
        id: Themes.CSB_SOLARIZED_LIGHT.value,
        name: Themes.CSB_SOLARIZED_LIGHT.display,
        theme: { ...convertTheme(csbSolarizedLightTheme), inherit: false }
      },
    ]);
    setThemesConverted(true);
  }, []);

  // update the current theme
  useEffect(() => {
    setCurrentTheme(selectedTheme.id);
  }, [selectedTheme]);

  const setCurrentTheme = (themeId) => {
    if (monacoRef.current && themes.length > 0) {

      const theme = themes.find(t => t.id === themeId);

      monacoRef.current.editor.defineTheme('custom-theme', theme.theme);

      liftOff(monacoRef.current).then(() => monacoRef.current.editor.setTheme('custom-theme'));

      // this is to be able to download the theme as json
      setThemeData(theme.theme);
    }
  };


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
    <div id="monaco-container" style={{ height: '75%', width: '100%', border: '1px solid red', }}>
      <MonacoEditor
        value={value}
        editorDidMount={onEditorDidMount}
        onChange={onEditorChange}
        language="javascript"
        height="100%"
        options={MONACO_DEFAULT_OPTIONS}
      />
    </div>
  );
};

export default CodeEditor;
