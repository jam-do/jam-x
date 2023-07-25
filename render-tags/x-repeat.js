import X from '../core/X.js';
import { applyData } from '../iso/applyData.js';

export class XRepeat extends X {
  initCallback() {
    this.getData().then((data) => {
      if (!data) {
        return;
      }
      let template = this.querySelector('template');
      if (!template) {
        let tplId = this.getAttribute('template-id');
        if (tplId) {
          // @ts-ignore
          template = this.getRootNode()?.querySelector(`template[id=${tplId}]`);
        }
      }
      if (!template) {
        return;
      }
      let html = '';
      if (Array.isArray(data)) {
        data.forEach((desc) => {
          html += applyData(template.innerHTML, desc);
        });
      } else if (data.constructor === Object) {
        for (let key in data) {
          let desc = {
            _KEY_: key,
            ...data[key],
          };
          html += applyData(template.innerHTML, desc);
        }
      }
      this.outerHTML = html;
    });
  }
}

XRepeat.reg('x-repeat');