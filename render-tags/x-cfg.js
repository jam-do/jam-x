import { X } from '../core/X.js';

class XCfgRow extends X {
  constructor() {
    super();
    this.style.display = 'table-row';
  }

  /** @type {XCfg} */
  get #parent() {
    return this.closest('x-cfg');
  }

  init$ = {
    onRemove: () => {
      delete this.#parent.$.data[this.$.key];
      this.dispatchEvent(new Event('input', {
        bubbles: true,
      }));
      this.dispatchEvent(new Event('change', {
        bubbles: true,
      }));
      this.remove();
    },
  }

  initCallback() {
    this.sub('value', (val) => {
      this.ref.value.innerHTML = '';
      /** @type {String} */
      let valType = typeof val;
      if (this.$.key === 'password') {
        valType = 'password';
      }
      let renderInput = (type) => {
        let input = document.createElement('input');
        input.type = type;
        if (valType === 'boolean') {
          input.checked = val;
        } else {
          input.value = val;
        }
        this.ref.value.appendChild(input);
        input.oninput = () => {
          if (valType === 'number') {
            this.#parent.$.data[this.$.key] = parseInt(input.value);
          } else if (valType === 'string' || valType === 'password') {
            this.#parent.$.data[this.$.key] = input.value;
          } else if (valType === 'boolean') {
            this.#parent.$.data[this.$.key] = input.checked;
          }
        };
      };
      let valMap = {
        string: () => {
          renderInput('text');
        },
        password: () => {
          renderInput('password');
        },
        number: () => {
          renderInput('number');
        },
        boolean: () => {
          renderInput('checkbox');
        },
        object: () => {
          let xTable = new XCfg();
          window.customElements.whenDefined('x-cfg').then(() => {
            xTable.$.data = val;
          });
          if (this.#parent.hasAttribute('editable')) {
            xTable.setAttribute('editable', '');
          }
          this.ref.value.appendChild(xTable);
        },
      }
      valMap[valType]();
    });
  }
}

XCfgRow.template = /*html*/ `
<td>{{key}}</td>
<td ref="value"></td>
<td class="editable"><button bind="onclick: onRemove">x</button></td>
`;

XCfgRow.reg('x-cfg-row');

export class XCfg extends X {
  init$ = {
    data: {},
    filter: [],
    tbodyData: [],
    addField: () => {
      let fName = this.ref.fieldName.value.trim();
      if (!fName) {
        return;
      }
      let type = this.ref.typeSelect.value;
      /** @type {unknown} */
      let val = 'text';
      if (type === 'Number') {
        val = 0;
      } else if (type === 'Boolean') {
        val = false;
      } else if (type === 'Object') {
        val = {};
      }
      this.$.data[fName] = val;
      this.applyData(this.$.data);
    },
  }

  applyData(data) {
    let rData = [];
    for (let key in data) {
      if (!this.$.filter.includes(key)) {
        rData.push({
          key,
          value: data[key],
        });
      }
    } 
    this.$.tbodyData = rData;
  }

  initCallback() {
    this.sub('data', (data) => {
      this.applyData(data);
    });
  }
}

XCfg.template = /*html*/ `
<table>
  <tbody
    list="tbodyData"
    list-item-tag="x-cfg-row"></tbody>
</table>
<div class="toolbar editable">
  <input type="text" ref="fieldName">
  <select ref="typeSelect">
    <option>String</option>
    <option>Number</option>
    <option>Boolean</option>
    <option>Object</option>
  </select>
  <button bind="onclick: addField">&nbsp;+&nbsp;</button>
</div>
`;

XCfg.reg('x-cfg');

export default XCfg;