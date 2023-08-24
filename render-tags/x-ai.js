import { X } from '../core/index.js';

let AiProxyPort = '8080';

export class XAI extends X {

  /**
   * 
   * @param {String} prompt 
   */
  async handlePrompt(prompt) {
    this.innerHTML = /*html*/ `<loader-el></loader-el>`;
    let lsMap;
    let lsMapB64 = window.localStorage.getItem(this.tagName);
    if (lsMapB64) {
      lsMap = JSON.parse(atob(lsMapB64));
    } else {
      lsMap = Object.create(null);
    }
    if (!lsMap[prompt]) {
      lsMap[prompt] = await (await fetch(`http://localhost:${AiProxyPort}/html/`, {
        method: 'POST',
        body: prompt,
        })).text();
      window.localStorage.setItem(this.tagName, btoa(JSON.stringify(lsMap)));
    }
    this.innerHTML = lsMap[prompt];
  }

  initCallback() {
    this.sub('prompt', (val) => {
      if (!val.trim()) {
        return;
      }
      this.handlePrompt(val + ' ' + this.innerHTML);
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

XAI.reg('x-ai');