import { X } from '../core/X.js';

export class XIcon extends X {
  static iconSet = {
    default: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
  };

  init$ = {
    name: 'default',
    d: XIcon.iconSet.default,
  }

  initCallback() {
    this.sub('name', (val) => {
      this.$.d = XIcon.iconSet[val] || XIcon.iconSet.default;
    });
  }
}

XIcon.rootStyles = /*css*/ `
  x-icon {
    height: 40px;
    width: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  x-icon svg path {
    fill: currentColor;
  }
`;

XIcon.template = /*html*/ `
<svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
  <path bind="@d: d"></path>
</svg>
`;

XIcon.bindAttributes({
  name: 'name',
});

XIcon.reg('x-icon');

export default XIcon;