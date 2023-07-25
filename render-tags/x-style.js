import { X } from '../core/X.js';

export class XStyle extends X {
  constructor() {
    super();
    this.style.display = 'none';
  }

  initCallback() {
    let css = this.textContent || '';
    let id = this.getAttribute('tpl-id');
    /** @type {Partial<HTMLElement & Document>} */
    // @ts-ignore
    let root = this.getRootNode() || document;
    this.remove();
    // @ts-ignore
    let readyStyle = root.querySelector(`[tpl-id='${id}']`);
    if (readyStyle) {
      return;
    }
    let blob = new Blob([css], {
      type: 'text/css',
    });
    let url = URL.createObjectURL(blob);
    let link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    // @ts-ignore
    link.setAttribute('tpl-id', id);
    // @ts-ignore
    (root.head ? root.head : root).appendChild(link);
  }
}

XStyle.reg('x-style');

export default XStyle;