
const MAIN_SELECTOR = '#main';
const LOCAL_STORAGE_KEY = 'content';
const CODE_MIRROR_MODE = 'javascript';
const CODE_MIRROR_THEME = 'monokai';
const FALLBACK_CONTENT = header;
const EDITOR_BLUR_MESSAGE = 'The editor has lost focus';
const INDEXED_DB_LOAD_MESSAGE = 'Loaded data from IndexedDB, injecting into editor';
const CODEMIRROR_NOT_LOADED_ERROR = 'CodeMirror is not loaded';

import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (typeof CodeMirror === 'undefined') {
      throw new Error(CODEMIRROR_NOT_LOADED_ERROR);
    }

    this.editor = CodeMirror(document.querySelector(MAIN_SELECTOR), {
      value: '',
      mode: CODE_MIRROR_MODE,
      theme: CODE_MIRROR_THEME,
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });


    getDb().then((data) => {
      console.info(INDEXED_DB_LOAD_MESSAGE);
      this.editor.setValue(data || localData || FALLBACK_CONTENT);
    });

    this.editor.on('change', () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, this.editor.getValue());
    });

    this.editor.on('blur', () => {
      console.log(EDITOR_BLUR_MESSAGE);
      putDb(localStorage.getItem(LOCAL_STORAGE_KEY));
    });
  }
}
