import { X } from '../core/X.js';

export class XImport extends X {
  initCallback() {
    this.sub('src', (src) => {
      if (!src) {
        return;
      }
      this.importTextAsset(src).then((assetTxt) => {
        this.applyOuterHTML(assetTxt);
      });
    });
  }
}

XImport.bindAttributes({
  src: 'src',
});

XImport.reg('x-import');