import { X } from '../core/X.js';
import { html } from '../core/index.js';

export class XExport extends X {

  init$ = {
    el: null,
    elName: '',
    activePrompt: '',

    onPromptEdit: () => {
      if (!this.$.el) {
        return;
      }
      this.$.el.setAttribute('prompt', this.ref.promptEditor.value);
    },
  }

  initCallback() {
    window.addEventListener('click', () => {
      let el = document.activeElement;
      if (el && el.tagName.includes('-') && el.tagName !== 'X-EXPORT') {
        this.$.elName = el.tagName;
        this.$.activePrompt = el.getAttribute('prompt');
        this.setAttribute('active', '');
        this.$.el = el;
      } else if (el?.tagName === 'X-EXPORT') {

      } else {
        this.removeAttribute('active');
        this.$.el = null;
      }
    });
  }

}

XExport.shadowStyles = /*css*/ `
:host {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: #000;
  color: #0ff;
  z-index: 10000;
  transition: .2s;
}
:host(:not([active])) {
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
}
`;

XExport.template = html`
<div>{{elName}}</div>
<div toolbar>
  <button>History back</button>
  <button>Re-generate</button>
  <button>History forward</button>
  <button>Remove element</button>
</div>
<textarea ref="promptEditor" ${{onchange: 'onPromptEdit', value: 'activePrompt'}}></textarea>
<div toolbar>
  <button>Export page...</button>
</div>
`;

XExport.reg('x-export');