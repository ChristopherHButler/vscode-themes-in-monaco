import React from 'react';
import ReactDOM from 'react-dom';
import { loadWASM } from 'onigasm';

import "core-js/stable";
import "regenerator-runtime/runtime";
import '../style/style.css';

import App from './App';

// load wasm
(async () => {
  await loadWASM('./onigasm.wasm');
  ReactDOM.render(<App />, document.getElementById('root'));
})();

