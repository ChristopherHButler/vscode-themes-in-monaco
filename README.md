# vscode themes in monaco

POC App to get vscode themes working in Monaco


## Procedure to Reproduce

### Notes

 - Do NOT use CRA. This implementation relies on configuring webpack.
   - you should NOT load the languages you want to provide tokens for
```js
new MonacoWebpackPlugin({
  // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
  languages: [
    // 'html',
    // 'markdown',
    // 'css',
    // 'scss',
    // 'less',
    //'javascript',
    // 'typescript',
    // 'coffee',
    // 'python',
    // 'json',
  ],
  features: ['!gotoSymbol'],
}),
```
 - Specific versions of editor and plugins are important.
 - The order of loading WASM and having the theme converted are obviously important.
   - pay special attention to the root component: 
```js
// load wasm
(async () => {
  await loadWASM('./onigasm.wasm');
  ReactDOM.render(<App />, document.getElementById('root'));
})();
```

 - The code of interest is in the CodeEditor component.
 - Themes are taken from [vscode](https://github.com/microsoft/vscode/tree/master/extensions/theme-defaults)
   - Note: some modifications are required here.
 - grammar files are taken from [vscode-textmate](https://github.com/microsoft/vscode-textmate)


 1. install monaco
 2. create the editor component
 3. install monaco-vscode-textmate-theme-converter

 **Notes from [monaco-vscode-textmate-theme-converter](https://github.com/Nishkalkashyap/monaco-vscode-textmate-theme-converter)**

> - VSCode themes are not directly compatible with monaco-editor themes. The problem here is that vscode uses tmGrammar tokens for colorization support while monaco uses its own code editor to generate language tokens. (See more about it [here](https://github.com/Microsoft/monaco-editor/issues/675#issuecomment-363151951)).

> - You can use [monaco-textmate](https://www.npmjs.com/package/monaco-textmate) to make your monaco-editor tmGrammar compatible.

> - Once the tokens are tmGrammar compatible, you need to convert vscode generated theme data to monaco-editor compatible api. This package does exactly that.

 4. install monaco-textmate

 **Notes from [monaco-textmate](https://www.npmjs.com/package/monaco-textmate)**

> - monaco-textmate relies on onigasm package to provide oniguruma regex engine in browsers. onigasm itself relies on WebAssembly. Therefore to get monaco-textmate working in your browser, it must have WebAssembly support and onigasm loaded and ready-to-go.

 5. install [Onigasm](https://www.npmjs.com/package/onigasm#light-it-up)

  following their instructions:

 - WASM must be loaded before you use any other feature like OnigRegExp or OnigScanner

 So...

 - Add wasm file to public folder and load in index file... the mount root node

and going back to monaco-textmate they say:

>Example below is just a demostration of available API. To wire it up with monaco-editor use monaco-editor-textmate.

So then going back to monaco-editor-textmate...

 **Notes from [monaco-editor-textmate](https://github.com/NeekSandhu/monaco-editor-textmate)**

> **Limitations**

> - monaco-editor distribution comes with built-in tokenization support for few languages. Because of this monaco-editor-textmate cannot be used with monaco-editor without some modification, see explanation of this problem here.

> **Solution**

> - To get monaco-editor-textmate working with monaco-editor, you're advised to use Webpack with monaco-editor-webpack-plugin which allows you to control which of "built-in" languages should monaco-editor use/bundle, leaving the rest. With that control you must exclude any/all languages for which you'd like to use TextMate grammars based tokenization instead.

 6. install monaco-editor-webpack-plugin



This issue was helpful: [https://github.com/NeekSandhu/monaco-editor-textmate/issues/14](https://github.com/NeekSandhu/monaco-editor-textmate/issues/14)

## Project

To see this in action in a real project checkout [contrived](https://contrived.dev/)

I am also currently working on a new AI powered, vibe coding editor: [cdbx.ai](https://cdbx.ai)
