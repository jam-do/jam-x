import { X } from '../core/X.js';
import { md2html } from '../jam-tools/iso/md2html.js';
import styles from '../csslib/code-highlight.css.js';

export class XMd extends X {
  initCallback() {
    this.sub('src', async (val) => {
      let mdSrcTxt = await (await window.fetch(val)).text();
      let html = md2html(mdSrcTxt);
      this.applyOuterHTML(html);
    });
  }
}

XMd.rootStyles = styles;

XMd.bindAttributes({
  src: 'src',
});

XMd.reg('x-md');