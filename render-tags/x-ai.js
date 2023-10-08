import { X } from '../core/index.js';
import { getHash } from '../jam-tools/iso/getHash.js';

let AiProxyPort = '8080';

export class XAI extends X {

  constructor() {
    super();
    this.tabIndex = 0;
    this.contentEditable = 'true';
    this.attachShadow({
      mode: 'open',
      // delegatesFocus: true,
    });
    this.shadowRoot.innerHTML = /*html*/ `<slot></slot>`;
  }

  /**
   * 
   * @param {String} prompt 
   */
  async handlePrompt(prompt) {
    this.innerHTML = /*html*/ `<loader-el></loader-el>`;
    let promptHash = await getHash(prompt);
    let content = await XAI.cache.read(promptHash);
    if (!content) {
      content = await (await fetch(`http://localhost:${AiProxyPort}/html/`, {
        method: 'POST',
        body: prompt,
      })).text();
      // content = /*html*/ `<section><h2>AI RESP PLACEHOLDER</h2></section>`;
      await XAI.cache.write(promptHash, content);
    }
    this.innerHTML = content;
  }

  initCallback() {
    this.sub('prompt', (val) => {
      if (!val.trim()) {
        return;
      }
      let tplAdd = '';
      let tpl = this.querySelector('template');
      tplAdd = tpl?.innerHTML || this.innerHTML;
      this.handlePrompt(val + tplAdd);
    });

    this.sub('port', (val) => {
      if (!val.trim()) {
        return;
      }
      AiProxyPort = val;
    });
  }
}

XAI.bindAttributes({
  prompt: 'prompt',
  port: 'port',
});

XAI.addShadowStyles(/*css*/ `
:host {
  display: block;
}
:host(:focus) {
  outline: dashed 4px #f0c;
}
`);

XAI.reg('x-ai');