import { X } from '../core/X.js';
import { getHash } from '../jam-tools/iso/getHash.js';

let AiProxyPort = '8080';

export class XAIImg extends X {

  renderShadow = true;

  init$ = {
    loading: false,
  }

  constructor() {
    super();
    this.tabIndex = 0;
  }

  /**
   * 
   * @param {String} prompt 
   */
  async handlePrompt(prompt) {
    if (!this.img) {
      this.$.loading = true;
      this.img = new Image();
    }

    let promptHash = await getHash(prompt);
    let b64Img = await XAIImg.cache.read(promptHash);

    if (!b64Img) {
      b64Img = await (await fetch(`http://localhost:${AiProxyPort}/img/`, {
        method: 'POST',
        body: prompt,
      })).text();
      await XAIImg.cache.write(promptHash, b64Img);
    }

    this.img.src = `data:image/png;base64,${b64Img}`;
    this.img.alt = prompt;
    if (!this.img.isConnected) {
      this.appendChild(this.img);
    }
    this.$.loading = false;
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

XAIImg.shadowStyles = /*css*/ `
:host {
  position: relative;
  display: inline-block;
}
:host(:focus) {
  outline: dashed 4px #0cf;
}
loader-el {
  position: absolute;
  top: 50%;
  left: 50%;

  display: inline-block;
  height: var(--gap-max, 30px);
  width: var(--gap-max, 30px);
  border-radius: 100%;
  border: 3px solid transparent;

  animation-name: loader-segments, loader-rotation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  pointer-events: none;

  z-index: 10000;
}

loader-el:not([active]) {
  opacity: 0;
}

@keyframes loader-segments {
  0% {
    border: 3px solid transparent;
    border-bottom-color: currentColor;
    border-left-color: currentColor;
  }
  25% {
    border: 3px solid transparent;
    border-left-color: currentColor;
    border-top-color: currentColor;
  }
  50% {
    border: 3px solid transparent;
    border-top-color: currentColor;
    border-right-color: currentColor;
  }
  75% {
    border: 3px solid transparent;
    border-right-color: currentColor;
    border-bottom-color: currentColor;
  }
  100% {
    border: 3px solid transparent;
    border-bottom-color: currentColor;
    border-left-color: currentColor;
  }
}

@keyframes loader-rotation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
`;

XAIImg.template = /*html*/ `
<slot></slot>
<loader-el bind="@active: loading"></loader-el>
`;

XAIImg.bindAttributes({
  port: 'port',
  prompt: 'prompt',
  src: 'src',
});

XAIImg.reg('x-ai-img');