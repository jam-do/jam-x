import { X } from '../core/X.js';
export class XDWA extends X {

  initCallback() {
    this.sub('src', async (/** @type {String} */ val) => {
      this.applyOuterHTML(await this.getDwa(val));
    });
  }

}

XDWA.bindAttributes({
  src: 'src',
});

XDWA.reg('x-dwa');

export default XDWA;