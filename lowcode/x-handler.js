import { X, Data } from '../core/X.js';

export class XHandler extends X {
  initCallback() {
    let ctxName = this.getAttribute('ctx');
    let dataCtx = Data.getCtx(ctxName);
    if (!dataCtx) {
      dataCtx = Data.registerCtx({}, ctxName);
    }
    let fnName = this.getAttribute('key');
    let fnStrSrc = this.getAttribute('call');
    this.remove();
    if (fnName) {
      // @ts-ignore
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