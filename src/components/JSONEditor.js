import React, { useEffect, useState, useRef } from 'react';
// import Editor from '@monaco-editor/react';
import MonacoEditor from 'react-monaco-editor';

import { MONACO_DEFAULT_OPTIONS } from '../constants';


const JSONEditor = ({ value, onChange }) => {
  const monacoRef = useRef(null);
  const editorRef = useRef();

  const onEditorDidMount = (editor, monaco) => {
    monacoRef.current = monaco;
    editorRef.current = editor;
  };

  const onEditorChange = (value, event) => {
    onChange(value);
  };

  return (
    <div id="json-monaco-container" style={{ height: '100%', width: '100%' }}>
      <MonacoEditor
        value={value}
        editorDidMount={onEditorDidMount}
        onChange={onEditorChange}
        language="json"
        height="100%"
        options={MONACO_DEFAULT_OPTIONS}
      />
    </div>
  );
};

export default JSONEditor;
