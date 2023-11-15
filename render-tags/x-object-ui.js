import { X } from '../core/X.js';

class XObjectUiRow extends X {

  /** @type {XObjectUi} */
  get parent() {
    return this.closest('x-object-ui');
  }

  init$ = {
    onRemove: () => {
      if (!window.confirm(this.$['^confirmMsg'])) {
        return;
      }
      if (Array.isArray(this.parent.$.data)) {
        let result = [...this.parent.$.data];
        let idx = parseFloat(this.$.key);
        result.splice(idx, 1);
        this.parent.$.data = result;
        console.log(result);
      } else {
        delete this.parent.$.data[this.$.key];
      }
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
            this.parent.$.data[this.$.key] = parseInt(input.value);
          } else if (valType === 'string' || valType === 'password') {
            this.parent.$.data[this.$.key] = input.value;
          } else if (valType === 'boolean') {
            this.parent.$.data[this.$.key] = input.checked;
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
          let xTable = new XObjectUi();
          window.customElements.whenDefined('x-object-ui').then(() => {
            xTable.$.data = val;
          });
          if (this.parent.hasAttribute('editable')) {
            xTable.setAttribute('editable', '');
          }
          if (Array.isArray(val)) {
            xTable.setAttribute('is-array', '');
          }
          this.ref.value.appendChild(xTable);
        },
      }
      valMap[valType]();
    });
  }
}

XObjectUiRow.rootStyles = /*css*/ `
x-object-ui-row {
  display: table-row;
}
x-object-ui-row td.row-btn {
  display: none;
}
x-object-ui[editable] td.row-btn {
  display: table-cell;
}
`;

XObjectUiRow.template = /*html*/ `
<td class="key">{{key}}</td>
<td class="value" ref="value"></td>
<td class="row-btn">
  <button bind="onclick: onRemove">x</button>
</td>
`;

XObjectUiRow.reg('x-object-ui-row');

export class XObjectUi extends X {

  init$ = {
    data: {},
    exclude: [],
    editable: false,
    tbodyData: [],
    confirmMsg: 'Are you sure?',
    addField: () => {
      let type = this.ref.typeSelect.value;
      /** @type {unknown} */
      let val = 'text';
      if (type === 'Number') {
        val = 0;
      } else if (type === 'Boolean') {
        val = false;
      } else if (type === 'Object') {
        val = {};
      } else if (type === 'Array') {
        val = [];
      }
      if (this.hasAttribute('is-array')) {
        this.$.data.push(val);
      } else {
        let fName = this.ref.fieldName.value.trim();
        if (!fName) {
          return;
        }
        this.$.data[fName] = val;
      }
      this.applyData(this.$.data);
    },
  }

  applyData(data) {
    let rData = [];
    for (let key in data) {
      if (!this.$.exclude.includes(key)) {
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

XObjectUi.bindAttributes({
  editable: 'editable',
});

XObjectUi.rootStyles = /*css*/ `
x-object-ui .toolbar {
  display: none;
}
x-object-ui[editable] .toolbar {
  display: block;
}
x-object-ui[is-array] input.field-name {
  display: none;
}
`;

XObjectUi.template = /*html*/ `
<table>
  <tbody
    itemize="tbodyData"
    item-tag="x-object-ui-row"></tbody>
</table>
<div class="toolbar editable">
  <input class="field-name" type="text" ref="fieldName">
  <select ref="typeSelect">
    <option>String</option>
    <option>Number</option>
    <option>Boolean</option>
    <option>Object</option>
    <option>Array</option>
  </select>
  <button bind="onclick: addField">&nbsp;Add&nbsp;</button>
</div>
`;

XObjectUi.reg('x-object-ui');

export default XObjectUi;