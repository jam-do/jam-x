import X from '../core/X.js';
import { PubSub } from '../core/PubSub.js';

export class XData extends X {
  initCallback() {
    let ctxId = this.getAttribute('ctx');
    if (!ctxId) {
      return;
    }
    let data = PubSub.getCtx(ctxId);
    if (!data) {
      data = PubSub.registerCtx({}, ctxId);
    }
    let dataItems = [...this.querySelectorAll('x-item')];
    dataItems.forEach((item) => {
      let key = item.getAttribute('key');
      let value = item.getAttribute('value');
      data.add(key, value);
    });
    this.remove();
  }
}

XData.reg('x-data');

export default XData;