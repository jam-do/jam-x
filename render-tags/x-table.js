import { X } from '../core/X.js';

export class XTableRow extends X {
  pauseRender = true;

  initCallback() {
    let root = this.getRootNode() || document;
    let parent = this.closest('x-table');
    let tplId = parent.getAttribute('row-template-id');
    // @ts-ignore
    let template = root.querySelector(`template[id=${tplId}]`);
    this.render(template.innerHTML);
  }

}

XTableRow.reg('x-table-row');

export class XTable extends X {
  init$ = {
    data: [],
    titles: [],
    tplId: '',
  }

  get attrSet() {
    return {

    };
  }

  initCallback() {

  }
}

XTable.rootStyles = /*css*/ `
x-table-row {
  display: table-row;
}
`;

XTable.template = /*html*/ `
<table>
  <thead>
    <tr list="">
    </tr>
  </thead>
  <tbody
    list-item-tag="x-table-row"
    list="data">
  </tbody>
</table>
`;
XTable.reg('x-table');