import { X } from '../core/X.js';

export class XRootStyles extends X {

  initCallback() {
    this.sub('src', async (src) => {
      let root = this.getRootNode();
      if (!root) {
        return;
      }
      let cssTxt = await this.getDwa(src);
      let styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(cssTxt);
      // @ts-ignore
      let styleSet = new Set([...root.adoptedStyleSheets, styleSheet]);
      // @ts-ignore
      root.adoptedStyleSheets = [...styleSet];
    });
    
  }
}

XRootStyles.bindAttributes({
  src: 'src',
});

XRootStyles.reg('x-root-styles');