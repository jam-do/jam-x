import { X } from '../core/X.js';
// @ts-ignore
import { marked } from 'https://esm.sh/marked@5.1.1?bundle';
// @ts-ignore
import { markedHighlight } from 'https://esm.sh/marked-highlight@2.0.1?bundle';
// @ts-ignore
import hljs from 'https://esm.sh/highlight.js@11.8.0?bundle';
import styles from '../csslib/code-highlight.css.js';

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

export class XMd extends X {
  initCallback() {
    this.sub('src', async (val) => {
      let mdSrcTxt = await (await window.fetch(val)).text();
      let html = marked.parse(mdSrcTxt);
      this.applyOuterHTML(html);
    });
  }
}

XMd.rootStyles = styles;

XMd.bindAttributes({
  src: 'src',
});

XMd.reg('x-md');