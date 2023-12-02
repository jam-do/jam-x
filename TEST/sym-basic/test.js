import { Symbiote, html, css } from '../../symbiote/core/Symbiote.js';

const tagName = 'test-com';

class TestCom extends Symbiote {
  init$ = {
    // Regular template properties:
    addBtnTxt: 'Add Line',
    clearBtnTxt: 'Clear',
    count: 0,

    // Event handlers:
    onNewLine: () => {
      this.$.count++;
    },
    onLineClicked: (e) => {
      e.target.classList.toggle('selected');
      this.$['*data'] = Date.now();
    },
    onClear: () => {
      this.$.count = 0;
    },

    // Computed property ('+' token):
    '+list': () => {
      let arr = [];
      for (let i = 0; i < this.$.count; i++) {
        arr.push({lineNum: i + 1});
      }
      return arr;
    },
  }
}

TestCom.rootStyles = css`
${tagName} {
  display: block;
  padding: 10px;
  border: 1px solid #f00;

  [counter] {
    font-size: 3em;
  }

  [line] {
    padding: 10px;
    border-bottom: 1px dotted currentColor;
    cursor: pointer;
  }

  .selected {
    color: #f00;
    background-color: rgba(255, 0, 0, .1);
  }
}
`;

TestCom.template = html`
<div counter>Lines: {{count}}</div>
<button ${{onclick: 'onNewLine'}}>{{addBtnTxt}}</button>
<button ${{onclick: 'onClear'}}>{{clearBtnTxt}}</button>
<div itemize="+list">
  <div line ${{onclick: '^onLineClicked'}}>{{lineNum}}</div>
</div>
`;

TestCom.reg(tagName);
