import Symbiote from '../../symbiote/core/Symbiote.js';

class MyCom extends Symbiote {
  ssrMode = true;

  init$ = {
    text: 'TEXT',
    onUpdate: () => {
      this.$.text = Date.now().toString();
    },
  }
}

MyCom.reg('my-com');