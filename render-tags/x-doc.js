import { X } from '../core/X.js';

export class XDoc extends X {
  initCallback() {
    let tplHtml = this.getTemplateHTML();
    this.applyOuterHTML(tplHtml);
  }
}

XDoc.reg('x-doc');