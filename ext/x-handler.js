import X from '../core/X.js';
import { PubSub } from '../core/PubSub.js';

export class XHandler extends X {
  initCallback() {
    let ctxName = this.getAttribute('ctx');
    let dataCtx = PubSub.getCtx(ctxName);
    if (!dataCtx) {
      dataCtx = PubSub.registerCtx({}, ctxName);
    }
    let fnName = this.getAttribute('key');
    let fnStrSrc = this.getAttribute('call');
    this.remove();
    if (fnName) {
      let fn = new Function(fnStrSrc);
      let fnWrapper = (e) => {
        let root = e.currentTarget?.getRootNode() || document;
        if (root.host) {
          root = root.host;
        }
        let ctxEl = root.querySelector(`[ctx=${ctxName}]`) || root;
        if (ctxEl) {
          fn = fn.bind(ctxEl);
        }
        fn(e);
      };
      dataCtx.add(fnName, fnWrapper);
    }
  }
}

XHandler.reg('x-handler');

export default XHandler;