import Symbiote, { html } from '../symbiote/core/Symbiote.js';

export class XTabs extends Symbiote {

  init$ = {
    '@default': '',

    onTabSelect: (e) => {
      let tab = e.target.getAttribute('tab');
      if (tab) {
        this.setCurrentTab(tab);
      }
    },
  }

  /** @param {String} tabTxt */
  setCurrentTab(tabTxt) {
    if (!tabTxt) {
      return;
    }
    [...this.querySelectorAll('[tab-ctx]')].forEach((ctxEl) => {
      if (ctxEl.getAttribute('tab-ctx') === tabTxt) {
        ctxEl.removeAttribute('hidden');
      } else {
        ctxEl.setAttribute('hidden', '');
      }
    });
    [...this.querySelectorAll('[tab]')].forEach((tabEl) => {
      let tabName = tabEl.getAttribute('tab');
      if (tabName === tabTxt) {
        tabEl.setAttribute('current', '');
      } else {
        tabEl.removeAttribute('current');
      }
    });
  }

  renderCallback() {
    let first = this.querySelector('[tab-ctx]').getAttribute('tab-ctx');
    this.setCurrentTab(this.$['@default'] || first);

    this.sub('@default', (val) => {
      this.setCurrentTab(val);
    });
  }
}

XTabs.rootStyles = /*css*/ `
  x-tabs [tab] {
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: var(--ui-size, 38px);
    cursor: pointer;
    transition: .4s;
    opacity: .6;
  }
  x-tabs [tab]::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: currentColor;
    opacity: .2;
    transition: .4s;
  }

  x-tabs [tab][current] {
    opacity: 1;
  }
  x-tabs [tab][current]::after {
    opacity: 1;
  }
  `;

  XTabs.shadowStyles = /*css*/ `
  :host {
    display: block;
    height: 100%;
    overflow: hidden;
    color: currentColor;
  }

  .tabs-row {
    display: flex;
  }

  .tabs-context {
    overflow-y: auto;
    padding: var(--ctx-padding, 20px);
  }
`;

XTabs.template = html`
  <div ref="row" class="tabs-row" ${{onclick: 'onTabSelect'}}>
    <slot name="tabs">No tabs defined...</slot>
  </div>
  <div ref="context" class="tabs-context">
    <slot></slot>
  </div>
`;

XTabs.reg('x-tabs');