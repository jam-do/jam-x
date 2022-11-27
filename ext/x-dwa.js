import { X } from '../core/X.js';

export class XDWA extends X {

  initCallback() {
    this.sub('src', async (val) => {
      let txtData = await (await window.fetch(val)).text();
      if (!txtData) {
        return;
      }
      let mdlBlob = new Blob([txtData], {
        type: 'text/javascript',
      });
      let mdlUrl = URL.createObjectURL(mdlBlob);
      let result = (await import(mdlUrl)).default;
      this.outerHTML = result;
    });
  }

}

XDWA.bindAttributes({
  src: 'src',
  npm: 'npm',
});

XDWA.reg('x-dwa');

export default XDWA;