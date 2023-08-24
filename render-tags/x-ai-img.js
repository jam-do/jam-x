import { X } from '../core/X.js';

let AiProxyPort = '8080';

export class XAIImg extends X {

  /**
   * 
   * @param {String} prompt 
   */
  async handlePrompt(prompt) {
    if (!this.img) {
      this.loader = document.createElement('loader-el');
      this.appendChild(this.loader);
      this.img = new Image();
    }
    let b64Img = await (await fetch(`http://localhost:${AiProxyPort}/img/`, {
      method: 'POST',
      body: prompt,
      })).text();
    this.img.src = `data:image/png;base64,${b64Img}`;
    this.img.alt = prompt;
    this.loader.remove();
    if (!this.img.isConnected) {
      this.appendChild(this.img);
    }
  }

  initCallback() {

    this.sub('prompt', (val) => {
      if (!val.trim()) {
        return;
      }
      this.handlePrompt(val);
    });

    this.sub('port', (val) => {
      if (!val.trim()) {
        return;
      }
      AiProxyPort = val;
    });

  }

}

XAIImg.bindAttributes({
  port: 'port',
  prompt: 'prompt',
  src: 'src',
});

XAIImg.reg('x-ai-img');