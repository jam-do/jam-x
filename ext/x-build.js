import X from '../core/X.js';

export class XBuild extends X {
  initCallback() {
    this.remove();
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        let doc = new XMLSerializer().serializeToString(document);
        let blob = new Blob([doc], {
          type: 'text/html',
        });
        let fileName = this.getAttribute('file');
        let file = new File([blob], fileName || 'index.html', {
          type: 'text/html',
        });
        console.log(file);
      });
    });
  }
}

XBuild.reg('x-build');

export default XBuild;